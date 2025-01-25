import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import tinycolor from 'tinycolor2';

const styles = theme => {
  const baseButtonStyles = {
    textTransform: 'none',
    borderRadius: 2,
    fontWeight: 400,
    fontSize: theme.typography.fontSizes.main,
  };

  return {
    root: {
      width: 'fit-content',
      boxShadow: 'none',
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        boxShadow: 'none',
      },
    },
    danger: {
      ...baseButtonStyles,
      color: '#fff',
      backgroundColor: theme.palette.button.danger,
      border: `1px solid ${tinycolor(theme.palette.button.danger).darken(10)}`,
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: '#E54130',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: 'rgba(255, 77, 58, 0.5)',
        borderColor: 'rgba(255, 77, 58, 0.5)',
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },
    primary: {
      ...baseButtonStyles,
      color: '#fff!important',
      backgroundColor: theme.palette.button.primary,
      border: `1px solid ${tinycolor(theme.palette.button.primary).darken(10)}`,
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: '#3485E0',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: 'rgba(57, 131, 216, 0.5)',
        color: 'rgba(255, 255, 255, 0.5)',
      }
    },
    secondary: {
      ...baseButtonStyles,
      color: '#8598AE',
      backgroundColor: theme.palette.button.secondary,
      border: '1px solid #8598AE',
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: '#AFB9C2',
        color: '#fff',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: '#fff',
        borderColor: 'rgba(133, 152, 174, 0.5)',
        color: 'rgba(133, 152, 174, 0.5)',
      },
    },
    extra: {
      ...baseButtonStyles,
      color: '#8598AE',
      backgroundColor: theme.palette.button.extra,
      border: `1px solid ${tinycolor(theme.palette.button.extra).darken(10)}`,
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: '#AFB9C2',
        color: '#fff',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: '#fff',
        borderColor: 'rgba(133, 152, 174, 0.5)',
        color: 'rgba(133, 152, 174, 0.5)',
      },
    },
    warning: {
      ...baseButtonStyles,
      color: '#fff',
      backgroundColor: theme.palette.button.warning,
      border: `1px solid ${tinycolor(theme.palette.button.warning).darken(10)}`,
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: tinycolor(theme.palette.button.warning).darken(10),
        color: '#fff',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: '#fff',
        borderColor: 'rgba(133, 152, 174, 0.5)',
        color: 'rgba(133, 152, 174, 0.5)',
      },
    },
    info: {
      ...baseButtonStyles,
      color: '#fff',
      backgroundColor: theme.palette.button.info,
      border: `1px solid ${tinycolor(theme.palette.button.info).darken(10)}`,
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: tinycolor(theme.palette.button.info).darken(10),
        color: '#fff',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: '#fff',
        borderColor: 'rgba(133, 152, 174, 0.5)',
        color: 'rgba(133, 152, 174, 0.5)',
      },
    },
    infoTheme: {
      ...baseButtonStyles,
      color: '#fff',
      backgroundColor: theme.palette.button.infoTheme,
      border: `1px solid ${tinycolor(theme.palette.button.infoTheme).darken(10)}`,
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: tinycolor(theme.palette.button.infoTheme).darken(10),
        color: '#fff',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: '#fff',
        borderColor: 'rgba(133, 152, 174, 0.5)',
        color: 'rgba(133, 152, 174, 0.5)',
      },
    },
    success: {
      ...baseButtonStyles,
      color: '#fff',
      backgroundColor: theme.palette.button.success,
      border: `1px solid ${tinycolor(theme.palette.button.success).darken(10)}`,
      '&:hover, &:focus': {
        transition: 'all .35s ease',
        backgroundColor: tinycolor(theme.palette.button.success).darken(10),
        color: '#fff',
      },
      '&$disabled': {
        cursor: 'auto',
        backgroundColor: '#fff',
        borderColor: 'rgba(133, 152, 174, 0.5)',
        color: 'rgba(133, 152, 174, 0.5)',
      },
    },
    sizeSmall: {
      ...baseButtonStyles,
      padding: '0px 14px',
      fontSize: '0.875rem',
      height: 38,
    },
    sizeLarge: {
      ...baseButtonStyles,
      lineHeight: '19px',
      padding: '11px 14px',
      height: 43,
    },
    sizeMedium: {
      ...baseButtonStyles,
      padding: '0px 14px',
      fontSize: '0.875rem',
      height: 44,
    },
    disabled: {},
  }
};

class Button extends React.PureComponent {
  static propTypes = {
    color: T.oneOf(['danger', 'primary', 'secondary', 'extra', 'warning', 'info', 'success', 'infoTheme']),
    startIcon: T.oneOf(['delete']),
  };

  static defaultProps = {
    color: 'primary',
    size: 'medium',
  };

  getIcon = (type) => {
    switch (type) {
      case 'delete':
        return <DeleteIcon />;
      default:
        return null;
    }
  };

  render() {
    const { children, color, classes, startIcon, customClass, ...rest } = this.props;
    const {
      danger: dangerClass,
      primary: primaryClass,
      secondary: secondaryClass,
      extra: extraClass,
      warning: warningClass,
      info: infoClass,
      success: successClass,
      infoTheme: infoThemeClass,
      root: rootClass,
      sizeMedium: sizeMediumClasss,
      ...restClasses } = classes;

    return <MaterialButton
      classes={{root: classNames(rootClass, {
        [dangerClass]: color === 'danger',
        [primaryClass]: color === 'primary',
        [secondaryClass]: color === 'secondary',
        [extraClass]: color === 'extra',
        [warningClass]: color === 'warning',
        [infoClass]: color === 'info',
        [successClass]: color === 'success',
        [infoThemeClass]: color === 'infoTheme',
      }), ...restClasses}}
      variant="outlined"
      className={customClass}
      startIcon={this.getIcon(startIcon)}
      {...rest}
    >
      {children}
    </MaterialButton>;
  }
}

export default withStyles(styles)(Button);
