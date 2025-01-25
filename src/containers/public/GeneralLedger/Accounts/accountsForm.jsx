import React from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AccountsFormComponent from '../../../../components/public/GeneralLedger/Accounts/accountsForm';
import { selectItem, selectFiscalYear } from '../../../../selectors/public/accounts';
import { create, deleteAccount, fetchItem, update } from '../../../../redux/public/accounts';

class AccountsForm extends React.PureComponent {
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
    const { fiscalYear } = this.props;
    const { loading } = this.state;

    return (
      <div>
        {loading ?
          'Loading...' :
          <AccountsFormComponent item={item} fiscalYear={fiscalYear} onSave={this.onSave} onDelete={this.props.deleteAccount} />
        }
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  item: selectItem,
  fiscalYear: selectFiscalYear,
});

const mapDispatchToProps = {
  create,
  update,
  fetchItem,
  deleteAccount,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AccountsForm)
);
