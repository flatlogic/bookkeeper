import React from 'react';
import * as T from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import { amber, green } from '@material-ui/core/colors';

import { selectFlashMessage } from '../../selectors/app';
import { resetFlashMessage } from '../../redux/app';
import NotificationComp from '../../components/public/template/pages/Notifications/components';

const styles = theme => ({
  success: {
    backgroundColor: theme.palette.text.successTheme,
  },
  error: {
    backgroundColor: theme.palette.text.errorTheme,
  },
  info: {
    backgroundColor: theme.palette.text.infoTheme,
  },
  warning: {
    backgroundColor: theme.palette.text.warningTheme,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function Alert(props) {
  return <NotificationComp
    shadowless
    onClose={props.onClose}
    type="customer"
    message={props.children}
    variant="contained"
    color={props.severity}
  />
}

class Notification extends React.PureComponent {
  static propTypes = {
    variant: T.oneOf(['successTheme', 'warningTheme', 'errorTheme', 'infoTheme']),
    message: T.string,
    resetFlashMessage: T.func.isRequired,
  };

  onClose = () => {
    this.props.resetFlashMessage();
  };

  render() {
    const { classes, variant, message } = this.props;
    if (!message) {
      return null;
    }

    const open = !!message;
    const Icon = variantIcon[variant];

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={50000}
        onClose={this.onClose}
      >
        <Alert severity={variant} onClose={this.onClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

const mapStateToProps = state => {
  const flashMessage = selectFlashMessage(state);

  return {
    message: flashMessage ? flashMessage.message : null,
    variant: flashMessage ? flashMessage.type : null,
  };
};

export default connect(mapStateToProps, {resetFlashMessage})(withStyles(styles)(Notification));
