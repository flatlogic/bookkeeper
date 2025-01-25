import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Modal from '../../common/Modal';
import Typography from '../../common/Typography';

const styles = () => ({});

class DeleteModal extends React.PureComponent {
  static propTypes = {
    items: T.array,
    onConfirm: T.func.isRequired,
    onCancel: T.func.isRequired,
    itemNames: T.array.isRequired,
  };

  render() {
    const { onConfirm, onCancel, items, itemNames } = this.props;

    return (
      <Modal onConfirm={onConfirm} onClose={onCancel} approveButtonLabel="Delete" >
        <Typography variant="h4">Confirm deleting selected {items && items.length === 1 ? itemNames[0] : itemNames[1]}</Typography>
        <br />
        <br />
        <Typography variant="h6">Are you sure you want to delete selected {items && items.length === 1 ? itemNames[0] : itemNames[1]}?</Typography>
        <br />
      </Modal>
    );
  }
}

export default withStyles(styles)(DeleteModal);
