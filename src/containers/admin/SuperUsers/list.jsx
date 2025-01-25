import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting } from '../../../selectors/admin/superUsers';
import { init, deleteSuperUsers, updateFilter, updateSorting, onStatusChange } from '../../../redux/admin/superUsers';
import SuperUsersListComponent from '../../../components/admin/SuperUsers/list';

class SuperUsersList extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { list, sorting, deleteSuperUsers, updateFilter, updateSorting, onStatusChange } = this.props;

    return (
      <SuperUsersListComponent
        data={list}
        onDelete={deleteSuperUsers}
        onUpdateFilter={updateFilter}
        updateSorting={updateSorting}
        onStatusChange={onStatusChange}
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
  deleteSuperUsers,
  updateFilter,
  updateSorting,
  onStatusChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuperUsersList);
