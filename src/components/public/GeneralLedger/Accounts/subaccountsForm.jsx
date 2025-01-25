import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import moment from 'moment';

import { PUBLIC_ROUTES } from '../../../../config';
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
import ExpansionPanel from '../../../common/ExpansionPanel';
import AutocompleteInput from '../../../common/AutocompleteInput';

const styles = theme => ({
  root: {},
  actions: {
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
  twoFieldsSection: {
    display: 'flex',
    flexDirection: 'row',
    '& > div:first-child': {
      width: '30%',
      marginRight: 28,
    },
    '& > div:last-child': {
      width: '70%',
      marginTop: 2,
    },
  },
  budgetFieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  budgetFieldLabel: {
    color: theme.palette.input.label,
    marginRight: 20,
    fontSize: '0.875rem',
    width: 70,
    flex: 'auto',
    textAlign: 'right',
  },
  budgetFieldInput: {
    width: 115,
  },
  budgetWrapper: {
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
      width: '50%',
    },
    '& > div:first-child': {
      marginRight: 25,
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
}).options({ stripUnknown: true, abortEarly: true });


class SubaccountsForm extends React.PureComponent {
  static propTypes = {
    item: T.object,
    onSave: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
    accountsList: T.array,
  };

  static defaultProps = {
    item: {},
    accountsList: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {...props.item, ...(isEmpty(props.item) ? {} : { parent: get(props.item.parent, 'id', null) })},
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
      this.props.history.push(PUBLIC_ROUTES.generalLedgerSubaccountsList);
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

  onChange = (name, value, withoutValidate) => {
    this.setState(
      state => set(state, `form.${name}`, value),
      () => !withoutValidate && this.debouncedValidate(),
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

  renderBudgetInput = (index) => {
    const { classes } = this.props;
    const { form, errors } = this.state;
    const month = moment().month(index).format('MMMM');

    return (
      <div className={classes.budgetFieldWrapper}>
        <Typography className={classes.budgetFieldLabel}>{month}</Typography>
        <Input
          classes={{root: classes.budgetFieldInput}}
          key={index}
          name={`budget.period${index+1}Budget`}
          size="sm"
          value={get(form.budget, `budget.period${index+1}Budget`)}
          onChange={this.onChangeInput}
          onBlur={this.validate}
          error={getError(errors, `budget.${index}`, form)}
          noPadding
        />
      </div>
    );
  };

  render() {
    const { classes, item, accountsList } = this.props;
    const { isValid, form, errors, isCodeAvailable } = this.state;
    const periods = (new Array(6)).fill({}, 0, 6);

    return (
      <React.Fragment>

        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {
            item.id ? <Typography className={classes.titleSpacing} variant="h2">Edit Subaccount <b>{item.name}</b></Typography>
              : <Typography className={classes.titleSpacing} variant="h2">Add new Subaccount</Typography>
          }
          <Card className={classes.cardPadding}>
            <Section classes={{root: classes.twoFieldsSection}}>
              <AutocompleteInput
                label="Account No"
                placeholder="Account No"
                name="parent"
                value={form.parent}
                items={accountsList}
                onChange={item => this.onChange('parent', item.id, true)}
                displayProp="code"
              />
              <Input
                label="Description"
                placeholder="Account Description"
                value={get(accountsList.find(item => item.id === form.parent), 'description')}
                disabled
              />
            </Section>
            <Section classes={{root: classes.twoFieldsSection}} noPadding>
              <AsyncCheckInput
                url="/accounts/check-code"
                uniqIdentifierValue={form.id}
                name="code"
                label="Subaccount No"
                value={form.code}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'code', form)}
                required
                onStateChange={this.onAvailabilityCheckChanged}
              />
              <Input
                name="description"
                label="Subaccount Description"
                value={form.description}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'description', form)}
                required
              />
            </Section>
            {/*<ExpansionPanel label="Spread Budget">*/}
              {/*<Card>*/}
                {/*<Section noPadding>*/}
                  {/*<Input*/}
                    {/*name="fiscalYearBudget"*/}
                    {/*label="Fiscal year budget"*/}
                    {/*value={form.fiscalYearBudget}*/}
                    {/*onChange={this.onChangeInput}*/}
                    {/*onBlur={this.validate}*/}
                    {/*error={getError(errors, 'fiscalYearBudget', form)}*/}
                  {/*/>*/}
                {/*</Section>*/}
                {/*<Section classes={{root: classes.budgetWrapper}}>*/}
                  {/*<div className={classes.firstBudgetColumn}>*/}
                    {/*{periods.map((item, i) => (*/}
                      {/*this.renderBudgetInput(i)*/}
                    {/*))}*/}
                  {/*</div>*/}
                  {/*<div className={classes.secondBudgetColumn}>*/}
                    {/*{periods.map((item, i) => (*/}
                      {/*this.renderBudgetInput(i+6)*/}
                    {/*))}*/}
                  {/*</div>*/}
                {/*</Section>*/}
              {/*</Card>*/}
            {/*</ExpansionPanel>*/}
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

export default withStyles(styles)(withRouter(SubaccountsForm));
