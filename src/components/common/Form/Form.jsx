import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    '& .MuiFormControl-root': {
      paddingBottom: 15,
    },
  },
});

class Form extends React.PureComponent {
  static propTypes = {
    onSubmit: T.func,
    children: T.node,
  };

  onSubmit = e => {
    this.props.onSubmit && this.props.onSubmit(e);
  };

  render() {
    const { classes, children } = this.props;

    return (
      <form onSubmit={this.onSubmit} className={classes.root}>
        {children}
      </form>
    );
  }
}

export default withStyles(styles)(Form);
