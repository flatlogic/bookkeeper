import * as React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  centered: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    '& .spinner > div': {
      backgroundColor: 'attr(data-color)',
    },
  },
  root: {
    '& .spinner': {
      width: 100,
      textAlign: 'center',
    },

    '& .spinner > div': {
      width: 14,
      height: 14,
      backgroundColor: '#C33733',

      borderRadius: '100%',
      display: 'inline-block',
      animation: 'sk-bouncedelay 1.4s infinite ease-in-out both',
    },

    '& .spinner .bounce1': {
      animationDelay: '-0.32s',
      marginLeft: 10,
    },

    '& .spinner .bounce2': {
      animationDelay: '-0.16s',
      marginLeft: 10,
    },

    '& .spinner .bounce3': {
      marginLeft: 10,
    },
  },
  '@global @keyframes sk-bouncedelay': {
    '0%, 80%, 100%': { transform: 'scale(0)' },
    '40%': { transform: 'scale(1.0)' },
  },
});

function Loading({ width = 'auto', height = '100%', centered = false, color = '#C33733', classes = {} }) {
  return (
    <div className={`${classes.root} ${centered ? classes.centered : ''}`} style={{ width, height }}>
      <div className="spinner">
        <div className="bounce1" data-color={color} />
        <div className="bounce2" data-color={color} />
        <div className="bounce3" data-color={color} />
      </div>
    </div>
  );
}

export default withStyles(styles)(Loading);
