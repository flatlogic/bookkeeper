import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { selectItem } from '../../../selectors/admin/users';
import { create, update, fetchItem, deleteUsers } from '../../../redux/admin/users';
import UserFormComponent from '../../../components/admin/Users/form';

class UserForm extends React.PureComponent {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.setState({
        loading: true,
      });
      await this.props.fetchItem(id);
      this.setState({
        loading: false,
      });
    }
  }

  onSave = (data) => {
    const { id } = this.props.match.params;
    if (id) {
      return this.props.update(id, data);
    } else {
      return this.props.create(data);
    }
  };

  render() {
    const item = this.props.match.params.id && this.props.item ? this.props.item : {};
    const { deleteUsers } = this.props;
    const { loading } = this.state;

    return (
      <div>
        {loading ?
          'Loading...' :
          <UserFormComponent item={item} onSave={this.onSave} onDelete={deleteUsers} />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  item: selectItem,
});

const mapDispatchToProps = {
  create,
  update,
  deleteUsers,
  fetchItem,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserForm)
);
