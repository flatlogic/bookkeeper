import React from 'react';
import {connect} from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import tinycolor from 'tinycolor2';

import { selectUser } from '../../../../../selectors/auth';
import Widget from '../../../template/components/Widget';
import Card from '../../../../../components/common/Card';
import Typography from '../../../../../components/common/Typography';
import Button from '../../../../../components/common/Button';
import DropdownMenu from '../../../../../components/common/DropdownMenu';
import SidebarMenu from '../../../../../containers/admin/SidebarMenu';
import CompanyLogo from '../../../../../containers/public/SidebarMenu/companyLogo';
import UserLogo from '../../../../../containers/admin/SidebarMenu/userLogo';
import MobileMenu from '../../../../../components/common/MobileMenu';

const styles = theme => ({
  root: {
    position: 'relative',
    height: 62,
    margin: '20px 0',
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.bg.divideLine}`,
    padding: '0 30px 0 30px',
    '@media print': {
      display: 'none',
    },
    [theme.breakpoints.down("sm")]: {
      padding: '0 20px',
    }
  },
  rootPrimary: {
    position: 'relative',
    height: 62,
    margin: '20px 0',
    backgroundColor: theme.palette.text.primaryTheme,
    border: `1px solid ${theme.palette.text.primaryTheme}`,
    padding: '0 30px 0 30px',
    '@media print': {
      display: 'none',
    },
    [theme.breakpoints.down("sm")]: {
      padding: '0 20px',
    }
  },
  rootInverse: {
    position: 'relative',
    height: 62,
    margin: '20px 0',
    backgroundColor: '#D1E7FF',
    border: `1px solid ${theme.palette.text.primaryTheme}`,
    padding: '0 30px 0 30px',
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
    pointerEvents: 'none',
    '& > div': {
      background: 'transparent',
    }
  },
  menuPrimary: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    background: '#4B9FFE',
    '& a': {
      color: '#4B9FFE',
    },
  },
  menuInverse: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    background: '#D1E7FF',
    '& a': {
      color: '#4B9FFE',
    },
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: theme.spacing(2.5),
    width: 125,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
  searchFocused: {
    color: '#ccc!important',
    backgroundColor: fade(theme.palette.common.black, 0.08),
    [theme.breakpoints.up("md")]: {
      width: 250,
    },
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer",
    },
  },

  searchIconOpened: {
    right: theme.spacing(1.25),
  },
  headerIcon: {
    fontSize: 28,
    color: "#71859D",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: "100%",
  },
  transparentBg: {
    background: 'transparent',
    '& > div': {
      background: 'transparent',
    }
  },
  blueButton: {
    borderColor: tinycolor(theme.palette.text.primaryTheme).setAlpha(.3),
    color: tinycolor(theme.palette.text.primaryTheme).setAlpha(.3),
    marginLeft: 10,
  },
  infoButtons: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 40
  },
  semiGray: {
    fontSize: 28,
    margin: '0 10px',
    color: tinycolor(theme.palette.text.primary).setAlpha(.3),
  },
  whiteButton: {
    borderColor: '#fff',
    color: '#fff',
    marginLeft: 10,
  },
  whiteIcon: {
    fontSize: 28,
    margin: '0 10px',
    color: 'rgba(255,255,255,.3)',
  },
  primaryButton: {
    borderColor: theme.palette.text.primaryTheme,
    color: theme.palette.text.primaryTheme,
    marginLeft: 10,
  },
  primaryIcon: {
    fontSize: 28,
    margin: '0 10px',
    color: tinycolor(theme.palette.text.primaryTheme).setAlpha(.3),
  },
  '@media (max-width: 992px)': {
    infoButtons: {
      display: 'none'
    }
  }
});

class Header extends React.Component {
  state = {
    isMenuOpen: false,
    anchorEl: null,
    isSearchOpen: false,
    currentCompany: {
      code: "AC",
      country: "Berlin",
      defaultWithholdingLocal1Code: null,
      defaultWithholdingLocal2Code: null,
      defaultWithholdingStateCode: null,
      id: 1,
      isDeleted: false,
      isMultipleLocalTaxation: false,
      licenseNumber: "234jhj124uhi124",
      name: "Alex Company",
      organizationId: 2,
      status: 1,
    }
  };

  ref = React.createRef();

  toggleMenu = () => {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen,
    }));
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes, user } = this.props;
    const { isMenuOpen, currentCompany, isSearchOpen } = this.state;

    return (

      <Grid container spacing={6}>
        <Grid item md={12}>
          <Widget title="Navbar Example" disableWidgetMenu>
            <Typography>
              App bar displays yours app links by importing and inserting AppBar
              component. To swap links style add attribute within Button
              component.
            </Typography>
            <Card classes={{ root: classes.root }} justifyContent="spaceBetween" direction="row">
              <MobileMenu />
              <Card direction="row" classes={{ root: classes.transparentBg }}>
                <CompanyLogo company={currentCompany} />
              </Card>
              <Card classes={{root: classes.menu}} direction="row">
              <div className={classes.infoButtons}>
                <div
                  className={classNames(classes.search, {
                    [classes.searchFocused]: isSearchOpen
                  })}
                >
                  <div
                    className={classNames(classes.searchIcon, {
                      [classes.searchIconOpened]: isSearchOpen
                    })}
                    onClick={() => this.setState({ isSearchOpen: !this.state.isSearchOpen })}
                  >
                    <SearchIcon classes={{ root: classes.semiGray }} />
                  </div>
                  <InputBase
                    placeholder=""
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                  </div>
                  <NotificationsNoneIcon classes={{ root: classes.semiGray }} />
                  <Button color="white" className={classes.blueButton}>Help</Button>
                </div>
                <div ref={this.ref} onClick={this.toggleMenu} className={classes.userLogoWrapper}>
                  <UserLogo user={user} />
                </div>
                <DropdownMenu anchorRef={this.ref.current} open={isMenuOpen} onClose={this.toggleMenu}>
                  <SidebarMenu />
                </DropdownMenu>
              </Card>
            </Card>
            <Typography>There are few position options available for </Typography>
            <Card classes={{ root: classes.rootPrimary }} justifyContent="spaceBetween" direction="row">
              <MobileMenu />
              <Card direction="row" classes={{ root: classes.transparentBg }}>
                <CompanyLogo company={currentCompany} color="#fff" backgroundColor="rgba(255,255,255,.5)" />
              </Card>
              <Card classes={{ root: classes.menuPrimary }} direction="row">
                <div className={classes.infoButtons}>
                  <div
                    className={classNames(classes.search, {
                      [classes.searchFocused]: isSearchOpen
                    })}
                  >
                    <div
                      className={classNames(classes.searchIcon, {
                        [classes.searchIconOpened]: isSearchOpen
                      })}
                      onClick={() => this.setState({ isSearchOpen: !this.state.isSearchOpen })}
                    >
                      <SearchIcon classes={{ root: classes.whiteIcon }} />
                    </div>
                    <InputBase
                      placeholder=""
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                  <NotificationsNoneIcon classes={{ root: classes.whiteIcon }} />
                  <Button className={classes.whiteButton} color="white">Help</Button>
                </div>
                <div ref={this.ref} onClick={this.toggleMenu} className={classes.userLogoWrapper}>
                  <UserLogo color="#fff" backgroundColor="rgba(255,255,255,.5)" user={user} />
                </div>
                <DropdownMenu anchorRef={this.ref.current} open={isMenuOpen} onClose={this.toggleMenu}>
                  <SidebarMenu />
                </DropdownMenu>
              </Card>
            </Card>
          </Widget>
        </Grid>
        <Grid item md={12} xs={12}>
          <Widget title="Navbar Search" disableWidgetMenu inheritHeight>
            <Typography>
              Search icon makes UX more flexible. To start using search icon,
              make sure you got all relative functions.
            </Typography>
            <Card classes={{ root: classes.rootInverse }} justifyContent="spaceBetween" direction="row">
              <MobileMenu />
              <Card direction="row" classes={{ root: classes.transparentBg }}>
                <CompanyLogo company={currentCompany} color="#4B9FFE" backgroundColor="rgba(75,159,254,.5)" />
              </Card>
              <Card classes={{ root: classes.menuInverse }} direction="row">
              <div className={classes.infoButtons}>
                <div
                  className={classNames(classes.search, {
                    [classes.searchFocused]: isSearchOpen
                  })}
                >
                  <div
                    className={classNames(classes.searchIcon, {
                      [classes.searchIconOpened]: isSearchOpen
                    })}
                    onClick={() => this.setState({ isSearchOpen: !this.state.isSearchOpen })}
                  >
                    <SearchIcon classes={{ root: classes.primaryIcon }} />
                  </div>
                  <InputBase
                    placeholder=""
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                  </div>
                  <NotificationsNoneIcon classes={{ root: classes.primaryIcon }} />
                  <Button className={classes.primaryButton} color="white">Help</Button>
                </div>
                <div ref={this.ref} onClick={this.toggleMenu} className={classes.userLogoWrapper}>
                  <UserLogo color="#4B9FFE" backgroundColor="rgba(75,159,254,.5)" user={user} />
                </div>
                <DropdownMenu anchorRef={this.ref.current} open={isMenuOpen} onClose={this.toggleMenu}>
                  <SidebarMenu />
                </DropdownMenu>
              </Card>
            </Card>
          </Widget>
        </Grid>
      </Grid>
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
