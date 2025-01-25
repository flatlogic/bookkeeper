import React from 'react';
import * as T from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import set from 'lodash/set';

import Table from '../../common/Table/Table';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Typography from '../../common/Typography';
import DeleteConfirmationModal from './deleteConfirmationModal';
import Filter from './listFilter';
import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';
import ProtectedArea from "../../../containers/ProtectedArea";

const TABLE_CONFIG = {
  columns: [
    {id: 'firstName', label: 'Name', type: 'text', value: '{firstName} {lastName}'},
    {id: 'username', label: 'Username', type: 'text'},
    {
      id: 'contactInfo', label: 'Contact Info', type: 'text', sortable: false,
      value: '<span class="contact"><a onclick="event.stopPropagation();" href="tel:{phone}">{phone}</a></span>' +
        '<span class="contact"><a onclick="event.stopPropagation();" href="mailto:{email}">{email}</a></span>'
    },
    {id: 'organizations', label: 'Organizations', type: 'text', value: '{organizations.0.name}', sortable: false},
    {id: 'activation', label: 'Activation', type: 'link', value: 'Send Activation', callbacks: {}},
    {id: 'lastLogin', label: 'Last Login', type: 'datetime'},
    {id: 'status', label: 'Status', type: 'switch', callbacks: {}},
  ],
};

const styles = theme => ({
  tableRoot: {
    '& .contact:first-child:not(:empty) ~ span': {
      display: 'block',
      fontSize: theme.typography.fontSizes.small,
    },
    '& .contact:first-child': {
      fontSize: '0.875rem',
    },
  },
  tableWrapper: {
    minWidth: 930,
    overflowX: 'auto',
    marginTop: 27,
    '& tr td:nth-child(2) > span': {
      fontWeight: '500',
    },
    '& button': {
      marginRight: 15,
    },
  },
  tableActionsWrapper: {
    justifyContent: 'flex-end',
    padding: '25px',
  },
});

class UsersList extends React.PureComponent {
  static propTypes = {
    data: T.array,
    onDelete: T.func.isRequired,
    onUpdateFilter: T.func.isRequired,
    updateSorting: T.func.isRequired,
    onStatusChange: T.func.isRequired,
    sendInvitation: T.func.isRequired,
    sorting: T.shape({
      sortKey: T.string,
      sortOrder: T.string,
    }),
  };

  tableRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
      itemsForDelete: [],
      tableConfig: {
        ...TABLE_CONFIG,
        columns: TABLE_CONFIG.columns.map(column => {
          if (column.id === 'status') {
            return set({...column}, 'callbacks.onChange', this.onStatusChange);
          } else if (column.id === 'activation') {
            return set({...column}, 'callbacks.onClick', this.onSendActivation);
          }

          return column;
        }),
      },
    }
  }

  onRowClick = item => {
    this.props.history.push(
      replaceRouteVars(ADMIN_ROUTES.usersEdit, {id: item.id})
    );
  };

  onToggleRow = (item, val, selectedRows) => {
    this.setState({
      selectedRows,
    });
  };

  onStatusChange = item => {
    this.props.onStatusChange(item.id, !item.status);
  };

  onSendActivation = async (item, e) => {
    e.stopPropagation();
    this.props.sendInvitation(item.id, true);
  };

  deleteSelectedUsers = () => {
    this.setState(state  => ({
      itemsForDelete: state.selectedRows,
    }));
  };

  deleteUser = (item) => {
    this.setState({
      itemsForDelete: [item],
    });
  };

  confirmDelete = () => {
    const ids = this.state.itemsForDelete.map(item => item.id);
    this.props.onDelete(ids);
    this.setState({
      itemsForDelete: [],
    });
  };

  cancelDelete = () => {
    this.setState({
      itemsForDelete: [],
    });
  };

  render() {
    const { data, classes, sorting } = this.props;
    const { selectedRows, itemsForDelete, tableConfig } = this.state;

    return (
      <div>
        <Card direction="row" justifyContent="spaceBetween" withoutBg>
          <Typography variant="h2" Component="div">Users</Typography>
          <ProtectedArea roles={['ADMINISTRATOR', 'SUPER_USER']}>
            <Button classes={{root: classes.addButton}} size="large" component={Link} to={ADMIN_ROUTES.usersCreate}>
              Add User
            </Button>
          </ProtectedArea>
        </Card>
        <div style={{ overflowX: 'auto'}}>
          <Card classes={{root: classes.tableWrapper}}>
          <Card direction="row" classes={{root: classes.tableActionsWrapper}}>
            <Button color="extra" size="small" startIcon="delete" onClick={this.deleteSelectedUsers} disabled={!selectedRows.length}>Delete</Button>
            <Filter onChange={this.props.onUpdateFilter} />
          </Card>
          <RootRef rootRef={this.tableRef}>
            <Table
              classes={{root: classes.tableRoot}}
              columns={tableConfig.columns}
              data={data}
              selectedRows={selectedRows}
              onRowClick={this.onRowClick}
              onToggleRow={this.onToggleRow}
              onDelete={this.deleteUser}
              onSortingChange={this.props.updateSorting}
              pagination={{
                enabled: true,
              }}
              sortKey={sorting.sortKey}
              sortOrder={sorting.sortOrder}
            />
          </RootRef>
        </Card>
        </div>
        {itemsForDelete && !!itemsForDelete.length && (
          <DeleteConfirmationModal onCancel={this.cancelDelete} onConfirm={this.confirmDelete} items={itemsForDelete} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(UsersList));
