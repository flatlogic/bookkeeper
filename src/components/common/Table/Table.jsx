import React from 'react';
import * as T from 'prop-types';
import BaseTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import difference from 'lodash/difference';

import BaseRow from './Row/BaseRow';
import BaseHeadRow from './Row/BaseHeadRow';
import Pagination from './Pagination';
import NoDataNotice from '../NoDataNotice';
import Loading from '../Loading';
import TableCell from './Cell/Base';

const ROWS_PER_PAGE = 25;

const styles = (theme) => ({
  root: {
    '& tr td:first-child, & tr th:first-child': {
      paddingLeft: 20,
      paddingRight: 10,
      width: 24,
    },
    '& tr td:last-child, & tr th:last-child': {
      paddingRight: 20,
    },
    '& tbody tr:nth-child(odd)': {
      backgroundColor: theme.palette.table.odd,
    },
  },
  noSelectAll: {
    '& tr td:first-child': {
      paddingLeft: 20,
      width: 'auto',
    },
    '& tr th:first-child': {
      paddingLeft: 10,
      width: 'auto',
    },
  },
  table: {
    minWidth: 500,
  },
  tableBody: {
    textAlign: 'center',
  },
  tableRow: {
    textAlign: 'center',
    fontSize: 14,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  chip_teal: {
    backgroundColor: teal[500],
    color: grey[50],
  },
  button: {
    color: blue[600],
  },
  head: {},
  headRowRow: {
    height: 40,
  },
  headRowRoot: {
    textAlign: 'left',
    padding: 0,
    borderRight: 'none',
    '&:last-child': {
      paddingRight: 0,
    },
  },
  headRowButtonRoot: {
    minWidth: 0,
    padding: '0 10px',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  body: {},
  bodyRow: {
    height: 40,

    '&:last-child $bodyCell': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: '#F8F8F8',
    },
  },
  bodyCell: {
    padding: '5px 10px',
    textAlign: 'left',
    verticalAlign: 'top',
    color: '#666666',
  },
  loadingCell: {
    borderBottom: 'none',
    height: 200,
  },
});

class Table extends React.Component {
  static propTypes = {
    data: T.arrayOf(T.object),
    columns: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        type: T.string.isRequired,
        label: T.string.isRequired,
      }),
    ).isRequired,
    onSortingChange: T.func,
    sortKey: T.string,
    sortOrder: T.string,
    pagination: T.shape({
      enabled: T.bool,
      rowsPerPage: T.number,
      currentPage: T.number,
      totalCount: T.number,
      onChangePage: T.func,
      onChangeRowsPerPage: T.func,
    }),
    viewStatus: T.string,
    onToggleRow: T.func,
    loading: T.bool,
    selectedRows: T.array,
    allowSelectAll: T.bool,
  };

  static defaultProps = {
    pagination: {
      enabled: true,
    },
    customClasses: {},
    loading: false,
    data: [],
    viewStatus: 'No data to display',
    selectedRows: [],
    allowSelectAll: true,
  };

  state = {
    currentPage: 0,
    rowsPerPage: ROWS_PER_PAGE,
    selectedAll: false,
  };

  onSelectAll = (val) => {
    const pageData = this.getPageData();
    const selectedRows = pageData.reduce((map, item) => this.calculateSelectedRows(item, val, map), this.props.selectedRows);
    this.props.onToggleRow(null, val, selectedRows);
    this.setState({
      selectedAll: val,
    });
  };

  onRowSelect = (item, val) => {
    const selectedRows = this.calculateSelectedRows(item, val, this.props.selectedRows);
    this.props.onToggleRow(item, val, selectedRows);

    this.setState({
      selectedAll: this.checkIfAllSelected(selectedRows),
    });
  };

  onPageChange = (e, value) => {
    this.setState({
      currentPage: value,
    }, () => {
      this.setState({
        selectedAll: this.checkIfAllSelected(),
      });
    });
  };

  onChangeRowsPerPage = (e) => {
    const { value } = e.target;
    this.setState({
      rowsPerPage: value,
    }, () => {
      this.setState({
        selectedAll: this.checkIfAllSelected(),
      });
    });
  };

  getPageData = () => {
    const { data, pagination } = this.props;
    const { currentPage, rowsPerPage } = this.state;
    return !pagination.enabled ? data : data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
  };

  checkIfAllSelected = (rows) => {
    const selectedRows = rows || this.props.selectedRows;
    const pageData = this.getPageData();
    return selectedRows.length >= pageData.length &&
      difference(pageData.map(item => item.id), selectedRows.map(item => item.id)).length === 0;
  };

  calculateSelectedRows = (item, val, rows) => {
    let selectedRows = [...rows];
    if (val && !selectedRows.find(r => r.id === item.id)) {
      selectedRows.push(item);
    } else if (!val) {
      selectedRows = selectedRows.filter(r => r.id !== item.id);
    }
    return selectedRows;
  };

  render() {
    const {
      classes,
      columns,
      data,
      onDelete,
      onEdit,
      onRowClick,
      selectedRows,
      pagination,
      loading,
      allowSelectAll,
      children,
      viewStatus,
    } = this.props;
    const { currentPage, rowsPerPage , selectedAll} = this.state;
    const pageData = this.getPageData();

    return (
      <React.Fragment>
        <div style={{ overflowX: 'auto'}}>
          <div className={classes.tableWrapper}>
          {(data.length > 0 || loading) && (
            <BaseTable className="table" classes={{root: classNames(classes.root, classes.table, {[classes.noSelectAll]: !allowSelectAll})}}>
              <TableHead className={classes.head}>
                <BaseHeadRow
                  classes={{
                    root: classes.headRowRoot,
                    row: classes.headRowRow,
                    buttonRoot: classes.headRowButtonRoot,
                  }}
                  sortKey={this.props.sortKey}
                  sortOrder={this.props.sortOrder}
                  columns={columns}
                  onClick={data.length > 0 ? this.props.onSortingChange : undefined}
                  fixColumnsSize={loading}
                  onSelect={this.onSelectAll}
                  selected={selectedAll}
                  withDeleteAction={!!onDelete}
                  withSelectAll={!!allowSelectAll}
                />
              </TableHead>
              <TableBody className={classes.body}>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className={classes.loadingCell}>
                      <Loading centered={true} />
                    </TableCell>
                  </TableRow>
                ) : (
                  children ||
                  pageData.map((item, i) =>
                    <BaseRow
                      columns={columns}
                      data={item}
                      key={i}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      onClick={onRowClick}
                      onSelect={this.onRowSelect}
                      selected={!!selectedRows.find(row => item.id === row.id)}
                      withSelectAll={!!allowSelectAll}
                    />
                  )
                )}
              </TableBody>
            </BaseTable>
          )}
          {!loading && (!data || !data.length) && <NoDataNotice viewStatus={viewStatus} />}
        </div>
        </div>
        {pagination.enabled && data.length > 0 && (
          <BaseTable>
            <TableFooter>
              <TableRow>
                <Pagination
                  colSpan={columns.length}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  onChangePage={this.onPageChange}
                  onChangeRowsPerPage={this.onChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </BaseTable>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { name: 'Table' })(Table);
