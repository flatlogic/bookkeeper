import React from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpreadBudgetComponent from '../../../../components/public/GeneralLedger/Accounts/spreadBudget';
import { selectItem } from '../../../../selectors/public/subAccounts';
import { fetchList, spreadBudget, getBudget } from '../../../../redux/public/accounts';
import { fetchList as fetchSubAccountsList } from '../../../../redux/public/subAccounts';
import { create, update, fetchItem } from '../../../../redux/public/subAccounts';

class SubaccountsForm extends React.PureComponent {
  static propTypes = {
    item: T.object,
    spreadBudget: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
  };

  state = {
    loading: false,
    accountsList: [],
    subAccountsList: [],
  };

  async componentDidMount() {
    // const { id } = this.props.match.params;
    // if (id) {
    //   await this.props.fetchItem(id)
    // }

    this.setState({
      loading: true,
    });

    const accountsListPromise = this.props.fetchAccountsList(true);
    const subAccountsListPromise = this.props.fetchSubAccountsList(true);

    const accountsList = await accountsListPromise;
    const subAccountsList = await subAccountsListPromise;
    this.setState({
      accountsList,
      subAccountsList : (subAccountsList || []).filter(item => item.parent),
    });

    this.setState({
      loading: false,
    });
  }

  onSave = (data, account, type) => {
    // const { id } = this.props.match.params;
    // if (id) {
    return this.props.spreadBudget(data, account, type);
    // } else {
    //   return this.props.create(data);
    // }
  };

  render() {
    const item = this.props.match.params.id && this.props.item ? this.props.item : {};
    const { loading, accountsList, subAccountsList } = this.state;

    return (
      <div>
        {loading ?
          'Loading...' :
          <SpreadBudgetComponent accountsList={accountsList}
                                 subAccountsList={subAccountsList}
                                 item={item}
                                 onSave={this.onSave}
                                 getBudget={this.props.getBudget}
          />
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
  fetchSubAccountsList,
  fetchItem,
  create,
  update,
  spreadBudget,
  getBudget,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SubaccountsForm)
);
