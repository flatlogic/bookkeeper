import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { selectItem } from '../../../selectors/admin/roles';
import { create, update, fetchItem, deleteRole } from '../../../redux/admin/roles';
import RoleFormComponent from '../../../components/admin/Roles/form';

class RolesForm extends React.PureComponent {
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
    const { loading } = this.state;

    return (
      <div>
        {loading ?
          'Loading...' :
          <RoleFormComponent item={item} onSave={this.onSave} onDelete={this.props.deleteRole} />
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
  fetchItem,
  deleteRole,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RolesForm)
);
