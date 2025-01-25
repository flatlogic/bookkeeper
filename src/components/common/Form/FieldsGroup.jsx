import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Card from '../Card';

const styles = ({
  root: {
    justifyContent: 'space-between',
  },
  oneChild: {
    '& > *': {
      flexBasis: '100%',
    },
  },
  twoChildren: {
    '& > *': {
      flexBasis: '50%',
    },
    '& > *:not(:first-child)': {
      marginLeft: 20,
    },
  },
  threeChildren: {
    '& > *': {
      flexBasis: '33.333333%',
    },
    '& > *:not(:first-child)': {
      marginLeft: 20,
    },
  }
});

class FieldsGroup extends React.PureComponent {
  static propTypes = {

    children: T.node.isRequired,
  };

  render() {
    const { children, classes } = this.props;

    return (
      <Card direction="row" classes={{root: classNames(classes.root, {
        [classes.oneChild]: children.length === 1,
        [classes.twoChildren]: children.length === 2,
        [classes.threeChildren]: children.length === 3,
      })}}>
        {children}
      </Card>
    );
  }
}

export default withStyles(styles)(FieldsGroup);
