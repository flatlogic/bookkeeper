import React from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InitializeGLComponent from '../../../components/public/GeneralLedger/initializeGL';
import { fetchConfig, updateConfig } from '../../../redux/public/gl';
import { fetchList } from '../../../redux/public/accounts';
import { fetchList as fetchSubAccountsList } from '../../../redux/public/subAccounts';

class InitializeGL extends React.PureComponent {
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
    this.setState({
      loading: true,
    });

    const configPromise = this.props.fetchConfig();
    const accountsListPromise = this.props.fetchAccountsList(true);
    const subAccountsListPromise = this.props.fetchSubAccountsList(true);

    const config = await configPromise;
    const accountsList = await accountsListPromise;
    const subAccountsList = await subAccountsListPromise;

    this.setState({
      config,
      accountsList,
      subAccountsList,
      loading: false,
    });
  }

  onSave = (data) => {
    return this.props.save(data);
  };

  render() {
    const { loading, accountsList, subAccountsList, config } = this.state;

    return (
      <div>
        {loading ?
          'Loading...' :
          <InitializeGLComponent data={config} onSave={this.onSave} accounts={accountsList} subAccounts={subAccountsList} />
        }
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = {
  fetchConfig,
  fetchAccountsList: fetchList,
  fetchSubAccountsList,
  save: updateConfig,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(InitializeGL)
);
