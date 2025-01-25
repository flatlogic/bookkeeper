import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';

const styles = () => ({
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
});

function UnorderedList(props) {
  const { classes, className, ...rest } = props;
  const { ul, ...restClasses } = classes;

  return <ul className={classNames(ul, className)} classes={isEmpty(restClasses) ? null : restClasses} {...rest} />;
}

export default withStyles(styles)(UnorderedList);
