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
import { PUBLIC_ROUTES } from '../../../../config';
import { replaceRouteVars } from '../../../../services/string';
import { tableBaseStyles } from '../../styles';

const TABLE_CONFIG = {
  columns: [
    {id: 'code', label: 'Subaccount No', type: 'text'},
    {id: 'description', label: 'Subaccount Description', type: 'text'},
    {id: 'parent', label: 'Account No', type: 'text', value: '{parent.code}'},
    {id: 'parent', label: 'Account Description', type: 'text', value: '{parent.description}'},
  ],
};

const styles = theme => ({
  ...tableBaseStyles(theme),
  tableRoot: {},
});

class SubAccountList extends React.PureComponent {
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

  static defaultProps = {
    filter: {},
  };

  state = {
    selectedRows: [],
    itemsForDelete: [],
  };

  onRowClick = item => {
    this.props.history.push(
      replaceRouteVars(PUBLIC_ROUTES.generalLedgerSubaccountsEdit, {id: item.id})
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
            <Typography variant="h2" Component="div">Subaccounts</Typography>
          </div>
          <Button classes={{root: classes.addButton}} size="large" component={Link} to={PUBLIC_ROUTES.generalLedgerSubaccountsCreate}>
            Add Subaccount
          </Button>
        </Card>
        <div style={{ overflowX: 'auto'}}>
          <Card classes={{root: classes.tableWrapper}}>
          <Card direction="row" classes={{root: classes.tableActionsWrapper}}>
            <Button color="extra" size="small" onClick={this.goToSpreadBudget}>Spread Budget</Button>
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

export default withStyles(styles)(withRouter(SubAccountList));
