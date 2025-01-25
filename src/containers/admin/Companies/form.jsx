import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { selectItem } from '../../../selectors/admin/companies';
import { create, update, fetchItem, deleteCompany } from '../../../redux/admin/companies';
import CompanyFormComponent from '../../../components/admin/Companies/form';

class CompaniesForm extends React.PureComponent {
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
          <CompanyFormComponent item={item} onSave={this.onSave} onDelete={this.props.deleteCompany} />
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
  deleteCompany,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CompaniesForm)
);
