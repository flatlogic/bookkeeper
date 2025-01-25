import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import {
  PUBLIC_ROUTES,
  ACCOUNT_RESTRICTIONS,
  ACCOUNT_RESTRICTIONS_JOB_EXPENSE,
  ACCOUNT_RESTRICTIONS_JOB_INCOME,
  ACCOUNT_TYPES,
  ACCOUNT_STATUSES
} from '../../../../config';
import { replaceRouteVars } from '../../../../services/string';
import { set } from '../../../../services/object';
import { getError, parseServerModelErrors, parseModelErrors } from '../../../../services/form';
import Input from '../../../common/Input';
import AsyncCheckInput, {STATES as InputStates} from '../../../common/Input/asyncCheckInput';
import Typography from '../../../common/Typography';
import Card from '../../../common/Card';
import Button from '../../../common/Button';
import Section from '../../../common/Form/Section';
import Form from '../../../common/Form/Form';
import AutocompleteInput from '../../../common/AutocompleteInput';

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
  cardPadding: {
    padding: 30,
  },
  titleSpacing: {
    display: 'inline-block',
    marginBottom: 20
  }
});

const VALIDATION_SCHEMA = Joi.object({
  code: Joi.string()
    .min(2)
    .required(),
  description: Joi.string()
    .min(3)
    .required(),
  type: Joi.string()
    .required(),
  status: Joi.number()
    .required(),
}).options({ stripUnknown: true, abortEarly: true });


class AccountsForm extends React.PureComponent {
  static propTypes = {
    item: T.object,
    onSave: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
    fiscalYear: T.number,
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
      isCodeAvailable: props.item.id,
      isDeleting: false,
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
      this.props.history.push(PUBLIC_ROUTES.generalLedgerAccountsList);
    } catch (errors) {
      this.setState({
        errors: parseServerModelErrors(errors),
      });
    }
  };

  onChangeInput = e => {
    const { name, value } = e.target;
    this.setState(
      state => set(state, `form.${name}`, value),
      this.debouncedValidate,
    );
  };

  onChange = (name, value) => {
    this.setState(
      state => {
        let newState = set(state, `form.${name}`, value);
        if (name === 'restriction' && !['jet', 'jit'].includes(value)) {
          newState.form.restrictionSubType = null;
        }
        return newState;
      },
      this.debouncedValidate,
    );
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
      this.props.history.push(replaceRouteVars(PUBLIC_ROUTES.generalLedgerAccountsList));
    } catch (e) {}
  };

  cancelDelete = () => {
    this.setState({
      isDeleting: false,
    });
  };

  onAvailabilityCheckChanged = state => {
    this.setState({
      isCodeAvailable: state === InputStates.valid,
    });
  };

  render() {
    const { classes, item, fiscalYear } = this.props;
    const { isValid, form, errors, isCodeAvailable } = this.state;

    return (
      <React.Fragment>

        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {
            item.id ? <Typography className={classes.titleSpacing} variant="h2">Edit Account <b>{item.name}</b></Typography>
              : <Typography className={classes.titleSpacing} variant="h2">Add new Account (Fiscal Year: {fiscalYear})</Typography>
          }
          <Card className={classes.cardPadding}>
            <Section label="">
              <AsyncCheckInput
                url="/accounts/check-code"
                uniqIdentifierValue={form.id}
                name="code"
                label="Account No"
                value={form.code}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'code', form)}
                required
                onStateChange={this.onAvailabilityCheckChanged}
              />
              <Input
                name="description"
                label="Description"
                value={form.description}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'description', form)}
                required
              />
              <AutocompleteInput
                label="Type"
                placeholder="Type"
                name="type"
                value={form.type}
                items={ACCOUNT_TYPES}
                onChange={item => this.onChange('type', item.id)}
                displayProp="name"
              />
              <AutocompleteInput
                label="Status"
                placeholder="Status"
                name="status"
                value={form.status}
                items={ACCOUNT_STATUSES}
                onChange={item => this.onChange('status', item.id)}
                displayProp="name"
              />
              <AutocompleteInput
                label="Restrictions"
                placeholder="Restrictions"
                name="restriction"
                value={form.restriction}
                items={ACCOUNT_RESTRICTIONS}
                onChange={item => this.onChange('restriction', item.id)}
                displayProp="name"
              />
              {['jet', 'jit'].includes(form.restriction) &&
                <AutocompleteInput
                  label=""
                  placeholder="Restrictions Sub Type"
                  name="restrictionSubType"
                  value={form.restrictionSubType}
                  items={form.restriction === 'jet' ? ACCOUNT_RESTRICTIONS_JOB_EXPENSE : ACCOUNT_RESTRICTIONS_JOB_INCOME}
                  onChange={item => this.onChange('restrictionSubType', item.id)}
                  displayProp="name"
                />
              }
            </Section>
          </Card>
          <Card classes={{root: classes.actions}} direction="row">
            {!!form.id ?
              <Button color="danger" size="large" onClick={this.onDelete}>Delete</Button>
              : <span />}
            <Card direction="row" className="right-block">
              <Button color="secondary" size="large" onClick={this.onCancel}>Cancel</Button>
              <Button color="primary" size="large" type="submit" disabled={!isValid || !isCodeAvailable}>Apply Changes</Button>
            </Card>
          </Card>
        </Form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(AccountsForm));
