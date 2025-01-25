import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import { selectUser } from '../../../selectors/auth';
import { selectCompany } from '../../../selectors/user';
import Card from '../../../components/common/Card';
import DropdownMenu from '../../../components/common/DropdownMenu';
import UserLogo from '../../admin/SidebarMenu/userLogo';
import SidebarMenu from '../SidebarMenu';
import CompanyLogo from '../SidebarMenu/companyLogo';

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
    flex: 1,
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
    const { classes, user, currentCompany } = this.props;
    const { isMenuOpen } = this.state;

    if (window.location.href.includes('error') || window.location.href.includes('loginPage')) {
      return null;
    }

    return (
      <Card classes={{root: classes.root}} justifyContent="spaceBetween" direction="row">
        <MobileMenu/>
        <Card classes={{root: classes.logoWrapper}} direction="row">
          <CompanyLogo company={currentCompany} />
        </Card>
        <Card classes={{root: classes.menu}} direction="row">
          <div ref={this.ref} onClick={this.toggleMenu} className={classes.userLogoWrapper}>
            <UserLogo user={user} />
          </div>
          <DropdownMenu anchorRef={this.ref.current} open={isMenuOpen} onClose={this.toggleMenu}>
            <SidebarMenu onClose={this.toggleMenu} />
          </DropdownMenu>
        </Card>
      </Card>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  currentCompany: selectCompany,
});

export default withRouter(
  connect(
    mapStateToProps,
  )(withStyles(styles)(Header))
);
