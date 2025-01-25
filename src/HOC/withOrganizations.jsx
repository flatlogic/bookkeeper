import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchDictionary } from '../redux/dictionaries';
import { selectOrganizations } from '../selectors/dictionaries';

export default function(WrappedComponent) {
  class Component extends React.Component {
    componentDidMount() {
      this.props.fetchDictionary('organizations');
    }

    render() {
      const { _organizations, ...props } = this.props;

      return (
        <WrappedComponent
          _organizations={_organizations}
          {...props}
        />
      );
    }
  }

  return connect(createStructuredSelector({
    _organizations: selectOrganizations,
  }), {fetchDictionary})(Component);
}
