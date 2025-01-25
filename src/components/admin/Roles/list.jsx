import React from 'react';
import * as T from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import set from 'lodash/set';

import Table from '../../common/Table/Table';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Typography from '../../common/Typography';
import DeleteConfirmationModal from './deleteConfirmationModal';
import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';

const TABLE_CONFIG = {
  columns: [
    {id: 'name', label: 'Name', type: 'text'},
    {id: 'description', label: 'Description', type: 'text'},
    {id: 'pGeneralLedger', label: 'General Ledger', type: 'array'},
    {id: 'pJobCost', label: 'Job Cost', type: 'array'},
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
  addButton: {
    marginTop: 10,
  },
});

class RolesList extends React.PureComponent {
  static propTypes = {
    data: T.array,
    onDelete: T.func.isRequired,
    onUpdateFilter: T.func.isRequired,
    updateSorting: T.func.isRequired,
    onStatusChange: T.func.isRequired,
    sorting: T.shape({
      sortKey: T.string,
      sortOrder: T.string,
    }),
  };

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
          }
          return column;
        }),
      },
    }
  }

  onRowClick = item => {
    this.props.history.push(
      replaceRouteVars(ADMIN_ROUTES.rolesEdit, {id: item.id})
    );
  };

  onToggleRow = (item, val, selectedRows) => {
    this.setState({
      selectedRows,
    });
  };

  onStatusChange = (item) => {
    this.props.onStatusChange(item.id, !item.status);
  };

  deleteSelectedRoles = () => {
    this.setState(state  => ({
      itemsForDelete: state.selectedRows,
    }));
  };

  deleteRole = (item) => {
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
          <Typography variant="h2" Component="div">Roles</Typography>
          <Button classes={{root: classes.addButton}} size="large" component={Link} to={ADMIN_ROUTES.rolesCreate}>
            Add Role
          </Button>
        </Card>
        <div style={{ overflowX: 'auto'}}>
          <Card classes={{root: classes.tableWrapper}}>
          <Card direction="row" classes={{root: classes.tableActionsWrapper}}>
            <Button color="extra" size="small" startIcon="delete" onClick={this.deleteSelectedRoles} disabled={!selectedRows.length}>Delete</Button>
            <Input placeholder="Search" onChange={(e, value) => this.props.onUpdateFilter('query', value)} withDebounce noPadding />
          </Card>
          <Table
            classes={{root: classes.tableRoot}}
            columns={tableConfig.columns}
            data={data}
            selectedRows={selectedRows}
            onRowClick={this.onRowClick}
            onToggleRow={this.onToggleRow}
            onDelete={this.deleteRole}
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

export default withStyles(styles)(withRouter(RolesList));
