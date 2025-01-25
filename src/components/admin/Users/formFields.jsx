import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Joi from '@hapi/joi';
import get from 'lodash/get';

import { set } from '../../../services/object';
import { getError, parseModelErrors } from '../../../services/form';
import Input from '../../common/Input';
import AsyncCheckInput, { STATES as InputStates } from '../../common/Input/asyncCheckInput';
import Card from '../../common/Card';
import Section from '../../common/Form/Section';
import FieldsGroup from '../../common/Form/FieldsGroup';
import Switch from '../../common/Switch';
import UserRoles from './userRoles';
import { phone as phoneValidator } from '../../../validators';
import withAuthUser from '../../../HOC/withAuthUser';
import { BASE_USER_ROLES } from '../../../config';

const styles = theme => ({
  root: {},
  actions: {
    marginTop: 20,
    background: 'transparent',
    justifyContent: 'space-between',
    '& button:not(:first-child)': {
      marginLeft: theme.elements.button.spaceBetween,
    },
    '& .right-block': {
      width: 'auto',
      background: 'transparent',
    },
  },
  statusWrapper: {
    paddingTop: 10,
    paddingLeft: 0,
  },
  cardPadding: {
    padding: 30,
  }
});

export const VALIDATION_SCHEMA = Joi.object({
  username: Joi.string()
    .min(2)
    .required(),
  firstName: Joi.string()
    .min(3)
    .required(),
  lastName: Joi.string()
    .min(3)
    .required(),
  email: Joi.string()
    .email({tlds: false})
    .required(),
  phone: phoneValidator,
}).options({ stripUnknown: true, abortEarly: false });

class UserFormFields extends React.Component {
  static propTypes = {
    item: T.object,
    onChange: T.func.isRequired,
    onValidChecked: T.func,
    organization: T.object,
  };

  static defaultProps = {
    item: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      _prevProps: {},
      form: props.item,
      roles: [],
      errors: null,
      externalErrors: null,
      isValid: false,
      userNameAvailable: true,
      isDeleting: false,
    };
    this.debouncedValidate = debounce(this.validate, 1000);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state._prevProps.errors) {
      return {
        externalErrors: props.errors,
      };
    }
  }

  validate = () => {
    const { error: errors } = VALIDATION_SCHEMA.validate(this.state.form);

    this.props.onValidChecked && this.props.onValidChecked(!errors && this.state.userNameAvailable);
    if (!errors) {
      this.setState({
        errors: {},
        isValid: true,
      });
      return;
    }
    this.setState({
      errors: parseModelErrors(errors),
      isValid: false,
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(
      state => set(state, `form.${name}`, value),
      () => {
        this.props.onChange(this.state.form);
        this.debouncedValidate();
      },
    );
  };

  onChangeRoles = roles => {
    this.setState(state => ({
      form: {
        ...state.form,
        roles,
      },
    }),
    () => {
      this.props.onChange(this.state.form);
      this.debouncedValidate();
    });
  };

  onChangeStatus = e => {
    const { name, value } = e.target;
    this.setState(
      state => set(state, `form.${name}`, !!+value),
    );
    this.validate();
  };

  onAvailabilityCheckChanged = state => {
    this.setState({
      userNameAvailable: state === InputStates.valid,
    }, () => {
      this.props.onValidChecked && this.props.onValidChecked(this.state.isValid && this.state.userNameAvailable);
    });
  };

  render() {
    const { classes, organization, _authUser } = this.props;
    const { form, errors, externalErrors } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.cardPadding}>
          <Card direction="row" classes={{root: classes.statusWrapper}}>
            <Switch name="status" checked={+form.status === 1} checkedValue={1} uncheckedValue={0}
                    label="Account status" labelPlacement="start" onChange={this.onChangeStatus}
            />
          </Card>
          <Section label="Personal Info">
            <AsyncCheckInput
              url="/admin/users/check-username"
              uniqIdentifierValue={form.id}
              name="username"
              label="Username"
              value={form.username}
              onChange={this.onChange}
              onBlur={this.validate}
              error={getError(externalErrors, 'username', form) || getError(errors, 'username', form)}
              onStateChange={this.onAvailabilityCheckChanged}
              required
            />
            <FieldsGroup>
              <Input
                name="firstName"
                label="First Name"
                value={form.firstName}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(externalErrors, 'firstName', form) || getError(errors, 'firstName', form)}
                required
              />
              <Input
                name="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(externalErrors, 'lastName', form) || getError(errors, 'lastName', form)}
                required
              />
            </FieldsGroup>
          </Section>
          <Section label="Contact Info">
            <AsyncCheckInput
              url="/admin/users/check-username"
              uniqIdentifierValue={form.id}
              name="email"
              label="Email"
              value={form.email}
              onChange={this.onChange}
              onBlur={this.validate}
              error={getError(externalErrors, 'email', form) || getError(errors, 'email', form)}
              onStateChange={this.onAvailabilityCheckChanged}
              required
            />
            <Input
              name="phone"
              label="Phone Number"
              value={form.phone}
              onChange={this.onChange}
              onBlur={this.validate}
              error={getError(externalErrors, 'phone', form) || getError(errors, 'phone', form)}
              mask="999-999-9999"
            />
          </Section>
{/* 
          {(
            organization || _authUser.roles.includes(BASE_USER_ROLES.admin) ||
            !!get(form, 'companyRoles', []).length || !!get(form, 'roles', []).length
          ) &&
            <Section label="Roles">
              <UserRoles user={form} onChange={this.onChangeRoles} organization={organization}/>
            </Section>
          } */}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(withAuthUser(UserFormFields)));
