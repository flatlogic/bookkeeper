import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Card from '../Card';
import Typography from '../Typography';

const styles = ({
  root: {
    maxWidth: 440,
    width: '100%',
    paddingTop: 0,
  },
  label: {
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: '1.25rem',
  },
  noPadding: {
    padding: 0,
  }
});

class Section extends React.PureComponent {
  static propTypes = {
    label: T.string,
    children: T.node.isRequired,
    noPadding: T.bool,
  };

  render() {
    const { label, noPadding, children, classes } = this.props;

    return (
      <Card classes={{root: classNames(classes.root, {[classes.noPadding]: noPadding})}}>
        {label && <Typography classes={{root: classes.label}} variant="h4" uppercase>{label}</Typography>}
        {children}
      </Card>
    );
  }
}

export default withStyles(styles)(Section);
