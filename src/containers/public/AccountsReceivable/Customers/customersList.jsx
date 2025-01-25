import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting, selectFilter } from '../../../../selectors/public/customers';
import { init, deleteCustomer, updateFilter, updateSorting } from '../../../../redux/public/customers';
import CustomersListComponent from '../../../../components/public/AccountsReceivable/Customers/customersList';

class CustomersList extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { list, filter, sorting, deleteCustomer, statusChange, updateFilter, updateSorting } = this.props;

    return (
      <CustomersListComponent
        data={list}
        onDelete={deleteCustomer}
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
  deleteCustomer,
  updateFilter,
  updateSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomersList);
