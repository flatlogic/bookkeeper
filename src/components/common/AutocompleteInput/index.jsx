import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable'
import { createSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import Card from '../Card';
import Typography from '../Typography';

const styles = theme => ({
  root: {
    paddingTop: 21,
  },
  label: {
    fontSize: 14,
    paddingBottom: 7,
    color: theme.palette.input.label,
    transform: 'none',
  },
  noPadding: {
    padding: 0,
  },
});

const selectStyles = (props = {}) => ({
  option: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isSelected || state.isFocused ? '#4B9FFE' : '#fff',
      fontSize: '0.8125rem',
    }
  },
  control: (provided) => ({
    ...provided,
    width: props.fullWidth ? '100%' : 'auto',
    borderRadius: 0,
    border: '1px solid #DFDFDF',
    fontSize: '0.8125rem',
  }),
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';
  //
  //   return { ...provided, opacity, transition };
  // }
});

const getPreparedItems = displayProp => createSelector(
  items => items,
  items => (items ||[]).map(item => (
    {
    ...item,
      label: typeof displayProp === 'function' ? displayProp(item) : item[displayProp],
      value: item.id,
    }
  )),
);

const getOptionByValue = (value, displayProp) => createSelector(
  items => getPreparedItems(displayProp)(items),
  items => items.find(item => `${item.id}` === `${value}`) || null,
);

class AutocompleteInput extends React.PureComponent {
  static propTypes = {
    items: T.array,
    displayProp: T.oneOfType([T.string, T.func]).isRequired,
    onChange: T.func.isRequired,
    value: T.any,
    allowCreateNewOptions: T.bool,
    fullWidth: T.bool,
    noPadding: T.bool,
  };

  static defaultProps = {
    displayProp: 'name',
  };

  onChange = value => {
    this.props.onChange(value);
  };

  getOptions = () => {
    const { items, displayProp } = this.props;
    return getPreparedItems(displayProp)(items);
  };

  render() {
    const { items, displayProp, value, label, allowCreateNewOptions, noPadding, ...props } = this.props;
    const { classes } = this.props;

    return (
      <Card classes={{root: classNames(classes.root, {[classes.noPadding]: noPadding})}}>
        {label && <Typography className={classes.label}>{label}</Typography>}
        {!allowCreateNewOptions &&
          <Select
            styles={selectStyles(this.props)}
            value={getOptionByValue(value, displayProp)(items)}
            options={this.getOptions()}
            escapeClearsValue
            {...props}
            onChange={this.onChange}
          />
        }
        {allowCreateNewOptions &&
          <CreatableSelect
            styles={selectStyles()}
            isClearable
            value={getOptionByValue(value, displayProp)(items)}
            onChange={this.onChange}
            onInputChange={this.handleInputChange}
            options={this.getOptions()}
            {...props}
          />
        }
      </Card>
    );
  }
}

export default withStyles(styles)(AutocompleteInput);
