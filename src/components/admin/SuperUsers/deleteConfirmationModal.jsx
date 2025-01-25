import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Modal from '../../common/Modal';
import Typography from '../../common/Typography';

const styles = () => ({});

class DeleteConfirmationModal extends React.PureComponent {
  static propTypes = {
    items: T.array,
    onConfirm: T.func.isRequired,
    onCancel: T.func.isRequired,
  };

  render() {
    const { onConfirm, onCancel, items } = this.props;

    return (
      <Modal onConfirm={onConfirm} onClose={onCancel} approveButtonLabel="Delete" >
        <Typography variant="h4">Confirm deleting {items && items.length === 1 ? 'Super User' : 'Super Users'}</Typography>
        <br />
        <Typography variant="h6">Are you sure you want to delete selected {items && items.length === 1 ? 'Super User' : 'Super Users'}?</Typography>
        <br />
      </Modal>
    );
  }
}

export default withStyles(styles)(DeleteConfirmationModal);
