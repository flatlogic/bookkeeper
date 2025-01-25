import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchDictionary } from '../redux/dictionaries';
import { selectUsers } from '../selectors/dictionaries';

export default function(WrappedComponent) {
  class Component extends React.Component {
    componentDidMount() {
      this.props.fetchDictionary('users');
    }

    render() {
      const { _users, ...props } = this.props;

      return (
        <WrappedComponent
          _users={_users}
          {...props}
        />
      );
    }
  }

  return connect(createStructuredSelector({
    _users: selectUsers,
  }), {fetchDictionary})(Component);
}
