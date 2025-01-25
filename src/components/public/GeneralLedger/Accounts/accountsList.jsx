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
import AutocompleteInput from '../../../common/AutocompleteInput';
import {ADMIN_ROUTES, PUBLIC_ROUTES} from '../../../../config';
import { replaceRouteVars } from '../../../../services/string';
import { getAccountTypeById, getAccountRestrictionById, getAccountStatusById } from '../../../../services/dictionary';
import { tableBaseStyles } from '../../styles';

const TABLE_CONFIG = {
  columns: [
    {id: 'code', label: 'Account No', type: 'text'},
    {id: 'description', label: 'Description', type: 'text'},
    {id: 'type', label: 'Type', type: 'text', value: data => getAccountTypeById(data.type)},
    {id: 'status', label: 'Status', type: 'text', value: data => getAccountStatusById(data.status)},
    {id: 'restriction', label: 'Restriction', type: 'text', value: data => getAccountRestrictionById(data.restriction)},
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

class AccountList extends React.PureComponent {
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
      replaceRouteVars(PUBLIC_ROUTES.generalLedgerAccountsEdit, {id: item.id})
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

  deleteComapany = (item) => {
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

  goToSpreadBudget = () => {
    this.props.history.push(PUBLIC_ROUTES.generalLedgerSpreadBudget);
  };

  render() {
    const { data, filter, classes, sorting } = this.props;
    const { selectedRows, itemsForDelete } = this.state;

    return (
      <div>

        <Card direction="row" justifyContent="spaceBetween" withoutBg>
          <div>
            <Typography variant="h2" Component="div">Accounts</Typography>
          </div>
          <Button classes={{root: classes.addButton}} size="large" component={Link} to={PUBLIC_ROUTES.generalLedgerAccountsCreate}>
            Add Account
          </Button>
        </Card>
        <div style={{ overflowX: 'auto' }}>
          <Card classes={{root: classes.tableWrapper}}>
          <Card direction="row" classes={{root: classes.tableActionsWrapper}}>
            <Button color="extra" size="small" onClick={this.goToSpreadBudget}>Spread Budget</Button>
            <Button color="extra" size="small" startIcon="delete" onClick={this.deleteSelectedItems} disabled={!selectedRows.length}>Delete</Button>
            <AutocompleteInput
              classes={{root: classes.fiscalYearSelect}}
              value={filter.fiscalYear}
              placeholder="Fiscal Year"
              items={[{'name': 2018, id: 2018}, {'name': 2019, id: 2019}]}
              onChange={item => this.props.onUpdateFilter('fiscalYear', item.id)}
              noPadding
            />
            <Input placeholder="Search" onChange={(e, value) => this.props.onUpdateFilter('query', value)} withDebounce noPadding />
          </Card>
          <Table
            classes={{root: classes.tableRoot}}
            columns={TABLE_CONFIG.columns}
            data={data}
            selectedRows={selectedRows}
            onRowClick={this.onRowClick}
            onToggleRow={this.onToggleRow}
            onDelete={this.deleteComapany}
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
          <DeleteConfirmationModal itemNames={['Account', 'Accounts']} onCancel={this.cancelDelete} onConfirm={this.confirmDelete} items={itemsForDelete} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AccountList));
