import React from "react";
import { withStyles } from '@material-ui/core/styles';

import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

const styles = theme => ({
  codeContainer: {
    display: props => (props.inline ? "inline-block" : "flex"),
    flexDirection: props => (props.row ? "row" : "column"),
    background: '#F7FAFF'
  },
  codeComponent: {
    flexGrow: props => (props.row ? 0 : 1),
    backgroundColor: 'transparent!important'
  },
})

const Code = ({ children, row, inline, classes }) => {
  return (
    <div className={classes.codeContainer}>
      <SyntaxHighlighter
        className={classes.codeComponent}
        language="javascript"
        style={jsx}
        customStyle={inline ? { padding: "2px 6px", margin: "-0.5em 0" } : {}}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default withStyles(styles)(Code);
