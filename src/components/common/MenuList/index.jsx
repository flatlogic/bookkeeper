import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../Typography';
import UnorderedList from '../UnorderedList';

const styles = theme => ({
  root: { // Firefox fix: https://stackoverflow.com/questions/7785374/how-to-prevent-column-break-within-an-element
    columns: 2,
    '-webkit-columns': 2,
    '-moz-columns': 2,
    columnGap: 0,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 30,
    breakInside: 'avoid-column',
    '&:first-child, &.middleItem': {
      paddingTop: 0,
    },
  },
  label: {
    fontWeight: 500,
    '& a': {
      color: theme.palette.link.active,
    },
  },
  description: {
    fontSize: '0.875rem',
    marginTop: 10,
  },
});

class GeneralLedger extends React.PureComponent {
  static props = {
    items: T.arrayOf(
      T.shape({
        label: T.string,
        description: T.string,
        url: T.string,
      }),
    ),
  };

  render() {
    const { classes, items } = this.props;
    const middleItemIndex = Math.ceil(items.length / 2);

    return (
      <UnorderedList className={classes.root}>
        {items.map((item, i) => (
          <li key={i} className={classNames(classes.item, {'middleItem': middleItemIndex === i})}>
            <Typography className={classes.label} Component="div">
              <Link component={RouterLink} to={item.url}>
                {item.label}
              </Link>
            </Typography>
            <Typography className={classes.description} color="secondary">{item.description}</Typography>
          </li>
        ))}
      </UnorderedList>
    );
  }
}

export default withStyles(styles)(GeneralLedger);
