import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../Typography';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 24,
  },
  formControl: {
    marginLeft: -3,
    marginRight: 0,
    '&$sizeSmall': {
      marginLeft: -4,
      marginRight: -4,
    },
  },
  checkbox: {
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    '& svg': {
      fontSize: 24,
    },
    '&$sizeSmall': {
      marginLeft: 4,
      marginRight: 4,
      '& svg': {
        fontSize: 16,
      },
    },
  },
  label: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: 300,
    '&$sizeSmall': {
      marginLeft: 4,
      marginRight: 4,
    },
  },
  colorSecondary: {},
  checked: {
    '& svg.MuiSvgIcon-root': {
      fill: theme.palette.checkbox.checked,
      '& path': {
        stroke: 'none',
      }
    },
  },
  unchecked: {
    '& svg': {
      fill: theme.palette.checkbox.unchecked,
      '& path': {
        stroke: '#fff',
      },
    },
  },
  indeterminate: {
    '& svg': {
      fill: theme.palette.text.secondary,
    },
  },
  sizeSmall: {},
  fullWidth: {
    width: '100%',
    '& $formControl, & $label': {
      width: '100%',
    },
  },
});

class Checkbox extends React.PureComponent {
  static propTypes = {
    /* Checkbox value change callback */
    onChange: T.func.isRequired,
    /* Checkbox label */
    label: T.node.isRequired,
    /* Checkbox label placement */
    labelPlacement: T.string,
    /* Checked state */
    checked: T.bool,
    /* Indeterminate state */
    indeterminate: T.bool,
    /* Whether component should take up full width */
    fullWidth: T.bool,
    /* Checkbox size */
    size: T.oneOf(['small', 'large']),
    /* Color */
    color: T.string,
    /* Default prop from withStyles */
    classes: T.object.isRequired,
  };

  static defaultProps = {
    label: '',
    color: 'primary',
  };

  render() {
    const {
      onChange,
      classes,
      label,
      checked,
      indeterminate,
      labelPlacement,
      size,
      color,
      fullWidth,
      ...rest
    } = this.props;

    return (
      <div
        className={classNames(classes.root, {
          [classes.fullWidth]: fullWidth,
        })}
      >
        <FormControlLabel
          label={typeof label === 'string' ? <Typography>{label}</Typography> : label}
          labelPlacement={labelPlacement}
          control={
            <MaterialCheckbox
              tabIndex="-1"
              color={color}
              onChange={onChange}
              checked={checked}
              indeterminate={indeterminate}
              classes={{
                root: classNames(classes.checkbox, {
                  [classes.sizeSmall]: size === 'small',
                  [classes.unchecked]: !checked,
                }),
                checked: classes.checked,
                indeterminate: classes.indeterminate,
                disabled: classes.checkboxDisabled,
              }}
              {...rest}
            />
          }
          classes={{
            root: classes.formControl,
            label: classes.label,
            disabled: classes.formControlDisabled,
            labelPlacementStart: classes.labelPlacementStart,
            labelPlacementEnd: classes.labelPlacementEnd,
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Checkbox);
