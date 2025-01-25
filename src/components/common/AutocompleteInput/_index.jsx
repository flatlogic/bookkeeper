import React, {Component} from 'react';
import * as T from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';

import Input from '../Input';
import UnorderedList from '../UnorderedList';

const styles = () => ({
  root: {},
});

class AutocompleteInput extends Component {
  static propTypes = {
    maxItems: T.number,
    items: T.array,
    displayNameProp: T.string,
  };

  static defaultProps = {
    displayNameProp: 'name',
  };

  getSuggestions = (search) => {
    const { items, maxItems } = this.props;
    const suggestions = [];
    items.forEach((item, k) => {
      if (item.toLowerCase().includes(search)) {
        suggestions.push(item);
        if (suggestions.length === maxItems) {
          return suggestions;
        }
      }
    });
    return suggestions;
  };

  render() {
    const { displayNameProp, classes } = this.props;

    return (
      <div className={classes.root}>
        <Downshift>
          {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem,
            }) => {
              const { onBlur, onFocus, ...inputProps } = getInputProps({
                placeholder: 'Search for a country (start with a)',
              });

              return (
                <div className={classes.container}>
                  <Input {...this.props}getItemProps />

                  <div {...getMenuProps()}>
                    {isOpen && (
                      <UnorderedList>
                        {
                          this.getSuggestions(inputValue).map((suggestion, i) => {
                            return <li key={i}>{suggestion[displayNameProp]}</li>;
                          })
                        }
                      </UnorderedList>
                    )}
                  </div>
                </div>
              );
          }}
        </Downshift>
      </div>
    );
  }
}

export default withStyles(styles)(AutocompleteInput);
