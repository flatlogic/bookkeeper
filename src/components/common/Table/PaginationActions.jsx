import React from 'react';
import * as T from 'prop-types';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    border: '1px solid #DFDFDF',
    padding: 4,
    marginLeft: 10,
    '&:hover': {
      backgroundColor: '#F8F8F8',
      '& svg': {
        stroke: '#F8F8F8',
      },
    },
    '& svg': {
      stroke: '#FFFFFF',
      strokeWidth: 1,
      fontSize: 30,
    },
  },
});

class TablePagination extends React.Component {
  static propTypes = {
    classes: T.object.isRequired,
    count: T.number.isRequired,
    onChangePage: T.func.isRequired,
    page: T.number.isRequired,
    rowsPerPage: T.number.isRequired,
    theme: T.object.isRequired,
  };

  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          className={classes.button}
          disableRipple
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          className={classes.button}
          disableRipple
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          className={classes.button}
          disableRipple
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          className={classes.button}
          disableRipple
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TablePagination);
