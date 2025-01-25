import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting } from '../../../selectors/admin/organizations';
import { init, deleteOrganizations, updateFilter, updateSorting } from '../../../redux/admin/organizations';
import OrgsListComponent from '../../../components/admin/Organizations/list';

class OrgsList extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { list, sorting, deleteOrganizations, updateFilter, updateSorting } = this.props;

    return (
      <OrgsListComponent
        data={list}
        onDelete={deleteOrganizations}
        onUpdateFilter={updateFilter}
        updateSorting={updateSorting}
        sorting={sorting}
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
  deleteOrganizations,
  updateFilter,
  updateSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrgsList);
