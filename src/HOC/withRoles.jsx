import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchDictionary } from '../redux/dictionaries';
import { selectRoles } from '../selectors/dictionaries';

export default function(WrappedComponent) {
  class Component extends React.Component {
    componentDidMount() {
      this.props.fetchDictionary('roles');
    }

    render() {
      const { _roles, ...props } = this.props;

      return (
        <WrappedComponent
          _roles={_roles}
          {...props}
        />
      );
    }
  }

  return connect(createStructuredSelector({
    _roles: selectRoles,
  }), {fetchDictionary})(Component);
}
