import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import ErrorIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/Check';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import InputMask from 'react-input-mask';
import debounce from 'lodash/debounce';

const styles = theme => ({
  root: {
    position: 'relative',
    paddingTop: 21,
    paddingBottom: '0!important',
  },
  inputRoot: {
    border: theme.mixins.border(),
    '&:after': {
      content: 'none',
    },
    '&:before': {
      content: 'none',
    },
  },
  inputInput: {
    fontSize: '1rem',
    lineHeight: '1.25rem',
    padding: '0 10px',
  },
  outlined: {
    boxSizing: 'border-box',
    borderRadius: 0,
    '& $formHelperTextError': {
      top: theme.spacing(2),
    },
  },
  labelRoot: {
    fontSize: 14,
    paddingBottom: 7,
    color: theme.palette.input.label,
    transform: 'none',
    position: 'relative',
    '& + $formControl': {
      marginTop: 0,
    },
    '&$labelFocused': {
      color: theme.palette.secondary.main,
    },
  },
  noPadding: {
    padding: 0,
  },
  labelFocused: {},
  focused: {},
  formControl: {},
  formHelperTextError: {
    position: 'absolute',
    bottom: -20,
    top: 'auto!important',
  },
  sizeSmall: {
    height: 33,
  },
  sizeMedium: {
    height: 36,
    fontSize: '0.8125rem',
  },
  sizeLarge: {
    height: 45,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 7,
    fontSize: 18,
  },
  invalidIcon: {
    fill: '#dc2222e6',
  },
  validIcon: {
    fill: '#09a209',
  },
});

class InputField extends React.Component {
  static defaultProps = {
    defaultValue: '',
    variant: 'outlined',
    size: 'md',
  };

  static propTypes = {
    /* Input label */
    label: T.node,
    /* Input style type */
    variant: T.oneOf(['outlined', 'standard', 'filled']),
    /* Input change callback */
    onChange: T.func,
    /* Input value */
    value: T.oneOfType([T.string, T.number]),
    /* Input helper text */
    helperText: T.string,
    /* Default props from withStyles */
    classes: T.object.isRequired,
    /* Use debounce change */
    withDebounce: T.bool,
    /* Use debounce change */
    size: T.oneOf(['lg', 'md', 'sm']),
    /* Remove padding */
    noPadding: T.bool,
    /* Is field required */
    required: T.bool,
    /* Input mask */
    mask: T.string,
    /* Additional input state to show icons */
    state: T.oneOf(['loading', 'valid', 'invalid']),
    /* Display error anyway */
    forceErrorDisplay: T.bool,
  };

  constructor(props) {
    super(props);
    const {
      defaultValue,
    } = this.props;
    const value = typeof this.props.value !== 'undefined' ? this.props.value : defaultValue;

    this.state = {
      focused: false,
      displayValue: value,
      error: null,
      touched: false,
    };
    if (this.props.onChange) {
      this.debounceOnChange = this.props.withDebounce ? debounce(this.props.onChange, 650) : this.props.onChange;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        displayValue: this.props.value,
      });
    }
  }

  onInputChange = (e) => {
    let {
      target: {
        value,
      },
    } = e;
    let valid = true;

    if (this.debounceOnChange && valid) {
      this.debounceOnChange(e, value);
    }
    this.setState({
      displayValue: value,
      error: null,
    });
  };

  onBlur = e => {
    this.props.onBlur && this.props.onBlur(e);
    this.setState({
      touched: true,
    });
    this.toggleFocus();
  };

  toggleFocus = () => {
    this.setState(state => ({
      focused: !state.focused,
    }));
  };

  render() {
    const {
      label,
      value,
      defaultValue,
      helperText,
      variant,
      fullWidth,
      onChange,
      withDebounce,
      noPadding,
      classes,
      error,
      size,
      mask,
      onBlur,
      state,
      required,
      children,
      forceErrorDisplay,
      ...rest
    } = this.props;
    const { displayValue, focused, touched } = this.state;

    return (
      <FormControl
        fullWidth={fullWidth}
        classes={{
          root: classNames(classes.root, {
            [classes.outlined]: variant === 'outlined',
            [classes.noPadding]: noPadding,
            [classes.focused]: focused,
          }),
        }}
      >
        {label && (
          <InputLabel classes={{ root: classes.labelRoot, focused: classes.labelFocused }} disableAnimation shrink>
            {label} {!required && '(optional)'}
          </InputLabel>
        )}

        {children}

        {mask ?
          <InputMask mask={mask}
                     value={displayValue}
                     onBlur={this.onBlur}
                     onFocus={this.toggleFocus}
                     onChange={this.onInputChange}
          >
            <Input
              classes={{
                root: classNames(classes.inputRoot),
                input: classNames(classes.inputInput, {
                  [classes.sizeSmall]: size === 'sm',
                  [classes.sizeMedium]: size === 'md',
                  [classes.sizeLarge]: size === 'lg',
                }),
                formControl: classes.formControl,
              }}
              error={!!error}
              {...rest}
            />
          </InputMask>
          :
          <Input
            classes={{
              root: classNames(classes.inputRoot),
              input: classNames(classes.inputInput, {
                [classes.sizeSmall]: size === 'sm',
                [classes.sizeMedium]: size === 'md',
                [classes.sizeLarge]: size === 'lg',
              }),
              formControl: classes.formControl,
            }}
            onChange={this.onInputChange}
            error={!!error}
            value={displayValue}
            onFocus={this.toggleFocus}
            onBlur={this.onBlur}
            {...rest}
          />
        }
        {((error && touched) || forceErrorDisplay) && (
          <FormHelperText classes={{ error: classes.formHelperTextError }} error>
            {error}
          </FormHelperText>
        )}
        {!error && displayValue && state && (
          (state === 'invalid' && <ErrorIcon className={classNames(classes.icon, classes.invalidIcon)} />) ||
          (state === 'valid' && <CheckIcon className={classNames(classes.icon, classes.validIcon)} />) ||
          (state === 'loading' && <AutorenewIcon className={classes.icon} />)
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}

export default withStyles(styles)(InputField);
