import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import get from 'lodash/get';

import CellFactory from '../Cell/factory';
import TableCell from '../Cell/Base';
import Checkbox from '../../Checkbox';
import { replaceVars } from '../../../../services/string';

const styles = theme => ({
  root: {
    height: 52,
  },
  clickableRow: {
    cursor: 'pointer',
  },
  deleteAction: {
    color: theme.palette.link.main,
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
});

class BaseRow extends React.Component {
  static propTypes = {
    data: T.object,
    columns: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        type: T.string.isRequired,
        label: T.string.isRequired,
        properties: T.object,
        value: T.oneOfType([T.string, T.func])
      }),
    ),
    selected: T.bool,
    color: T.string,
    onClick: T.func,
    onDelete: T.func,
    onEdit: T.func,
    children: T.any,
    withSelectAll: T.bool,
  };

  static defaultProps = {
    color: '',
  };

  onClick = () => {
    this.props.onClick && this.props.onClick(this.props.data);
  };

  onSelect = (e, val) => {
    e.stopPropagation();
    this.props.onSelect && this.props.onSelect(this.props.data, val);
  };

  onDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete && this.props.onDelete(this.props.data);
  };

  render() {
    const { children, data, columns, selected, onDelete, onEdit, classes, withSelectAll } = this.props;

    return (
      <TableRow
        style={{background: selected && '#E1EFFF'}}
        onClick={this.onClick}
        classes={{root: classNames(classes.root, {[classes.clickableRow]: this.props.onClick})}}
      >
        {children ?
          children.map((item, i) =>
            <TableCell key={i}>{item}</TableCell>
          ) : (
            <React.Fragment>
              {withSelectAll &&
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected}
                    onChange={this.onSelect}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
              }
              {columns.map(column => CellFactory(
                column.type,
                column.value ? (
                    typeof column.value === 'function' ?
                      column.value.call(this, data, column) :
                      replaceVars(column.value, data, true)
                  ) :
                  get(data, column.id),
                column,
                data,
              ))}
              {onDelete && (
                <TableCell>
                  <a href="#" className={classes.deleteAction} onClick={this.onDelete}>Delete</a>
                </TableCell>
              )}
            </React.Fragment>
          )
        }
      </TableRow>
    );
  }
}

export default withStyles(styles)(BaseRow);
