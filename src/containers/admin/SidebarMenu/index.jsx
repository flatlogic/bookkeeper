import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import {ADMIN_ROUTES} from '../../../config';
import Typography from '../../../components/common/Typography';
import UserLogo from './userLogo';
import {selectUser} from '../../../selectors/auth';

export const styles = () => ({
  root: {
    width: 200,
    padding: '24px 14px',
    border: '1px solid #AFB9C2',
    borderRadius: 2,
    '& a > span': {
      fontSize: 14,
    },
    '@media print': {
      display: 'none',
    },
  },
  divider: {
    borderTop: '1px solid rgba(154, 174, 194, 0.3)',
    height: 1,
    width: 214,
    margin: '24px 0',
  },
  itemsBlock: {
    paddingTop: 24,
  },
});

class Menu extends React.PureComponent {
  render() {
    const { classes, user } = this.props;

    return (
      <li className={classes.root}>
        <UserLogo user={user} />
        <div className={classes.itemsBlock}>
          <Link to="#">
            <Typography>My Profile</Typography>
          </Link>
        </div>
        <div className={classes.divider} />
        <div>
          <Link to={ADMIN_ROUTES.logout}>
            <Typography>Sign Out</Typography>
          </Link>
        </div>
      </li>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default withRouter(
  connect(
    mapStateToProps,
  )(withStyles(styles)(Menu))
);
