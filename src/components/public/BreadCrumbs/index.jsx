import React from 'react';
import * as T from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../../common/Typography';

const styles = () => ({
  root: {
    margin: '-7px 0 27px 0',
    '@media print': {
      display: 'none',
    },
  },
  item: {
    fontSize: '1.125rem',
    '&:not(:last-child)': {
      color: 'rgba(74, 73, 74, 0.8)',
    },
  },
  leftArrow: {
    color: 'rgba(74, 73, 74, 0.8)',
    margin: '0 10px',
  },
});

class BreadCrumbs extends React.PureComponent {
  static propTypes = {
    items: T.arrayOf(T.shape({
      label: T.string,
      url: T.string,
    })),
  };

  renderItem = (item, length) => {
    if (item === 'Ar' && length === 1) {
      return (
        <>
          <Typography className={this.props.classes.item}>App</Typography>
          <Typography className={this.props.classes.leftArrow}>&lt;</Typography>
          <Link to='/gl' className={this.props.classes.item}>General Ledger</Link>
        </>
      )
    }
    if (item === 'Ar' && length > 1) {
      return 'Accounts Receiveable'
    } 
    if (item === 'Gl' && length === 1) {
      return (
        <>
          <Typography className={this.props.classes.item}>App</Typography>
          <Typography className={this.props.classes.leftArrow}>&lt;</Typography>
          <Link to='/ar' className={this.props.classes.item}>Accounts Receivable</Link>
        </>
      )
    } if (item === 'Gl' && length > 1) {
      return 'General Ledger'
    } 
    else {
      return item;
    }
  }

  renderBreadCrumbs = () => {
    const { classes } = this.props;
    let url = this.props.url;
    if (url === '/') {
      return null;
    }
    let route = url.split('/')
    .slice(1)
    .map(route => route
      .split('-')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
    );
    const length = route.length;
    return route.map((item,index) => {
      let middlewareUrl = "/" + url.split('/').slice(1, index + 2).join('/');
      return (
        <React.Fragment>
        {index !== 0 && <Typography className={classes.leftArrow}>&lt;</Typography>}
        {length === index + 1 ?
          <Link to={middlewareUrl} className={classes.item}>{this.renderItem(item, length)}</Link> :
          <Typography className={classes.item}>{this.renderItem(item, length)}</Typography>
        }
        </React.Fragment>
      )
    })
  }

  render() {
    const { classes } = this.props;

    if (window.location.href.includes('error') || window.location.href.includes('loginPage')) {
      return null;
    }

    return (
      <div className={classes.root}>
        {this.renderBreadCrumbs()}
      </div>
    );
  }
}

export default withStyles(styles)(BreadCrumbs);
