import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  const baseHStyles = {};
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.2,
      textOverflow: 'ellipsis',
      '&:empty:before': {
        content: '"\\200b"',
      },
    },
    h1: {
      fontSize: '3.157rem',
      lineHeight: '80px',
      ...baseHStyles,
    },
    h2: {
      ...baseHStyles,
      fontSize: '1.75rem',
      lineHeight: '34px',
    },
    h3: {
      ...baseHStyles,
      fontSize: '1.5rem',
      lineHeight: '30px',
    },
    h4: {
      ...baseHStyles,
      fontSize: '1.25rem',
      lineHeight: '25px',
    },
    h5: {
      ...baseHStyles,
    },
    h6: {
      fontWeight: 'bold',
    },
    textAlignInherit: {
      textAlign: 'inherit',
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    textAlignLeft: {
      textAlign: 'left',
    },
    textAlignRight: {
      textAlign: 'right',
    },
    textAlignJustify: {
      textAlign: 'justify',
    },
    uppercase: {
      textTransform: 'uppercase',
    },
    bold: {
      fontWeight: 'bold',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: '20px',
    },
    gutterBottom: {
      marginBottom: 12,
    },
    colorInherit: {
      color: 'inherit',
    },
    colorPrimary: {
      color: theme.palette.text.primary,
    },
    colorSecondary: {
      color: theme.palette.text.secondary,
    },
    colorInfo: {
      color: theme.palette.text.info,
    },
    colorWarning: {
      color: theme.palette.text.warning,
    },
    colorSuccess: {
      color: theme.palette.text.success,
    },
    colorErrorTheme: {
      color: theme.palette.text.errorTheme,
    },
    colorPrimaryTheme: {
      color: theme.palette.text.primaryTheme,
    },
    colorDefaultTheme: {
      color: theme.palette.text.defaultTheme,
    },
    colorSecondaryTheme: {
      color: theme.palette.text.secondaryTheme,
    },
    colorInfoTheme: {
      color: theme.palette.text.infoTheme,
    },
    colorWarningTheme: {
      color: theme.palette.text.warningTheme,
    },
    colorSuccessTheme: {
      color: theme.palette.text.successTheme,
    },
    colorExtraTheme: {
      color: theme.palette.text.extraTheme,
    },
  };
};

class Typography extends React.Component {
  static propTypes = {
    /* Value of text-align style property */
    align: T.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
    /* Type of font */
    variant: T.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption']),
    /* Text color */
    color: T.oneOf([
      'inherit',
      'primary',
      'secondary',
      'info',
      'warning',
      'success',
      'primaryTheme',
      'secondaryTheme',
      'defaultTheme',
      'infoTheme',
      'warningTheme',
      'successTheme',
      'extraTheme',
      'errorTheme',
    ]),
    /* Whether the text should be bolded */
    bold: T.bool,
    /* Whether the text should be uppercased */
    uppercase: T.bool,
    /* Text content */
    children: T.node,
    /* Wrapping component type */
    Component: T.oneOfType([T.string, T.func]),
    /* Default prop from withStyles */
    classes: T.object.isRequired,
    className: T.string,
  };

  static defaultProps = {
    color: 'primary',
    align: 'inherit',
    Component: 'span',
    forwardRef: null,
  };

  render() {
    const {
      variant,
      bold,
      uppercase,
      color,
      align,
      gutterBottom,
      Component,
      children,
      classes,
      className,
      forwardRef,
      ...rest
    } = this.props;
    const {
      root,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      caption,
      colorInherit,
      colorPrimary,
      colorSecondary,
      colorInfo,
      colorWarning,
      colorSuccess,

      colorExtraTheme,
      colorErrorTheme,
      colorPrimaryTheme,
      colorDefaultTheme,
      colorSecondaryTheme,
      colorInfoTheme,
      colorWarningTheme,
      colorSuccessTheme,

      textAlignInherit,
      textAlignCenter,
      textAlignLeft,
      textAlignRight,
      textAlignJustify,
      gutterBottom: classGutterBottom,
      bold: classBold,
      uppercase: classUppercase,
      ...restClasses
    } = classes;

    return (
      <Component
        className={classNames(root, className, {
          [h1]: variant === 'h1',
          [h2]: variant === 'h2',
          [h3]: variant === 'h3',
          [h4]: variant === 'h4',
          [h5]: variant === 'h5',
          [h6]: variant === 'h6',
          [caption]: variant === 'caption',
          [classGutterBottom]: gutterBottom,
          [classBold]: bold,
          [classUppercase]: uppercase,
          [colorPrimary]: color === 'primary',
          [colorSecondary]: color === 'secondary',
          [colorInherit]: color === 'inherit',
          [colorInfo]: color === 'info',
          [colorWarning]: color === 'warning',
          [colorSuccess]: color === 'success',

          [colorExtraTheme]: color === 'extraTheme',
          [colorErrorTheme]: color === 'errorTheme',
          [colorPrimaryTheme]: color === 'primaryTheme',
          [colorDefaultTheme]: color === 'defaultTheme',
          [colorSecondaryTheme]: color === 'secondaryTheme',
          [colorInfoTheme]: color === 'infoTheme',
          [colorWarningTheme]: color === 'warningTheme',
          [colorSuccessTheme]: color === 'successTheme',

          [textAlignInherit]: align === 'inherit',
          [textAlignCenter]: align === 'center',
          [textAlignLeft]: align === 'left',
          [textAlignRight]: align === 'right',
          [textAlignJustify]: align === 'justify',
        })}
        classes={typeof Component === 'string' ? null : restClasses}
        ref={forwardRef}
        {...rest}
      >
        {children}
      </Component>
    );
  }
}

export default withStyles(styles)(Typography);
