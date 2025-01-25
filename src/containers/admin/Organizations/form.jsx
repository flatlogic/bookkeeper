import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { selectItem } from '../../../selectors/admin/organizations';
import { create, update, fetchOrgItem } from '../../../redux/admin/organizations';
import OrgFormComponent from '../../../components/admin/Organizations/form';

class OrgForm extends React.PureComponent {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.setState({
        loading: true,
      });
      await this.props.fetchOrgItem(id);
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
          <OrgFormComponent item={item} onSave={this.onSave} />
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
  fetchOrgItem,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(OrgForm)
);
