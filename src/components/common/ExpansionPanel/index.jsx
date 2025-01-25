import React, { Component } from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '../Typography';

const styles = () => ({
  root: {
    marginTop: 20,
    border: 'none',
    boxShadow: 'none',
    paddingTop: 0,
    '&:before': {
      content: 'none',
    },
  },
  expansionPanelRootExpanded: {
    marginTop: '20px!important',
    marginBottom: '0px!important',
  },
  expansionPanelSummaryRoot: {
    padding: 0,
    justifyContent: 'end',
  },
  expansionPanelSummaryContent: {
    margin: 0,
    flexGrow: 'initial',
  },
  expansionPanelDetailsRoot: {
    padding: 0,
  },
  expansionPanelSummaryContentExpanded: {
    margin: '0 -6px 0 0!important',
    minHeight: 'auto!important',
  },
  label: {
    fontSize: '1rem',
    color: 'rgba(74, 73, 74, 0.5)',
    textTransform: 'uppercase',
  },
});

class ExpansionPanel extends Component {
  static propTypes = {
    label: T.string.isRequired,
    children: T.any,
  };

  render() {
    const { label, classes, children } = this.props;

    return (
      <MaterialExpansionPanel classes={{
        root: classes.root,
        expanded: classes.expansionPanelRootExpanded,
      }}>
        <ExpansionPanelSummary
          classes={{
            root: classes.expansionPanelSummaryRoot,
            content: classes.expansionPanelSummaryContent,
            expanded: classes.expansionPanelSummaryContentExpanded,
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.label}>{label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{root: classes.expansionPanelDetailsRoot}}>
          {children || <span />}
        </ExpansionPanelDetails>
      </MaterialExpansionPanel>
    );
  }
}

export default withStyles(styles)(ExpansionPanel);
