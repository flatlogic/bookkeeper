import React from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, withStyles } from '@material-ui/core';

import ProtectedRoute from '../containers/ProtectedRoute';
import ProtectedArea from '../containers/ProtectedArea';

import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Logout from '../containers/Logout';
import SetPassword from '../containers/Password/setPassword';
import ResetPassword from '../containers/Password/resetPassword';
import AdminLayout from '../containers/admin/Layout';
import OrganizationsList from '../containers/admin/Organizations/list';
import OrganizationForm from '../containers/admin/Organizations/form';
import SuperUsersList from '../containers/admin/SuperUsers/list';
import SuperUserForm from '../containers/admin/SuperUsers/form';
import UsersList from '../containers/admin/Users/list';
import UserForm from '../containers/admin/Users/form';
import CompaniesList from '../containers/admin/Companies/list';
import CompanyForm from '../containers/admin/Companies/form';
import RolesList from '../containers/admin/Roles/list';
import RoleForm from '../containers/admin/Roles/form';
import Notification from './Notification';
import { theme } from '../Themes/primary';
import { ADMIN_ROUTES, PUBLIC_ROUTES, TEMPLATE_ROUTES, BASE_USER_ROLES } from '../config';
import PublicLayout from '../containers/public/Layout';
import GeneralLedger from '../containers/public/GeneralLedger';
import GeneralLedgerInitialize from '../containers/public/GeneralLedger/initializeGL';
import GeneralLedgerAccountsList from './public/GeneralLedger/Accounts/accountsList';
import GeneralLedgerAccountsForm from './public/GeneralLedger/Accounts/accountsForm';
import GeneralLedgerSubaccountsList from './public/GeneralLedger/Accounts/subaccountsList';
import GeneralLedgerSubaccountsForm from './public/GeneralLedger/Accounts/subaccountsForm';
import GeneralLedgerSpreadBudget from './public/GeneralLedger/Accounts/spreadBudget';
import Profile from './public/Profile';
import AccountsReceivable from './public/AccountsReceivable';
import AccountsReceivableCustomersList from './public/AccountsReceivable/Customers/customersList';
import AccountsReceivableCustomersForm from './public/AccountsReceivable/Customers/customersForm';

// UI Template

import Documentation from '../components/common/Documentation';
import DocumentationPages from '../components/common/Documentation/pages/pages';
import DocumentationOverview from '../components/common/Documentation/pages/overview';
import DocumentationLicences from '../components/common/Documentation/pages/licences';
import DocumentationQuickStart from '../components/common/Documentation/pages/start';
import DocumentationComponentsTypography from '../components/common/Documentation/pages/typography';
import DocumentationComponentsWidget from '../components/common/Documentation/pages/widget';
import DocumentationComponentsHeader from '../components/common/Documentation/pages/header';
import DocumentationComponentsSidebar from '../components/common/Documentation/pages/sidebar';
import DocumentationComponentsButtons from '../components/common/Documentation/pages/buttons';
import DocumentationLibs from '../components/common/Documentation/pages/libs';
import ProfilePage from '../components/public/template/pages/Profile';
import Dashboard from '../components/public/template/pages/Dashboard';
import LoginPage from '../components/public/template/pages/Login';
import Typography from '../components/public/template/pages/Typography';
import Colors from '../components/public/template/pages/Colors';
import Grid from '../components/public/template/pages/Grid';
import TablesBasic from '../components/public/template/pages/TablesBasic';
import TablesDynamic from '../components/public/template/pages/TablesDynamic';
import Icons from '../components/public/template/pages/Icons';
import Badge from '../components/public/template/pages/Badge';
import Carousel from '../components/public/template/pages/Carousel';
import Cards from '../components/public/template/pages/Cards';
import Modal from '../components/public/template/pages/Modal';
import Notifications from '../components/public/template/pages/Notifications';
import Navbar from '../components/public/template/pages/Navbar';
import Tooltips from '../components/public/template/pages/Tooltips';
import Tabs from '../components/public/template/pages/Tabs';
import Progress from '../components/public/template/pages/Progress';
import Widget from '../components/public/template/pages/Widget';
import FormsElements from '../components/public/template/pages/FormsElements';
import FormsValidation from '../components/public/template/pages/FormsValidation';
import Charts from '../components/public/template/pages/charts'
import LineCharts from '../components/public/template/pages/charts/LineCharts'
import BarCharts from '../components/public/template/pages/charts/BarCharts'
import PieCharts from '../components/public/template/pages/charts/PieCharts'
import GoogleMap from '../components/public/template/pages/GoogleMap';
import VectorMap from '../components/public/template/pages/VectorMap';
import Calendar from '../components/public/template/pages/Calendar';
import Invoice from '../components/public/template/pages/Invoice';
import ErrorPage from '../components/public/template/pages/Error';
import Gallery from '../components/public/template/pages/Gallery';
import SearchResult from '../components/public/template/pages/SearchResult';
import TimeLine from '../components/public/template/pages/TimeLine';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    fontFamily: theme.typography.fontFamily,
  },
});

class App extends React.Component {
  static propTypes = {
    classes: T.object.isRequired,
  };

  componentDidMount() {
    // this.props.fetchUser(this.props.baseUrl);

    window.onbeforeunload = () => {
      // this.props.unload();
    };
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  render() {
    const { classes } = this.props;

    return (
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <Switch>
              <Route
                path="(/login|/logout|/forgot|/signup|/password|/change_password*)"
                render={() => (
                  <Switch>
                    <Route exact path="/login" render={(props) => <Login {...props} />} />
                    <Route exact path="/logout" render={(props) => <Logout {...props} />} />
                    <Route exact path="/password/set" render={(props) => <SetPassword {...props} />} />
                    <Route exact path="/password/forgot" render={(props) => <ResetPassword {...props} />} />
                    <Route exact path="/signup" render={(props) => <Signup {...props} />} />
                  </Switch>
                )}
              />
              <Route
                path="(/admin*)"
                render={() => (
                  <AdminLayout>
                    <ProtectedArea roles={[BASE_USER_ROLES.superUser, BASE_USER_ROLES.admin]} withRedirect="/">
                      <Switch>
                        <Route exact path={ADMIN_ROUTES.organizationsList} render={() => <ProtectedRoute component={OrganizationsList} />} />
                        <Route exact path={ADMIN_ROUTES.organizationsCreate} render={() => <ProtectedRoute component={OrganizationForm} />} />
                        <Route exact path={ADMIN_ROUTES.organizationsEdit} render={() => <ProtectedRoute component={OrganizationForm} />} />
                        <Route exact path={ADMIN_ROUTES.superUsersList} render={() => <ProtectedRoute component={SuperUsersList} />} />
                        <Route exact path={ADMIN_ROUTES.superUsersCreate} render={() => <ProtectedRoute component={SuperUserForm} />} />
                        <Route exact path={ADMIN_ROUTES.superUsersEdit} render={() => <ProtectedRoute component={SuperUserForm} />} />
                        <Route exact path={ADMIN_ROUTES.usersList} render={() => <ProtectedRoute component={UsersList} />} />
                        <Route exact path={ADMIN_ROUTES.usersCreate} render={() => <ProtectedRoute component={UserForm} />} />
                        <Route exact path={ADMIN_ROUTES.usersEdit} render={() => <ProtectedRoute component={UserForm} />} />
                        <Route exact path={ADMIN_ROUTES.companiesList} render={() => <ProtectedRoute component={CompaniesList} />} />
                        <Route exact path={ADMIN_ROUTES.companiesCreate} render={() => <ProtectedRoute component={CompanyForm} />} />
                        <Route exact path={ADMIN_ROUTES.companiesEdit} render={() => <ProtectedRoute component={CompanyForm} />} />
                        <Route exact path={ADMIN_ROUTES.rolesList} render={() => <ProtectedRoute component={RolesList} />} />
                        <Route exact path={ADMIN_ROUTES.rolesCreate} render={() => <ProtectedRoute component={RoleForm} />} />
                        <Route exact path={ADMIN_ROUTES.rolesEdit} render={() => <ProtectedRoute component={RoleForm} />} />
                      </Switch>
                    </ProtectedArea>
                  </AdminLayout>
                )}
              />
              <Route
                path="(/*)"
                render={() => (
                  <PublicLayout>
                    <Switch>
                      <Route exact path="/" render={() => <Redirect to={TEMPLATE_ROUTES.dashboard} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerSpreadBudget} render={() => <ProtectedRoute component={GeneralLedgerSpreadBudget} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerAccountsList} render={() => <ProtectedRoute component={GeneralLedgerAccountsList} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerAccountsCreate} render={() => <ProtectedRoute component={GeneralLedgerAccountsForm} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerAccountsEdit} render={() => <ProtectedRoute component={GeneralLedgerAccountsForm} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerSubaccountsList} render={() => <ProtectedRoute component={GeneralLedgerSubaccountsList} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerSubaccountsCreate} render={() => <ProtectedRoute component={GeneralLedgerSubaccountsForm} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerSubaccountsEdit} render={() => <ProtectedRoute component={GeneralLedgerSubaccountsForm} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedgerInitialize} render={() => <ProtectedRoute component={GeneralLedgerInitialize} />} />
                      <Route exact path={PUBLIC_ROUTES.generalLedger} render={() => <ProtectedRoute component={GeneralLedger} />} />
                      <Route exact path={PUBLIC_ROUTES.profile} render={() => <ProtectedRoute component={Profile} />} />
                      <Route exact path={PUBLIC_ROUTES.accountsReceivable} render={() => <ProtectedRoute component={AccountsReceivable} />} />
                      <Route exact path={PUBLIC_ROUTES.accountsReceivableCustomersList} render={() => <ProtectedRoute component={AccountsReceivableCustomersList} />} />
                      <Route exact path={PUBLIC_ROUTES.accountsReceivableCustomersCreate} render={() => <ProtectedRoute component={AccountsReceivableCustomersForm} />} />
                      <Route exact path={PUBLIC_ROUTES.accountsReceivableCustomersEdit} render={() => <ProtectedRoute component={AccountsReceivableCustomersForm} />} />
                      <Route exact path={TEMPLATE_ROUTES.profile} render={() => <ProtectedRoute component={ProfilePage} />} />
                      <Route exact path={TEMPLATE_ROUTES.dashboard} render={() => <ProtectedRoute component={Dashboard} />} />
                      <Route exact path={TEMPLATE_ROUTES.loginPage} render={() => <ProtectedRoute component={LoginPage} />} />
                      <Route exact path={TEMPLATE_ROUTES.typography} render={() => <ProtectedRoute component={Typography} />} />
                      <Route exact path={TEMPLATE_ROUTES.colors} render={() => <ProtectedRoute component={Colors} />} />
                      <Route exact path={TEMPLATE_ROUTES.grid} render={() => <ProtectedRoute component={Grid} />} />
                      <Route exact path={TEMPLATE_ROUTES.tablesBasic} render={() => <ProtectedRoute component={TablesBasic} />} />
                      <Route exact path={TEMPLATE_ROUTES.tablesDynamic} render={() => <ProtectedRoute component={TablesDynamic} />} />
                      <Route exact path={TEMPLATE_ROUTES.icons} render={() => <ProtectedRoute component={Icons} />} />
                      <Route exact path={TEMPLATE_ROUTES.badge} render={() => <ProtectedRoute component={Badge} />} />
                      <Route exact path={TEMPLATE_ROUTES.carousel} render={() => <ProtectedRoute component={Carousel} />} />
                      <Route exact path={TEMPLATE_ROUTES.cards} render={() => <ProtectedRoute component={Cards} />} />
                      <Route exact path={TEMPLATE_ROUTES.modal} render={() => <ProtectedRoute component={Modal} />} />
                      <Route exact path={TEMPLATE_ROUTES.notifications} render={() => <ProtectedRoute component={Notifications} />} />
                      <Route exact path={TEMPLATE_ROUTES.navbar} render={() => <ProtectedRoute component={Navbar} />} />
                      <Route exact path={TEMPLATE_ROUTES.tooltips} render={() => <ProtectedRoute component={Tooltips} />} />
                      <Route exact path={TEMPLATE_ROUTES.tabs} render={() => <ProtectedRoute component={Tabs} />} />
                      <Route exact path={TEMPLATE_ROUTES.pagination} render={() => <ProtectedRoute component={TablesDynamic} />} />
                      <Route exact path={TEMPLATE_ROUTES.progress} render={() => <ProtectedRoute component={Progress} />} />
                      <Route exact path={TEMPLATE_ROUTES.widget} render={() => <ProtectedRoute component={Widget} />} />
                      <Route exact path={TEMPLATE_ROUTES.formsElements} render={() => <ProtectedRoute component={FormsElements} />} />
                      <Route exact path={TEMPLATE_ROUTES.formsValidation} render={() => <ProtectedRoute component={FormsValidation} />} />
                      <Route exact path={TEMPLATE_ROUTES.chartsOverview} render={() => <ProtectedRoute component={Charts} />} />
                      <Route exact path={TEMPLATE_ROUTES.chartsLine} render={() => <ProtectedRoute component={LineCharts} />} />
                      <Route exact path={TEMPLATE_ROUTES.chartsBar} render={() => <ProtectedRoute component={BarCharts} />} />
                      <Route exact path={TEMPLATE_ROUTES.chartsPie} render={() => <ProtectedRoute component={PieCharts} />} />
                      <Route exact path={TEMPLATE_ROUTES.googleMap} render={() => <ProtectedRoute component={GoogleMap} />} />
                      <Route exact path={TEMPLATE_ROUTES.vectorMap} render={() => <ProtectedRoute component={VectorMap} />} />
                      <Route exact path={TEMPLATE_ROUTES.calendar} render={() => <ProtectedRoute component={Calendar} />} />
                      <Route exact path={TEMPLATE_ROUTES.invoice} render={() => <ProtectedRoute component={Invoice} />} />
                      <Route exact path={TEMPLATE_ROUTES.gallery} render={() => <ProtectedRoute component={Gallery} />} />
                      <Route exact path={TEMPLATE_ROUTES.searchResult} render={() => <ProtectedRoute component={SearchResult} />} />
                      <Route exact path={TEMPLATE_ROUTES.timeLine} render={() => <ProtectedRoute component={TimeLine} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentation} render={() => <ProtectedRoute component={Documentation} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationPages} render={() => <ProtectedRoute component={DocumentationPages} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationOverview} render={() => <ProtectedRoute component={DocumentationOverview} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationLicences} render={() => <ProtectedRoute component={DocumentationLicences} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationQuickStart} render={() => <ProtectedRoute component={DocumentationQuickStart} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationComponentsTypography} render={() => <ProtectedRoute component={DocumentationComponentsTypography} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationComponentsWidget} render={() => <ProtectedRoute component={DocumentationComponentsWidget} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationComponentsHeader} render={() => <ProtectedRoute component={DocumentationComponentsHeader} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationComponentsSidebar} render={() => <ProtectedRoute component={DocumentationComponentsSidebar} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationComponentsButtons} render={() => <ProtectedRoute component={DocumentationComponentsButtons} />} />
                      <Route exact path={TEMPLATE_ROUTES.documentationLibs} render={() => <ProtectedRoute component={DocumentationLibs} />} />
                      <Route exact path={TEMPLATE_ROUTES.errorPage} render={() => <ProtectedRoute component={ErrorPage} />} />
                    </Switch>
                  </PublicLayout>
                )}
              />
            </Switch>
          </div>
          <Notification />
        </MuiThemeProvider>
      </HashRouter>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);