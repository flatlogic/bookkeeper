import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting } from '../../../selectors/admin/companies';
import { init, deleteCompany, updateFilter, updateSorting, statusChange } from '../../../redux/admin/companies';
import CompaniesListComponent from '../../../components/admin/Companies/list';

class CompaniesList extends React.PureComponent {
  componentDidMount() {
    this.props.init(this.props.viewStatus);
  }

  render() {
    const { list, sorting, deleteCompany, statusChange, updateFilter, updateSorting, className, layoutType, viewStatus } = this.props;

    return (
      <CompaniesListComponent
        data={list}
        viewStatus={viewStatus}
        onDelete={deleteCompany}
        onUpdateFilter={updateFilter}
        updateSorting={updateSorting}
        onStatusChange={statusChange}
        sorting={sorting}
        className={className}
        layoutType={layoutType}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  list: selectList,
  loading: selectLoading,
  sorting: selectSorting,
});

const mapDispatchToProps = {
  init,
  deleteCompany,
  statusChange,
  updateFilter,
  updateSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesList);
