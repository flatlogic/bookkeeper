import React from 'react';
import MaterialTableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    borderBottom: 'none',
    padding: '5px 10px',
    fontSize: '1rem',
  },
});

class TableCell extends React.PureComponent {
  render() {
    return (
      <MaterialTableCell
        classes={{root: this.props.classes.root}}
        {...this.props}
      />
    );
  }
}

export default withStyles(styles)(TableCell);
