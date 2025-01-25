import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectList, selectLoading, selectSorting } from '../../../selectors/admin/users';
import { init, deleteUsers, updateFilter, updateSorting, onStatusChange, sendInvitation } from '../../../redux/admin/users';
import UsersListComponent from '../../../components/admin/Users/list';

class UsersList extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { list, sorting, deleteUsers, updateFilter, updateSorting, onStatusChange, sendInvitation } = this.props;

    return (
      <UsersListComponent
        data={list}
        onDelete={deleteUsers}
        onUpdateFilter={updateFilter}
        updateSorting={updateSorting}
        onStatusChange={onStatusChange}
        sendInvitation={sendInvitation}
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
  deleteUsers,
  updateFilter,
  updateSorting,
  onStatusChange,
  sendInvitation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);
