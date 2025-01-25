import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting } from '../../../selectors/admin/roles';
import { init, deleteRole, updateFilter, updateSorting } from '../../../redux/admin/roles';
import RolesListComponent from '../../../components/admin/Roles/list';

class RolesList extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { list, sorting, deleteRole, updateFilter, updateSorting } = this.props;

    return (
      <RolesListComponent
        data={list}
        onDelete={deleteRole}
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
  deleteRole,
  updateFilter,
  updateSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RolesList);
