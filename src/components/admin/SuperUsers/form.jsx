import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';
import { set } from '../../../services/object';
import { getError, parseServerModelErrors, parseModelErrors } from '../../../services/form';
import { phone as phoneValidator } from '../../../validators';
import Input from '../../common/Input';
import AsyncCheckInput, {STATES as InputStates} from '../../common/Input/asyncCheckInput';
import ExpansionPanel from '../../common/ExpansionPanel';
import Typography from '../../common/Typography';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Section from '../../common/Form/Section';
import FieldsGroup from '../../common/Form/FieldsGroup';
import Form from '../../common/Form/Form';
import DeleteConfirmationModal from './deleteConfirmationModal';
import Switch from '../../common/Switch';

const styles = theme => ({
  root: {},
  actions: {
    backgroundColor: 'transparent',
    marginTop: 20,
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
    paddingLeft: 30
  },
  title: {
    marginBottom: 30,
    display: 'inline-block',
  },
  cardPadding: {
    padding: 30
  },
});

const VALIDATION_SCHEMA = Joi.object({
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
}).options({ stripUnknown: true, abortEarly: true });

class SuperUserForm extends React.Component {
  static propTypes = {
    item: T.object,
    onSave: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
  };

  static defaultProps = {
    item: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {...props.item, ...(isEmpty(props.item) ? {status: 1} : {})},
      errors: null,
      isValid: false,
      isDeleting: false,
      isUserNameAvailable: true,
    };
    this.debouncedValidate = debounce(this.validate, 1000);
  }

  validate = () => {
    const { error: errors } = VALIDATION_SCHEMA.validate(this.state.form);

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

  onSave = async e => {
    e.preventDefault();

    const { form } = this.state;
    try {
      this.setState({errors: null});
      await this.props.onSave(form);
      this.props.history.push(
        replaceRouteVars(ADMIN_ROUTES.superUsersList)
      );
    } catch (errors) {
      this.setState({
        errors: parseServerModelErrors(errors),
      });
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(
      state => set(state, `form.${name}`, value),
      this.debouncedValidate,
    );
  };

  onChangeStatus = e => {
    const { name, value } = e.target;
    this.setState(
      state => set(state, `form.${name}`, !!+value),
    );
    this.validate();
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  onDelete = () => {
    this.setState({
      isDeleting: true,
    });
  };

  confirmDelete = async () => {
    this.setState({
      isDeleting: false,
    });
    try {
      await this.props.onDelete([this.props.item.id]);
      this.props.history.push(replaceRouteVars(ADMIN_ROUTES.superUsersList));
    } catch (e) {}
  };

  cancelDelete = () => {
    this.setState({
      isDeleting: false,
    });
  };

  onAvailabilityCheckChanged = state => {
    this.setState({
      isUserNameAvailable: state === InputStates.valid,
    });
  };

  render() {
    const { classes, item } = this.props;
    const { form, errors, isValid, isUserNameAvailable, isDeleting } = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {
            form.id ? <Typography className={classes.title} variant="h2">Edit User <b>{item.firstName} {item.lastName}</b></Typography>
            : <Typography className={classes.title} variant="h2">Add new Super User</Typography>
          }
          <Card direction="row" classes={{root: classes.statusWrapper}}>
            <Switch name="status" checked={+form.status === 1} checkedValue={1} uncheckedValue={0}
                    label="Account status" labelPlacement="start" onChange={this.onChangeStatus}
            />
          </Card>
          <Card className={classes.cardPadding}>
            <Section label="Personal Info">
              <AsyncCheckInput
                url="/admin/users/check-username"
                uniqIdentifierValue={form.id}
                name="username"
                label="Username"
                value={form.username}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'username', form)}
                noPadding
                required
                onStateChange={this.onAvailabilityCheckChanged}
              />
              <FieldsGroup>
                <Input
                  name="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={this.onChange}
                  onBlur={this.validate}
                  error={getError(errors, 'firstName', form)}
                  required
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={this.onChange}
                  onBlur={this.validate}
                  error={getError(errors, 'lastName', form)}
                  required
                />
              </FieldsGroup>
            </Section>
            <Section label="Contact Info">
              <Input
                name="email"
                label="Email"
                value={form.email}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'email', form)}
                noPadding
                required
              />
              <Input
                name="phone"
                label="Phone Number"
                value={form.phone}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'phone', form)}
                mask="999-999-9999"
              />
            </Section>
            {!!form.id &&
              <React.Fragment>
                <ExpansionPanel label="Recent Actions"/>
                <ExpansionPanel label="Account History" />
                <ExpansionPanel label="Page Views" />
              </React.Fragment>
            }
          </Card>
          <Card classes={{root: classes.actions}} direction="row">
            {!!form.id ?
              <Button color="danger" size="large" onClick={this.onDelete}>Delete</Button>
            : <span />}
            <Card direction="row" className="right-block">
              <Button color="secondary" size="large" onClick={this.onCancel}>Cancel</Button>
              <Button color="primary" size="large" type="submit" disabled={!isValid || !isUserNameAvailable}>Apply Changes</Button>
            </Card>
          </Card>
        </Form>
        {isDeleting &&
          <DeleteConfirmationModal onCancel={this.cancelDelete} onConfirm={this.confirmDelete} items={[item]}/>
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(SuperUserForm));