import React from 'react';
import * as T from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Table from '../../../common/Table/Table';
import Button from '../../../common/Button';
import Card from '../../../common/Card';
import Input from '../../../common/Input';
import Typography from '../../../common/Typography';
import DeleteConfirmationModal from '../../../common/DeleteConfirmationModal';
import { PUBLIC_ROUTES } from '../../../../config';
import { replaceRouteVars } from '../../../../services/string';
import { tableBaseStyles } from '../../styles';

const TABLE_CONFIG = {
  columns: [
    {id: 'code', label: 'Customer No', type: 'text'},
    {id: 'name', label: 'Name', type: 'text'},
    {id: 'thisYearBillings', label: 'Sales this year', type: 'number', properties: {format: '$#,###.00'}},
    {id: 'lastYearBillings', label: 'Sales last year', type: 'number', properties: {format: '$#,###.00'}},
    {id: 'toDateBillings', label: 'Sales to-date', type: 'number', properties: {format: '$#,###.00'}},
  ],
};

const styles = theme => ({
  ...tableBaseStyles(theme),
  tableRoot: {},
  fiscalYearSelect: {
    width: 150,
    marginRight: 15,
  },
});

class CustomersList extends React.PureComponent {
  static propTypes = {
    filter: T.object,
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
    filter: {},
  };

  onRowClick = item => {
    this.props.history.push(
      replaceRouteVars(PUBLIC_ROUTES.accountsReceivableCustomersEdit, {id: item.id})
    );
  };

  onToggleRow = (item, val, selectedRows) => {
    this.setState({
      selectedRows,
    });
  };

  deleteSelectedItems = () => {
    this.setState(state  => ({
      itemsForDelete: state.selectedRows,
    }));
  };

  deleteCustomer = (item) => {
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
    const { data, filter, classes, sorting } = this.props;
    const { selectedRows, itemsForDelete } = this.state;

    return (
      <div>

        <Card direction="row" justifyContent="spaceBetween" withoutBg>
          <div>
            <Typography variant="h2" Component="div">Customers</Typography>
          </div>
          <Button classes={{root: classes.addButton}} size="large" component={Link} to={PUBLIC_ROUTES.accountsReceivableCustomersCreate}>
            Add Customer
          </Button>
        </Card>
        <div style={{ overflowX: 'auto'}}>
          <Card classes={{root: classes.tableWrapper}}>
          <Card direction="row" classes={{root: classes.tableActionsWrapper}}>
            <Button color="extra" size="small" startIcon="delete" onClick={this.deleteSelectedItems} disabled={!selectedRows.length}>Delete</Button>
            <Input placeholder="Search" onChange={(e, value) => this.props.onUpdateFilter('query', value)} withDebounce noPadding />
          </Card>
          <Table
            classes={{root: classes.tableRoot}}
            columns={TABLE_CONFIG.columns}
            data={data}
            selectedRows={selectedRows}
            onRowClick={this.onRowClick}
            onToggleRow={this.onToggleRow}
            onDelete={this.deleteCustomer}
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
          <DeleteConfirmationModal itemNames={['Customer', 'Customers']} onCancel={this.cancelDelete} onConfirm={this.confirmDelete} items={itemsForDelete} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(CustomersList));
