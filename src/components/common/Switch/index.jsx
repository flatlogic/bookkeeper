import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialSwitch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => {
  return {
    label: {
      margin: 0,
    },
    root: {
      width: 36,
      height: 23,
      padding: 0,
      margin: '2px 8px',
    },
    switchBase: {
      padding: '1px 0 0 0',
      '&$checked': {
        transform: 'translateX(11px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: theme.elements.switch.backgroundColor,
          opacity: 1,
          border: `2px solid ${theme.elements.switch.backgroundColor}`,
        },
        '& $thumb': {
          backgroundColor: '#fff',
          opacity: 1,
          width: 13,
          height: 13,
          marginTop: 2,
          border: '2px solid #4B9FFE',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 11,
      height: 11,
      marginTop: 3,
      marginLeft: 5,
      backgroundColor: 'transparent',
      border: '2px solid #4B9FFE',
      boxShadow: 'none',
    },
    track: {
      height: 19,
      borderRadius: 20,
      backgroundColor: '#fff',
      opacity: 1,
      border: `2px solid ${theme.elements.switch.backgroundColor}`,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }
};

class Switch extends React.Component {
  static propTypes = {
    label: T.string,
    labelPlacement: T.string,
    checkedValue: T.oneOfType([T.string, T.number]),
    uncheckedValue: T.oneOfType([T.string, T.number]),
  };

  onChange = e => {
    this.props.onChange && this.props.onChange(e);
  };

  render() {
    const { label, labelPlacement, onChange, checkedValue, uncheckedValue, ...rest } = this.props;
    const { label: labelClass, focusVisible, ...restClasses } = this.props.classes;

    return (
      <FormControlLabel
        control={
          <MaterialSwitch
            value={this.props.checked ? uncheckedValue : checkedValue}
            onChange={this.onChange}
            {...rest}
            classes={restClasses}
          />
        }
        classes={{root: labelClass}}
        label={label}
        labelPlacement={labelPlacement}
      />
    );
  }
}

export default withStyles(styles)(Switch);
