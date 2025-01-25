import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting, selectFilter } from '../../../../selectors/public/accounts';
import { init, deleteAccount, updateFilter, updateSorting } from '../../../../redux/public/accounts';
import AccountsListComponent from '../../../../components/public/GeneralLedger/Accounts/accountsList';

class AccountsList extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { list, filter, sorting, deleteAccount, statusChange, updateFilter, updateSorting } = this.props;

    return (
      <AccountsListComponent
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
)(AccountsList);
