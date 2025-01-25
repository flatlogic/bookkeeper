import React from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SubaccountsFormComponent from '../../../../components/public/GeneralLedger/Accounts/subaccountsForm';
import { selectItem } from '../../../../selectors/public/subAccounts';
import { fetchList } from '../../../../redux/public/accounts';
import { create, update, fetchItem } from '../../../../redux/public/subAccounts';

class SubaccountsForm extends React.PureComponent {
  static propTypes = {
    item: T.object,
    onSave: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
  };

  state = {
    loading: false,
    accountsList: [],
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      loading: true,
    });

    const accountsListPromise = this.props.fetchAccountsList(true);
    if (id) {
      await this.props.fetchItem(id)
    }
    const accountsList = await accountsListPromise;
    this.setState({accountsList});

    this.setState({
      loading: false,
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
    const { loading, accountsList } = this.state;

    return (
      <div>
        {loading ?
          'Loading...' :
          <SubaccountsFormComponent accountsList={accountsList} item={item} onSave={this.onSave} onDelete={this.props.deleteItem} />
        }
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  item: selectItem,
});

const mapDispatchToProps = {
  fetchAccountsList: fetchList,
  fetchItem,
  create,
  update,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SubaccountsForm)
);
