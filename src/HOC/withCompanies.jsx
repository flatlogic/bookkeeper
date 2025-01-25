import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchDictionary } from '../redux/dictionaries';
import { selectCompanies } from '../selectors/dictionaries';

export default function(WrappedComponent) {
  class Component extends React.Component {
    componentDidMount() {
      this.props.fetchDictionary('companies');
    }

    render() {
      const { _companies, ...props } = this.props;

      return (
        <WrappedComponent
          _companies={_companies}
          {...props}
        />
      );
    }
  }

  return connect(createStructuredSelector({
    _companies: selectCompanies,
  }), {fetchDictionary})(Component);
}
