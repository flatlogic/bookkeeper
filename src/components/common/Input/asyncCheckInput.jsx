import React from 'react';
import * as T from 'prop-types';

import Input from './index';
import Api from '../../../services/api'

export const STATES = {
  loading: 'loading',
  valid: 'valid',
  invalid: 'invalid',
};

class AsyncCheckInputField extends React.Component {
  static propTypes = {
    url: T.string.isRequired,
    uniqIdentifierValue: T.oneOfType([T.string, T.number]),
    onStateChange: T.func,
  };

  state = {
    isValid: true,
    isChecking: false,
  };

  onBlur = async e => {
    const { url, uniqIdentifierValue } = this.props;
    const { value } = e.target;

    this.props.onBlur && this.props.onBlur(e, value);

    if (!value && this.props.required) {
      this.setState({isValid: false}, this.onStateChanged);
      return;
    }

    try {
      this.setState({isChecking: true}, this.onStateChanged);
      await Api.get(url, {value, id: uniqIdentifierValue});
      this.setState({isValid: true}, this.onStateChanged);
    } catch (e) {
      this.setState({isValid: false}, this.onStateChanged);
    }
    this.setState({isChecking: false}, this.onStateChanged);
  };

  onStateChanged = () => {
    this.props.onStateChange && this.props.onStateChange(this.getInputState());
  };


  getInputState = () => {
    if (this.state.isChecking) {
      return STATES.loading;
    } else if (this.state.isValid) {
      return STATES.valid;
    } else if (!this.state.isValid) {
      return STATES.invalid;
    }
    return null;
  };

  render() {
    const { uniqIdentifierValue, onStateChange, ...restProps } = this.props;

    return (
      <Input {...restProps} onBlur={this.onBlur} state={this.getInputState()} />
    );
  }
}

export default AsyncCheckInputField;
