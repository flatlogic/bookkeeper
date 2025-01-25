import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import Typography from '../Typography';
import Card from '../Card';
import Button from '../Button';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 99,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 18,
    cursor: 'pointer',
  },
  contentWrapper: {
    width: 550,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  buttonsWrapper: {
    justifyContent: 'flex-end',
    paddingTop: 20,
    '& button': {
      marginLeft: 20,
    },
  },
});

class Modal extends React.PureComponent {
  render() {
    const { classes, title, onClose, onConfirm, children, approveButtonLabel = 'Ok' } = this.props;

    return ReactDOM.createPortal(
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.title}>
            <Typography bold>{title}</Typography>
            <CloseIcon onClick={onClose} className={classes.closeIcon} />
          </div>
          <Card>
            {children}
          </Card>
          <Card direction="row" className={classes.buttonsWrapper}>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button variant="outlined" onClick={onConfirm}>{approveButtonLabel}</Button>
          </Card>
        </div>
      </div>,
      document.getElementsByTagName('body')[0],
    );
  }
}

export default withStyles(styles)(Modal);
