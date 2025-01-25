import React from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import { withStyles } from '@material-ui/core/styles';
import debounce from 'lodash/debounce';

import { PUBLIC_ROUTES } from '../../../config';
import { set } from '../../../services/object';
import { getError, parseServerModelErrors, parseModelErrors } from '../../../services/form';
import Typography from '../../common/Typography';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Section from '../../common/Form/Section';
import Form from '../../common/Form/Form';
import Table from '../../common/Table/Table';
import ExpansionPanel from '../../common/ExpansionPanel';
import { phone as phoneValidator } from '../../../validators';

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
  currentFYWrapper: {
    width: 160,
  },
  dataWrapper: {
    '& tr td:first-child': {
      width: '1%',
      whiteSpace: 'nowrap',
      paddingRight: 20,
    },
    '& tr td:last-child > div': {
      width: 120,
      paddingTop: 0,
    },
    '& td': {
      paddingBottom: 12,
    },
  },
  twoFieldsWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& > div:first-child': {
      marginRight: 15,
    },
    '&.earningAccounts': {
      '& > div:last-child': {
        marginLeft: 15,
      },
    }
  },
  budgetWrapper: {
    width: '100%',
    '& .content': {
      display: 'flex',
      flexDirection: 'row',
      '& > table:first-child': {
        marginRight: 80,
      },
    }
  },
  notice: {
    fontSize: 12,
  },
  cardPadding: {
    padding: 30,
  },
  titleMargin: {
    marginBottom: 20,
    display: 'inline-block',
  }
});

const VALIDATION_SCHEMA = Joi.object({
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
  password: Joi.string(),
  repeatPassword: (Joi.string().valid(Joi.ref('password'))).messages({'any.only': 'Passwords should match'}),
}).options({ stripUnknown: true, abortEarly: true });

const ROLES_TABLE_CONFIG = {
  columns: [
    {id: 'role', label: 'Permit', type: 'text', sortable: false, value: '{role.name}'},
    {id: 'company', label: 'Company', type: 'text', sortable: false, value: '{company.name}'},
  ],
};

class Profile extends React.PureComponent {
  static propTypes = {
    data: T.object,
    onSave: T.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      form: props.data || {},
      errors: null,
      isValid: false,
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
      this.props.history.push(PUBLIC_ROUTES.generalLedger);
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

  onCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, data } = this.props;
    const { isValid, form, errors, externalErrors } = this.state;

    return (
      <React.Fragment>

        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          <Typography className={classes.titleMargin} variant="h2">My Profile</Typography>
          <Card className={classes.cardPadding}>
            <Section label="Personal Info">
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
                error={getError(errors, 'firstName', form)}
                required
              />
              <Input
                name="email"
                label="Email"
                value={form.email}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'email', form)}
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
            <ExpansionPanel label="Change Password">
              <Section noPadding>
                <Input
                  type="password"
                  name="password"
                  label="New Password"
                  onChange={this.onChange}
                  onBlur={this.validate}
                  error={getError(errors, 'password', form)}
                />
                <Input
                  type="password"
                  name="repeatPassword"
                  label="Confirm Password"
                  value={form.repeatPassword}
                  onChange={this.onChange}
                  onBlur={this.validate}
                  error={getError(errors, 'repeatPassword', form)}
                />
              </Section>
            </ExpansionPanel>
            {data.companyRoles && !!data.companyRoles.length &&
              <ExpansionPanel label="Roles">
                <Table
                  allowSelectAll={false}
                  classes={{root: classes.rolesTableRoot}}
                  columns={ROLES_TABLE_CONFIG.columns}
                  data={data.companyRoles}
                  pagination={{
                    enabled: false,
                  }}
                />
              </ExpansionPanel>
            }
          </Card>

          <Card classes={{root: classes.actions}} direction="row">
            <Card direction="row" className="right-block">
              <Button color="secondary" size="large" onClick={this.onCancel}>Cancel</Button>
              <Button color="primary" size="large" type="submit" disabled={!isValid}>Apply Changes</Button>
            </Card>
          </Card>
        </Form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(Profile));
