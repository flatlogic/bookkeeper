export default {
  development: {
    API_HOST_URL: process.env.REACT_APP_API_ENDPOINT,
  },
  production: {
    API_HOST_URL: "https://bookkeeper-backend.herokuapp.com/api",
  },
}

export const ADMIN_ROUTES = {
  login: '/login',
  logout: '/logout',
  organizationsList: '/admin/organizations',
  organizationsCreate: '/admin/organizations/new',
  organizationsEdit: '/admin/organizations/:id',
  superUsersList: '/admin/super-users',
  superUsersCreate: '/admin/super-users/new',
  superUsersEdit: '/admin/super-users/:id',
  usersList: '/admin/users',
  usersCreate: '/admin/users/new',
  usersEdit: '/admin/users/:id',
  companiesList: '/admin/companies',
  companiesCreate: '/admin/companies/new',
  companiesEdit: '/admin/companies/:id',
  rolesList: '/admin/roles',
  rolesCreate: '/admin/roles/new',
  rolesEdit: '/admin/roles/:id',
};

export const PUBLIC_ROUTES = {
  generalLedger: '/gl',
  generalLedgerInitialize: '/gl/initialize',
  generalLedgerSpreadBudget: '/gl/accounts/spread-budget',
  generalLedgerAccountsList: '/gl/accounts/list',
  generalLedgerAccountsCreate: '/gl/accounts/new',
  generalLedgerAccountsEdit: '/gl/accounts/:id',
  generalLedgerSubaccountsList: '/gl/subaccounts/list',
  generalLedgerSubaccountsCreate: '/gl/subaccounts/new',
  generalLedgerSubaccountsEdit: '/gl/subaccounts/:id',
  profile: '/profile',
  accountsReceivable: '/ar',
  accountsReceivableCustomersList: '/ar/customers/list',
  accountsReceivableCustomersCreate: '/ar/customers/new',
  accountsReceivableCustomersEdit: '/ar/customers/:id',
};

export const TEMPLATE_ROUTES = {
  profile: '/app/profile',
  dashboard: '/app/dashboard',
  typography: '/template/core/typography',
  colors: '/template/core/colors',
  grid: '/template/core/grid',
  tablesBasic: '/template/tables/static',
  tablesDynamic: '/template/tables/dynamic',
  icons: '/template/ui/icons',
  badge: '/template/ui/badge',
  carousel: '/template/ui/carousel',
  cards: '/template/ui/cards',
  modal: '/template/ui/modal',
  notifications: '/template/ui/notifications',
  navbar: '/template/ui/navbar',
  tooltips: '/template/ui/tooltips',
  tabs: '/template/ui/tabs',
  pagination: '/template/ui/pagination',
  progress: '/template/ui/progress',
  widget: '/template/ui/widget',
  formsElements: '/template/forms/elements',
  formsValidation: '/template/forms/validation',
  chartsOverview: '/template/charts/overview',
  chartsLine: '/template/charts/line',
  chartsBar: '/template/charts/bar',
  chartsPie: '/template/charts/pie',
  googleMap: '/template/maps/google',
  vectorMap: '/template/maps/vector',
  calendar: '/template/extra/calendar',
  invoice: '/template/extra/invoice',
  loginPage: '/template/extra/loginPage',
  errorPage: '/template/error/404',
  gallery: '/template/extra/gallery',
  searchResult: '/template/extra/search',
  timeLine: '/template/extra/timeline',
  documentation: '/documentation',
  documentationPages: '/documentation/pages',
  documentationOverview: '/documentation/getting-started/overview',
  documentationLicences: '/documentation/getting-started/licences',
  documentationQuickStart: '/documentation/getting-started/quick-start',
  documentationComponentsTypography: '/documentation/components/typography',
  documentationComponentsWidget: '/documentation/components/widget',
  documentationComponentsHeader: '/documentation/components/header',
  documentationComponentsSidebar: '/documentation/components/sidebar',
  documentationComponentsButtons: '/documentation/components/buttons',
  documentationLibs: '/documentation/libs',
};

export const BASE_USER_ROLES = {
  superUser: 'SUPER_USER',
  admin: 'ADMINISTRATOR',
};

export const ROLES_PERMISSIONS = {
  pGeneralLedger: 'General Ledger',
  pJobCost: 'Jobs',
};

export const ROLES_PERMISSION_VALUES = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
};

export const ACCOUNT_RESTRICTIONS = [
  { name: 'No Restriction', value: null, id: null },
  { name: 'Use with NON-JOB Transactions only', value: 'njt', id: 'njt' },
  { name: 'Use only for JOB EXPENSE Transactions', value: 'jet', id: 'jet' },
  { name: 'Use only for JOB INCOME Transactions', value: 'jit', id: 'jit' },
  { name: 'Use only for EQUIPMENT Transactions', value: 'et', id: 'et' },
  { name: 'Use only for SERVICE/BLNG Transactions', value: 'sbt', id: 'sbt' },
];

export const ACCOUNT_RESTRICTIONS_JOB_EXPENSE = [
  { name: 'Use only for Subcontract', value: 'jes', id: 'jes' },
  { name: 'Use only for Equipment', value: 'jee', id: 'jee' },
  { name: 'Use only for Labor', value: 'jel', id: 'jel' },
  { name: 'Use only for Materials', value: 'jem', id: 'jem' },
  { name: 'Use only for Labor Burden', value: 'jelb', id: 'jelb' },
  { name: 'Use only for Job Overhead', value: 'jejo', id: 'jejo' },
  { name: 'Use with any Cost Type', value: null, id: null },
];

export const ACCOUNT_RESTRICTIONS_JOB_INCOME = [
  { name: 'Use only for Progress Billing', value: 'jipb', id: 'jipb' },
  { name: 'Use only for Lump Sum Billing', value: 'jils', id: 'jils' },
  { name: 'Use only for Unit Price Billing', value: 'jiup', id: 'jiup' },
  { name: 'Use only for Cost Plus Billing', value: 'jicp', id: 'jicp' },
  { name: 'Use with any Income Type', value: null, id: null },
];

export const ACCOUNT_TYPES = [
  { name: 'Asset', value: 'a', id: 'a' },
  { name: 'Liability', value: 'l', id: 'l' },
  { name: 'Income', value: 'i', id: 'i' },
  { name: 'Expense', value: 'e', id: 'e' },
];

export const ACCOUNT_STATUSES = [
  { name: 'Active', value: 1, id: 1 },
  { name: 'Inactive', value: 0, id: 0 },
];