import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

import Typography from '../../components/common/Typography';
import SetPassword from '../../components/Password/setPassword';
import { setPassword, logout } from '../../redux/auth';
import { selectIsAuthenticated, selectError, selectLoading } from '../../selectors/auth';

const styles = () => ({
  layoutContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
  error: {
    marginTop: 100,
  },
});

class SetPasswordContainer extends Component {
  static propTypes = {
    classes: T.object.isRequired,
    isAuthenticated: T.bool.isRequired,
  };

  state = {
    token: '',
  };

  componentDidMount() {
    const matches = this.props.location.search.match(/token=([^&]*)/);
    const token = get(matches, '1');
    this.setState({
      token,
    });

    if (token) {
      this.props.logout();
    }
  }

  handleSubmit = (password, repeatPassword) => {
    return this.props.setPassword(password, repeatPassword, this.state.token);
  };

  render() {
    const { classes, error, loading } = this.props;
    const { token } = this.state;

    return (
      <div className={classes.layoutContainer}>
        {token &&
          <SetPassword onSubmit={this.handleSubmit} error={error} loading={loading}/>
        }
        {!token &&
          <Typography variant="h3" className={classes.error}>Something went wrong...</Typography>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  error: selectError,
  loading: selectLoading,
});

const mapDispatchToProps = {
  setPassword,
  logout,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(SetPasswordContainer),
  ),
);
