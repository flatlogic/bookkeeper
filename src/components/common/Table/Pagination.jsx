import React, { Component } from 'react';
import TableMaterialUIPagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

import PaginationActions from './PaginationActions';
import Typography from '../Typography';

const styles = () => ({
  root: {
    border: 'none',
    paddingTop: '20px!important',
  },
  paginationCaption: {
    minWidth: 90,
    color: '#666666',
    fontSize: 15,
    opacity: 0.81,
    marginLeft: 10,
  },
  paginationSelect: {
    paddingRight: 45,
    '&:focus': {
      backgroundColor: '#FFFFFF',
    },
  },
  paginationSelect_root: {
    marginRight: 0,
    backgroundColor: '#FFFFFF',
    border: '1px solid #DFDFDF',
    borderRadius: 6,
    padding: 2,
  },
  paginationSelect_value: {
    fontSize: 15,
  },
  paginationSelect_icon: {
    top: 'calc(50% - 12px)',
    right: 3,
  },
  toolbar: {
    paddingBottom: 50
  }
});

class Pagination extends Component {
  render() {
    const {
      classes,
      colSpan,
      count,
      rowsPerPage,
      page,
      onChangePage,
      onChangeRowsPerPage,
      rowsPerPageOptions = [2, 10, 25, 50, 100],
      ...rest
    } = this.props;

    return (
      <TableMaterialUIPagination
        colSpan={colSpan}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => (
          <Typography className={classes.paginationCaption}>
            {from} - {to} of {count}
          </Typography>
        )}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        ActionsComponent={PaginationActions}
        SelectProps={{
          renderValue: value => <Typography className={classes.paginationSelect_value}>{value} results</Typography>,
        }}
        classes={{
          root: classes.root,
          caption: classes.paginationCaption,
          selectRoot: classes.paginationSelect_root,
          select: classes.paginationSelect,
          selectIcon: classes.paginationSelect_icon,
          toolbar: classes.toolbar
        }}
        {...rest}
      />
    );
  }
}

export default withStyles(styles)(Pagination);
