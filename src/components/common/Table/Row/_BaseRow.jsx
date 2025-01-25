import React from 'react';
import * as T from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class BaseRow extends React.Component {
  static propTypes = {
    data: T.object.isRequired,
    columns: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        type: T.object.isRequired,
        label: T.string,
      }),
    ).isRequired,
    color: T.string,
    cellProps: T.object,
    className: T.string,
    onRowClick: T.func,
    onDelete: T.func,
    onEdit: T.func,
  };

  static defaultProps = {
    color: '',
    cellProps: {},
    className: '',
  };

  handleRowClick = ({ target }, onCopy) => {
    if (onCopy) {
      if (target.dataset.value) {
        onCopy({ target });
      } else {
        let td = target;
        if (target.nodeName.toUpperCase() !== 'TD') {
          td = target.closest('td');
        }
        let node = td.querySelector('[data-value]');
        if (!node) {
          // try to find in whole row
          node = td.closest('tr').querySelector('[data-value]');
        }
        if (node) {
          onCopy({ target: node });
        }
      }
    }

    if (this.props.onRowClick) {
      this.props.onRowClick(this.props.data);
    }
  };

  render() {
    const { data, columns, onDelete, onEdit, cellProps = {}, className = '' } = this.props;

    return (
      <TableRow
        style={color ? { backgroundColor: color } : {}}
        className={className}
        onClick={e => this.handleRowClick(e, onCopy)}
      >
        {columns.map(column =>
          <TableCell className={classes.cell}>
            {column}
          </TableCell>
        )}
      </TableRow>
    );
  }
}

export default BaseRow;
