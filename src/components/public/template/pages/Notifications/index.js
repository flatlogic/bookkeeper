import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import tinycolor from "tinycolor2";
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

import Notification from "./components/index";
import Widget from '../../components/Widget';
import Typography from '../../../../common/Typography'
import Button from '../../../../common/Button'
import Code from '../../components/Code';

const styles = theme => ({
  layoutContainer: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    border: `1px dashed ${theme.palette.text.primaryTheme}`,
    position: "relative",
  },
  layoutButtonsRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  layoutButton: {
    backgroundColor: tinycolor(theme.palette.text.primaryTheme).setAlpha(.3),
    width: 125,
    height: 50,
    outline: "none",
    border: "none",
    '@media (max-width: 1560px)': {
      width: 90,
      height: 40,
    }
  },
  layoutButtonActive: {
    backgroundColor: theme.palette.text.primaryTheme
  },
  customizedButton: {
    marginTop: 30,
    display: 'block',
    border: 'none',
    borderRadius: 4,
    fontSize: 16,
    padding: '4px 15px'
  },
  customizedParagraph: {
    display: 'block',
    marginBottom: 20,
  },
  notificationItem: {
    marginBottom: 20,
  },
  codeBlock: {
    background: 'red'
  },
  paragraphMargin: {
    marginBottom: 15,
    display: 'inline-block',
  }
})

function PositionedSnackbar({ classes }) {
  const [state, setState] = React.useState({
    open: false,
    severity: 'successTheme',
    message: 'This is success message',
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open, severity, message } = state;
  var [notificationsPosition, setNotificationPosition] = React.useState(2);

  const handleClick = (newState, positionId) => () => {
    setNotificationPosition(positionId);
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  function Alert(props) {
    return <Notification
    className={classes.notificationItem}
    shadowless
    onClose={props.onClose}
    type="customer"
    message={props.children}
    variant="contained"
    color={props.severity}
  />;
  }

  const buttons = (
    <div className={classes.layoutContainer}>
      <div className={classes.layoutButtonsRow}>
        <button
          onClick={handleClick({ vertical: 'top', horizontal: 'left', severity: 'success', message: 'This is a success message' }, 0)}
          className={classnames(classes.layoutButton, {
            [classes.layoutButtonActive]: notificationsPosition === 0
          })}
        />
        <button
          onClick={handleClick({ vertical: 'top', horizontal: 'center', severity: 'success', message: 'This is a success message' }, 1)}
          className={classnames(classes.layoutButton, {
            [classes.layoutButtonActive]: notificationsPosition === 1
          })}
        />
        <button
          onClick={handleClick({ vertical: 'top', horizontal: 'right', severity: 'success', message: 'This is a success message' }, 2)}
          className={classnames(classes.layoutButton, {
            [classes.layoutButtonActive]: notificationsPosition === 2
          })}
        />
      </div>
      <Typography className={classes.layoutText} size="md">
        Click any position
      </Typography>
      <div className={classes.layoutButtonsRow}>
        <button
          onClick={handleClick({ vertical: 'bottom', horizontal: 'left', severity: 'success', message: 'This is a success message' }, 3)}
          className={classnames(classes.layoutButton, {
            [classes.layoutButtonActive]: notificationsPosition === 3
          })}
        />
        <button
          onClick={handleClick({ vertical: 'bottom', horizontal: 'center', severity: 'success', message: 'This is a success message' }, 4)}
          className={classnames(classes.layoutButton, {
            [classes.layoutButtonActive]: notificationsPosition === 4
          })}
        />
        <button
          onClick={handleClick({ vertical: 'bottom', horizontal: 'right', severity: 'success', message: 'This is a success message' }, 5)}
          className={classnames(classes.layoutButton, {
            [classes.layoutButtonActive]: notificationsPosition === 5
          })}
        />
      </div>
    </div>
  );

  return (
    <div>
      <Grid container spacing={3}>
        
          <Grid item xs={12}>
            <Widget>
              <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={12}>
                <Typography className={classes.customizedParagraph} variant="h3">
                  MUI snackbar
                </Typography>
                <Typography variant="p" className={classes.paragraphMargin}>
                  Layout options
                  There are few position options available for notifications. You can click any of them to change notifications position:
                </Typography>
                {buttons}
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <Typography className={classes.customizedParagraph} variant="h3">Notification Types</Typography>
                <Typography variant="p" className={classes.paragraphMargin}>Different types of notifications for lots of use cases. Custom classes are also supported.</Typography>
                <Button color="primary" customClass={classes.customizedButton} onClick={handleClick({ vertical, horizontal, severity: 'primaryTheme', message: 'This is a info message'  })}>Info message</Button>
                <Button color="danger" customClass={classes.customizedButton} onClick={handleClick({ vertical, horizontal, severity: 'errorTheme', message: 'This is a error message'  })}>Error message</Button>
                <Button color="success" customClass={classes.customizedButton} onClick={handleClick({ vertical, horizontal, severity: 'successTheme', message: 'This is a success message'  })}>Success message
                </Button>
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
            <Typography className={classes.customizedParagraph} variant="h3">Dead Simple Usage</Typography>
            <Typography variant="p" className={classes.paragraphMargin}>Just few lines of code to instantiate a notifications object. Does not require passing any options:</Typography>
            <Code classes={{ root: classes.codeBlock }}>
              {`
    <Button
      customClass={classes.customizedButton}
      onClick={handleClick({
        vertical: ${vertical},
        horizontal: ${horizontal},
        severity: ${severity},
        message: ${message}
      })
    }>
              `}
            </Code>
          </Grid>
            </Grid>
            </Widget>
          </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Widget title="Notification Types Examples" disableWidgetMenu>
            <Notification
              className={classes.notificationItem}
              shadowless
              type="message"
              message="Thanks for Checking out Messenger"
              variant="contained"
              color="defaultTheme"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="feedback"
              message="New user feedback received"
              variant="contained"
              color="infoTheme"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="customer"
              message="New customer is registered"
              variant="contained"
              color="successTheme"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="shipped"
              message="The order was shipped"
              variant="contained"
              color="warningTheme"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="delivered"
              message="The order was delivered"
              variant="contained"
              color="primaryTheme"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="defence"
              message="5 Defence alerts"
              variant="contained"
              color="errorTheme"
            />
          </Widget>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Widget title="Notification Types Examples" disableWidgetMenu>
            <Notification
              className={classes.notificationItem}
              type="report"
              message="New report has been received"
              color="errorTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message="New user feedback received"
              color="primaryTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="shipped"
              message="The item was shipped"
              color="successTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="message"
              message="The new message from user @nahawaii"
              color="warningTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="upload"
              message="Your file is ready to upload"
              color="primaryTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="disc"
              message="The disc is full"
              color="infoTheme"
            />
          </Widget>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Widget title="Notification Types Examples" disableWidgetMenu>
            <Notification
              className={classes.notificationItem}
              type="report"
              message="New report has been received"
              variant="rounded"
              color="errorTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message="New user feedback received"
              variant="rounded"
              color="primaryTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="shipped"
              message="The item was shipped"
              variant="rounded"
              color="successTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="message"
              message="The new message from user @nahawaii"
              variant="rounded"
              color="warningTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="upload"
              message="Your file is ready to upload"
              variant="rounded"
              color="infoTheme"
            />
            <Notification
              className={classes.notificationItem}
              type="disc"
              message="The disc is full"
              variant="rounded"
              color="errorTheme"
            />
          </Widget>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withStyles(styles)(PositionedSnackbar);