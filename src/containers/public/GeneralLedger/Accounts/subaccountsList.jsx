import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting, selectFilter } from '../../../../selectors/public/subAccounts';
import { init, deleteAccount, updateFilter, updateSorting } from '../../../../redux/public/subAccounts';
import SubAccountsListComponent from '../../../../components/public/GeneralLedger/Accounts/subaccountsList';

class SubAccountsList extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { list, filter, sorting, deleteAccount, statusChange, updateFilter, updateSorting } = this.props;

    return (
      <SubAccountsListComponent
        data={list}
        onDelete={deleteAccount}
        onUpdateFilter={updateFilter}
        updateSorting={updateSorting}
        onStatusChange={statusChange}
        sorting={sorting}
        filter={filter}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  list: selectList,
  loading: selectLoading,
  sorting: selectSorting,
  filter: selectFilter,
});

const mapDispatchToProps = {
  init,
  deleteAccount,
  updateFilter,
  updateSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubAccountsList);
