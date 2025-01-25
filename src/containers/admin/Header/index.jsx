import React from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RootRef from '@material-ui/core/RootRef';

import { selectUser } from '../../../selectors/auth';
import Card from '../../../components/common/Card';
import DropdownMenu from '../../../components/common/DropdownMenu';
import SidebarMenu from '../SidebarMenu';
import UserLogo from '../SidebarMenu/userLogo';
import MobileMenu from '../../../components/common/MobileMenu';

const styles = theme => ({
  root: {
    height: 62,
    backgroundColor: '#fff',
    borderBottom: `1px solid ${theme.palette.bg.divideLine}`,
    padding: '0 30px 0 70px',
    '@media print': {
      display: 'none',
    },
    [theme.breakpoints.down("sm")]: {
      padding: '0 20px',
    }
  },
  logoWrapper: {
    width: 'fit-content',
    alignItems: 'center',
    height: '100%',
  },
  menu: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& a': {
      color: '#4B9FFE',
    },
  },
  userLogoWrapper: {
    cursor: 'pointer',
  },
});

class Header extends React.Component {
  state = {
    isMenuOpen: false,
  };

  ref = React.createRef();

  toggleMenu = () => {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen,
    }));
  };

  render() {
    const { classes, user } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <Card classes={{root: classes.root}} justifyContent="spaceBetween" direction="row">
        <MobileMenu />
        <Card classes={{root: classes.logoWrapper}} direction="row">
          <img src="/images/logo.svg" alt="Bookkeeper"/>
        </Card>
        <Card classes={{root: classes.menu}} direction="row">
          <div ref={this.ref} onClick={this.toggleMenu} className={classes.userLogoWrapper}>
            <UserLogo user={user} />
          </div>
          <DropdownMenu anchorRef={this.ref.current} open={isMenuOpen} onClose={this.toggleMenu}>
            <SidebarMenu />
          </DropdownMenu>
        </Card>
      </Card>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default withRouter(
  connect(
    mapStateToProps,
  )(withStyles(styles)(Header))
);
