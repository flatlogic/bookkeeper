import React from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import { ADMIN_ROUTES, PUBLIC_ROUTES, TEMPLATE_ROUTES } from '../../../config';
import Typography from '../../../components/common/Typography';
import ExpansionPanel from '../../../components/common/ExpansionPanel';
import UserLogo from '../../admin/SidebarMenu/userLogo';
import { selectUser, selectUserCompanies } from '../../../selectors/auth';
import { selectCompany as selectCompanySelector } from '../../../selectors/user';
import { selectCompany } from '../../../redux/user';
import { styles as adminSidebarStyles } from '../../admin/SidebarMenu';
import CurrentCompany from './currentCompany';

const styles = theme => ({
  ...adminSidebarStyles(theme),
  item: {
    display: 'block',
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  switchCompanyRoot: {
    margin: '-10px 0px!important',
    
  },
  switchCompanyDetailsRoot: {
    flexDirection: 'column',
    paddingTop: 10,
  },
  switchCompanyLabel: {
    fontSize: '14px',
    color: theme.palette.text.highlight,
    fontWeight: 500,
    textTransform: 'none',
  },
  switchCompanySummaryRoot: {
    height: 20,
    minHeight: 'auto',
    justifyContent: 'space-between',
  },
  switchCompanyItem: {
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '7px 16px',
    margin: '0 -15px',
    '&:hover': {
      backgroundColor: 'rgba(75, 159, 254, 0.2)',
    },
  },
  helpMenu: {
    opacity: .8
  }
});

const mockCompanies = [{name: 'Flatlogic'}, {name: 'FriendlyCompany'}, {name: 'DreamTeam'}];

class Menu extends React.PureComponent {
  static propTypes = {
    onClose: T.func.isRequired,
  };

  switchCompany = company => {
    this.props.selectCompany(company);
    this.props.onClose();
  };

  render() {
    const { classes, user, companies, currentCompany } = this.props;
    return (
      <li className={classes.root}>
        <UserLogo user={user} />
        <div className={classes.itemsBlock}>
          <Link to={PUBLIC_ROUTES.profile} className={classes.item}>
            <Typography>My Profile</Typography>
          </Link>
          <Link to={PUBLIC_ROUTES.profile} className={classes.item}>
            <Typography>User Preferences</Typography>
          </Link>
        </div>
        <div className={classes.divider} />
        <CurrentCompany company={typeof currentCompany !== 'object' ? {name: 'Flatlogic'} : currentCompany} />
        <Link to={TEMPLATE_ROUTES.profile} className={classes.item}>
            <Typography>Invoice Settings</Typography>
        </Link>
        <Link to={TEMPLATE_ROUTES.invoice} className={classes.item}>
            <Typography>Bank Connection</Typography>
        </Link>
        <Link to={TEMPLATE_ROUTES.invoice} className={classes.item}>
            <Typography>Bank Account</Typography>
        </Link>
        <Link to={TEMPLATE_ROUTES.invoice} className={classes.item}>
            <Typography>Payment Services</Typography>
        </Link>
        <div className={classes.divider} />
        <ExpansionPanel label="Switch Company"
                        classes={{
                          root: classes.switchCompanyRoot,
                          expansionPanelSummaryRoot: classes.switchCompanySummaryRoot,
                          label: classes.switchCompanyLabel,
                          expansionPanelDetailsRoot: classes.switchCompanyDetailsRoot,
                        }}

        >
          {companies.length === 0 ? 
            mockCompanies.map(cmp => (
              <Typography key={cmp.name} onClick={() => this.switchCompany(cmp)} className={classes.switchCompanyItem}>{cmp.name}</Typography>
            ))
           : companies.map(cmp => (
            <Typography key={cmp.name} onClick={() => this.switchCompany(cmp)} className={classes.switchCompanyItem}>{cmp.name}</Typography>
          ))}

        </ExpansionPanel>
        <div className={classes.divider} />
        <div className={classes.helpMenu}>
          <Link to="#" className={classes.item}>
            <Typography>Help</Typography>
          </Link>
          <Link to={ADMIN_ROUTES.logout} className={classes.item}>
            <Typography>Sign Out</Typography>
          </Link>
        </div>
      </li>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  currentCompany: selectCompanySelector,
  companies: selectUserCompanies,
});

const mapDispatchToProps = {
  selectCompany,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(Menu))
);
