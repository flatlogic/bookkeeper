import React from 'react';
import * as T from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '../../Checkbox';
import TableCell from '../Cell/Base';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: 4,
  },
  row: {},
  buttonRoot: {
    width: '100%',
    fontWeight: 500,
    position: 'relative',
    padding: '5px 15px',
    fontSize: 12,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
    '&:hover': {
      background: 'none',
    },
  },
  noneActiveSort: {
    fontWeight: 'italic',
  },
  sortIcon: {
    marginLeft: 0,
  },
  buttonLabel: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class BaseHeadRow extends React.Component {
  static propTypes = {
    classes: T.object.isRequired,
    columns: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        type: T.string.isRequired,
        label: T.string.isRequired,
        properties: T.object,
        sortable: T.bool,
      }),
    ).isRequired,
    onClick: T.func,
    onSelect: T.func,
    sortKey: T.string,
    sortOrder: T.string,
    fixColumnsSize: T.bool,
    selected: T.bool,
    withDeleteAction: T.bool,
  };

  static defaultProps = {
    columns: {
      sortable: true,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      sortKey: this.props.sortKey,
      sortOrder: this.props.sortOrder,
    };

    this.rootRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (typeof this.props.fixColumnsSize !== 'undefined' && this.props.fixColumnsSize !== prevProps.fixColumnsSize) {
      if (this.props.fixColumnsSize) {
        this.holdCellWidth();
      } else {
        this.resetCellWidth();
      }
    }

    return null;
  }

  setSortKey = item => {
    if (item.sortable === false) {
      return;
    }

    this.setState(
      state => ({
        sortOrder: state.sortOrder === 'desc' ? 'asc' : 'desc',
        sortKey: item.id,
      }),
      () => {
        this.props.onClick &&
          this.props.onClick({
            sortOrder: this.state.sortOrder,
            sortKey: this.state.sortKey,
          });
      },
    );
  };

  holdCellWidth = () => {
    const cells = this.rootRef.current.querySelectorAll('th');
    [].forEach.call(cells, item => {
      item.style.minWidth = `${item.offsetWidth - 1}px`;
    });
  };

  resetCellWidth = () => {
    const cells = this.rootRef.current.querySelectorAll('th');
    [].forEach.call(cells, item => {
      item.style.minWidth = 'auto';
    });
  };

  onSelectAll = (e, val) => {
    this.props.onSelect && this.props.onSelect(val);
  };

  render() {
    const { classes, columns, selected, withDeleteAction, withSelectAll } = this.props;
    const { sortKey, sortOrder } = this.state;

    return (
      <RootRef rootRef={this.rootRef}>
        <TableRow className={classes.row}>
          {withSelectAll && <TableCell padding="checkbox">
            <Checkbox
              checked={selected}
              onChange={this.onSelectAll}
            />
          </TableCell>
          }
          {columns.map(item => {
            const isActiveSort = item.id && sortKey === item.id;

            return (
              <TableCell key={item.id} align="right" onClick={() => this.setSortKey(item)} className={classes.root}>
                {item.label && (
                  <Button
                    classes={{
                      root: classes.buttonRoot,
                      label: classes.buttonLabel,
                    }}
                    disableRipple
                  >
                    {item.label}
                    {isActiveSort && <span className={classes.sortIcon}>{sortOrder === 'desc' ? ' ▼' : ' ▲'}</span>}
                  </Button>
                )}
              </TableCell>
            );
          })}
          {withDeleteAction && (
            <TableCell key="action" align="right" className={classes.root}>
              <Button
                className={classes.noneActiveSort}
                classes={{
                  root: classes.buttonRoot,
                  label: classes.buttonLabel,
                }}
                disableRipple
              >
                Action
              </Button>
            </TableCell>
          )}
        </TableRow>
      </RootRef>
    );
  }
}

export default withStyles(styles, { name: 'BaseHeadRow' })(BaseHeadRow);
