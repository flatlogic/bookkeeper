import React from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomersFormComponent from '../../../../components/public/AccountsReceivable/Customers/customersForm';
import { selectItem } from '../../../../selectors/public/customers';
import { create, deleteCustomer, fetchItem, update } from '../../../../redux/public/customers';
import { fetchList as fetchAccountsList } from '../../../../redux/public/accounts';
import { fetchList as fetchSubAccountsList } from '../../../../redux/public/subAccounts';

class CustomersForm extends React.PureComponent {
  static propTypes = {
    item: T.object,
    onSave: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
  };

  state = {
    loading: false,
  };

  async componentDidMount() {
    const promises = [
      this.props.fetchAccountsList(true),
      this.props.fetchSubAccountsList(true),
    ];

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

    const [accountsList, subAccountsList] = await Promise.all(promises);
    this.setState({
      accountsList,
      subAccountsList,
    });
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
    const { loading, accountsList, subAccountsList } = this.state;

    return (
      <div>
        {loading ?
          'Loading...' :
          <CustomersFormComponent item={item} accounts={accountsList} subAccounts={subAccountsList} onSave={this.onSave} onDelete={this.props.deleteCustomer} />
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
  deleteCustomer,
  fetchAccountsList,
  fetchSubAccountsList,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CustomersForm)
);
