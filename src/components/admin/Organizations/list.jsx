import React from 'react';
import * as T from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

import Table from '../../common/Table/Table';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Typography from '../../common/Typography';
import DeleteConfirmationModal from './deleteConfirmationModal';
import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';
import ProtectedArea from '../../../containers/ProtectedArea';

const TABLE_CONFIG = {
  columns: [
    {id: 'name', label: 'Name', type: 'text'},
    {id: 'description', label: 'Description', type: 'text'},
    {
      id: 'address', label: 'Address', type: 'text', sortable: false,
      value: data => {
        const strArr = [get(data, 'physicalAddress.city', ''), get(data, 'physicalAddress.state', '')];
        return strArr.filter(el => el).join(', ');
      }
    },
  ],
};

const styles = theme => ({
  tableRoot: {
    '& .address': {
      display: 'block',
      fontSize: '0.875rem',
      lineHeight: '18px',
    },
    '& .address:last-child': {
      fontSize: theme.typography.fontSizes.small,
    },
  },
  tableWrapper: {
    minWidth: 930,
    overflowX: 'auto',
    marginTop: 27,
    '& button': {
      marginRight: 15,
    },
    '& tr td:nth-child(2) > span': {
      fontWeight: '500',
    },
  },
  tableActionsWrapper: {
    justifyContent: 'flex-end',
    padding: '25px',
  },
  addButton: {
    marginTop: 10,
  },
});

class OrgsList extends React.PureComponent {
  static propTypes = {
    data: T.array,
    onDelete: T.func.isRequired,
    onUpdateFilter: T.func.isRequired,
    updateSorting: T.func.isRequired,
    sorting: T.shape({
      sortKey: T.string,
      sortOrder: T.string,
    }),
  };

  state = {
    selectedRows: [],
    itemsForDelete: [],
  };

  onRowClick = item => {
    this.props.history.push(
      replaceRouteVars(ADMIN_ROUTES.organizationsEdit, {id: item.id})
    );
  };

  onToggleRow = (item, val, selectedRows) => {
    this.setState({
      selectedRows,
    });
  };

  deleteSelectedOrgs = () => {
    this.setState(state  => ({
      itemsForDelete: state.selectedRows,
    }));
  };

  deleteOrg = (item) => {
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

  addUser = () => {
    this.props.history.push(
      replaceRouteVars(ADMIN_ROUTES.organizationsEdit, {id: get(this.state, 'selectedRows.0.id')}) + '?action=addUser'
    );
  };

  render() {
    const { data, sorting, classes } = this.props;
    const { selectedRows, itemsForDelete } = this.state;

    return (
      <div>
        <Card direction="row" justifyContent="spaceBetween" withoutBg>
          <Typography variant="h2" Component="div">
            <ProtectedArea roles={['SUPER_USER']}>
              Organizations
            </ProtectedArea>
            <ProtectedArea roles={['ADMINISTRATOR']}>
              Organization
            </ProtectedArea>
          </Typography>
          <ProtectedArea roles={['SUPER_USER']}>
            <Button classes={{root: classes.addButton}} size="large" color="primary" component={Link} to={ADMIN_ROUTES.organizationsCreate}>
              Add Organization
            </Button>
          </ProtectedArea>
        </Card>
        <div style={{ overflowX: 'auto'}}>
          <Card classes={{root: classes.tableWrapper}}>
          <Card direction="row" classes={{root: classes.tableActionsWrapper}}>
            <Button color="extra" size="small" onClick={this.addUser} disabled={selectedRows.length !== 1}>Add User</Button>
            <Button color="extra" size="small" startIcon="delete" onClick={this.deleteSelectedOrgs} disabled={!selectedRows.length}>Delete</Button>
            <Input placeholder="Search" onChange={(e, value) => this.props.onUpdateFilter('query', value)} withDebounce noPadding />
          </Card>
          <Table
            classes={{root: classes.tableRoot}}
            columns={TABLE_CONFIG.columns}
            data={data}
            selectedRows={selectedRows}
            onRowClick={this.onRowClick}
            onToggleRow={this.onToggleRow}
            onDelete={this.deleteOrg}
            onSortingChange={this.props.updateSorting}
            pagination={{
              enabled: true,
            }}
            sortKey={sorting.sortKey}
            sortOrder={sorting.sortOrder}
          />
        </Card>
        </div>
        {itemsForDelete && !!itemsForDelete.length && (
          <DeleteConfirmationModal onCancel={this.cancelDelete} onConfirm={this.confirmDelete} items={itemsForDelete} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(OrgsList));
