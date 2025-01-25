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
import { BASE_USER_ROLES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';

const TABLE_CONFIG = {
  columns: [
    {id: 'name', label: 'Name', type: 'text'},
    {id: 'code', label: 'Abbreviation', type: 'text'},
    {id: 'organization', label: 'Organization', type: 'text', value: '{organization.name}', sortable: false},
    {
      id: 'address', label: 'Address', type: 'text', sortable: false,
      value: '<span class="address">{country} {city} {address1}</span><span class="address">{address2}</span>'
    },
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
    marginBottom: 0,
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
    position: 'relative',
  },
  addButton: {
    marginBottom: 0,
  },
  internalButton: {
    margin: '0 18px',
    height: 38
  },
  internalHeading: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 20,
  }
});

class CompaniesList extends React.PureComponent {
  static propTypes = {
    data: T.array,
    onDelete: T.func.isRequired,
    onUpdateFilter: T.func.isRequired,
    updateSorting: T.func.isRequired,
    onStatusChange: T.func.isRequired,
    viewStatus: T.string,
    className: T.string,
    layoutType: T.string,
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
      replaceRouteVars(ADMIN_ROUTES.companiesEdit, {id: item.id})
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

  deleteSelectedCompanies = () => {
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

  render() {
    const { data, classes, sorting, className, layoutType, viewStatus } = this.props;
    const { selectedRows, itemsForDelete, tableConfig } = this.state;

    return (
      <div>
        {layoutType !== 'internal' && (
          <>
            <Card direction="row" justifyContent="spaceBetween" withoutBg>
              <Typography variant="h2" Component="div">Companies</Typography>
              <Button classes={{root: classes.addButton}} size="large" component={Link} to={ADMIN_ROUTES.companiesCreate}>
                Add Company
              </Button>            
            </Card>
          </>
        )}
        <div style={{ overflowX: 'auto' }}>
          <Card className={className} classes={{root: classes.tableWrapper}}>
          <Card direction="row" classes={{root: classes.tableActionsWrapper}}>
            {layoutType === 'internal' && (
              <>
                <Typography className={classes.internalHeading} variant="h2" Component="div">Companies</Typography>
                <Button classes={{root: classes.internalButton}} size="large" component={Link} to={ADMIN_ROUTES.companiesCreate}>
                  Add Company
                </Button>            
              </>
            )}
            <Button color="extra" size="small" startIcon="delete" onClick={this.deleteSelectedCompanies} disabled={!selectedRows.length}>Delete</Button>
            <Input placeholder="Search" onChange={(e, value) => this.props.onUpdateFilter('query', value)} withDebounce noPadding />
          </Card>
          <Table
            classes={{root: classes.tableRoot}}
            columns={tableConfig.columns}
            viewStatus={viewStatus}
            data={viewStatus === BASE_USER_ROLES.superUser ? [] : data}
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
          <DeleteConfirmationModal onCancel={this.cancelDelete} onConfirm={this.confirmDelete} items={itemsForDelete} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(CompaniesList));
