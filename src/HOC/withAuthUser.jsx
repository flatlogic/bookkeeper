import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../selectors/auth';

export default function(WrappedComponent) {
  class Component extends React.Component {
    render() {
      const { _authUser, ...props } = this.props;

      return (
        <WrappedComponent
          _authUser={_authUser}
          {...props}
        />
      );
    }
  }

  return connect(createStructuredSelector({
    _authUser: selectUser,
  }))(Component);
}
