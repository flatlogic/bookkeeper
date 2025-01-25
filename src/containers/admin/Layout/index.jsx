import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

import Sidebar from '../../../components/common/Sidebar';
import Header from '../Header';
import Card from '../../../components/common/Card';
import BreadCrumbs from '../../../components/public/BreadCrumbs';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  firstColumn: {
    width: 215,
    backgroundColor: '#fff',
    borderRight: `1px solid ${theme.palette.bg.rightColumn}`,
  },
  secondColumn: {
    flexGrow: 1,
    padding: '40px 40px',
    overflowX: 'hidden',
    backgroundColor: 'rgba(182, 193, 203, 0.13)',
    [theme.breakpoints.down("xs")]: {
      padding: '20px 15px',
    }
  },
  wrapper: {
    minHeight: '100%',
  },
});

class Layout extends React.PureComponent {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <Card classes={{root: classes.wrapper}} direction="row">
 
          <Sidebar />

          <div className={classes.secondColumn}>
            <Card direction="row" justifyContent="spaceBetween" withoutBg>
              <BreadCrumbs url={this.props.location.pathname} />
            </Card>
            {children}
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Layout));
