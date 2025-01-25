import React, { Component } from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  bg: {
    backgroundColor: theme.palette.common.white,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  mediumRadius: {
    borderRadius: 8,
  },
  smallRadius: {
    borderRadius: 4,
    padding: 8,
  },
  largeRadius: {
    borderRadius: 12,
  },
  withBorder: {
    border: theme.mixins.border(),
  },
  hover: {
    '&:hover': {
      backgroundColor: '#F8F8F8',
    },
  },
  colorPrimary: {},
  colorDefault: {},
  colorSecondary: { backgroundColor: theme.palette.secondary.light },
});

export class Card extends Component {
  static defaultProps = {
    Component: 'div',
    className: '',
  };

  render() {
    const {
      radius, Component, withBorder, children, className, hover, color, classes,
      direction, justifyContent, withoutBg, ...rest } = this.props;
    const {
      root,
      mediumRadius,
      withBorder: borderClass,
      smallRadius,
      largeRadius,
      colorPrimary,
      colorDefault,
      colorSecondary,
      hover: hoverClass,
      rowDirection,
      justifyContentSpaceBetween,
      bg,
      ...restClasses
    } = classes;

    return (
      <Component
        className={classNames(root, className, {
          [bg]: !withoutBg,
          [rowDirection]: direction === 'row',
          [justifyContentSpaceBetween]: justifyContent === 'spaceBetween',
          [mediumRadius]: radius === 'md',
          [smallRadius]: radius === 'sm',
          [largeRadius]: radius === 'lg',
          [borderClass]: withBorder,
          [hoverClass]: hover,
          [colorPrimary]: color === 'primary',
          [colorDefault]: color === 'default',
          [colorSecondary]: color === 'secondary',
        })}
        classes={typeof Component === 'string' ? null : restClasses}
        {...rest}
      >
        {children}
      </Component>
    );
  }
}

Card.propTypes = {
  /* Card color */
  color: T.oneOf(['default', 'primary', 'secondary']),
  /* Border radius size */
  radius: T.oneOf(['sm', 'md', 'lg']),
  /* Items direction */
  direction: T.oneOf(['column', 'row']),
  /* Items direction */
  justifyContent: T.oneOf(['spaceBetween']),
  /* Whether the card has borders */
  withBorder: T.bool,
  /* Whether the card has background */
  withoutBg: T.bool,
  /* Whether the card should have a hover state */
  hover: T.bool,
  /* className */
  className: T.string,
  /* Wrapping component type */
  Component: T.oneOfType([T.string, T.func]),
  /* The card content */
  children: T.node.isRequired,
  /* Default props from withStyles */
  classes: T.object.isRequired,
};

export default withStyles(styles)(Card);
