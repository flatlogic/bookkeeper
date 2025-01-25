import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';

import { PUBLIC_ROUTES } from '../../../../config';
import { set } from '../../../../services/object';
import { getError, parseServerModelErrors, parseModelErrors } from '../../../../services/form';
import Input from '../../../common/Input';
import Typography from '../../../common/Typography';
import Card from '../../../common/Card';
import Button from '../../../common/Button';
import Section from '../../../common/Form/Section';
import Form from '../../../common/Form/Form';
import ExpansionPanel from '../../../common/ExpansionPanel';
import AutocompleteInput from '../../../common/AutocompleteInput';
import Checkbox from "../../../common/Checkbox";

const styles = theme => ({
  root: {},
  actions: {
    background: 'transparent',
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
  spreadCheckbox: {
    marginTop: 10,
  },
  cardPadding: {
    padding: 30
  },
  typographySpacing: {
    display: 'inline-block',
    marginBottom: 20
  }
});

const VALIDATION_SCHEMA = Joi.object({
  account: Joi.number().required(),
  budget: Joi.object({
    period1Budget: Joi.string().required(),
    period2Budget: Joi.string().required(),
    period3Budget: Joi.string().required(),
    period4Budget: Joi.string().required(),
    period5Budget: Joi.string().required(),
    period6Budget: Joi.string().required(),
    period7Budget: Joi.string().required(),
    period8Budget: Joi.string().required(),
    period9Budget: Joi.string().required(),
    period10Budget: Joi.string().required(),
    period11Budget: Joi.string().required(),
    period12Budget: Joi.string().required(),
  }),
}).options({ stripUnknown: true, abortEarly: true });


class SpreadBudget extends React.PureComponent {
  static propTypes = {
    onSave: T.func.isRequired,
    errors: T.array,
    accountsList: T.array,
    subAccountsList: T.array,
  };

  static defaultProps = {
    accountsList: [],
    subAccountsList: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        account: null,
        subAccount: null,
        budget: {},
      },
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
      await this.props.onSave(form, form.subAccount || form.account, form.subAccount ? 'subaccount' : 'account');
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
    const form = {...this.state.form};
    form[name] = value;
    if (name === 'account') {
      form.subAccount =  null;
    } else if (name === 'subAccount') {
      const { accountsList, subAccountsList } = this.props;
      const subAccount = subAccountsList.find(item => item.id === value);
      form.account = subAccount.parent.id;
    }

    this.setState(
      state => ({
        form,
      }),
      () => !withoutValidate && this.debouncedValidate(),
    );

    this.getBudget(value);
  };

  getBudget = async (id, type = 'account') => {
    const budget = await this.props.getBudget(id, type);

    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        budget: budget || {},
      },
    }), this.validate);
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
          value={get(form, `budget.period${index+1}Budget`, '')}
          onChange={this.onChangeInput}
          onBlur={this.validate}
          error={getError(errors, `budget.${index}`, form)}
          noPadding
        />
      </div>
    );
  };

  onSpreadCheckboxChange = val => {
    const { form } = this.state;

    if (val && form.fiscalYearBudget) {
      const budget = {};
      for (let i = 1; i <= 12; i++) {
        budget[`period${i}Budget`] = (form.fiscalYearBudget / 12).toFixed(2);
      }
      this.setState(state => ({
        ...state,
        form: {
          ...state.form,
          budget,
        },
      }), this.validate);
    }
  };

  render() {
    const { classes, item, accountsList, subAccountsList } = this.props;
    const { isValid, form, errors } = this.state;
    const periods = (new Array(6)).fill({}, 0, 6);

    return (
      <React.Fragment>

        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          <Typography className={classes.typographySpacing} variant="h2">Spread Budget</Typography>
          <Card className={classes.cardPadding}>
            <Section classes={{root: classes.twoFieldsSection}}>
              <AutocompleteInput
                label="Account No"
                placeholder="Account"
                value={form.account}
                items={accountsList}
                onChange={item => this.onChange('account', item.id, true)}
                displayProp="code"
              />
              <Input
                label="Description"
                placeholder="Account Description"
                value={get(accountsList.find(item => item.id === form.account), 'description')}
                disabled
              />
            </Section>
            <Section classes={{root: classes.twoFieldsSection}} noPadding>
              <AutocompleteInput
                label="Subaccount No"
                placeholder="Subaccount"
                value={form.subAccount}
                items={subAccountsList}
                onChange={item => this.onChange('subAccount', item.id, true)}
                displayProp="code"
              />
              <Input
                label="Description"
                placeholder="Account Description"
                value={get(subAccountsList.find(item => item.id === form.subAccount), 'description', '')}
                disabled
              />
            </Section>
            {/*<ExpansionPanel label="Spread Budget">*/}
              <Card>
                <Section noPadding>
                  <Input
                    name="fiscalYearBudget"
                    label="Fiscal year budget"
                    value={form.fiscalYearBudget}
                    onChange={this.onChangeInput}
                    onBlur={this.validate}
                    error={getError(errors, 'fiscalYearBudget', form)}
                  />
                  <Checkbox label="Spread uniformly to each period"
                            onChange={this.onSpreadCheckboxChange}
                            classes={{root: classes.spreadCheckbox}}
                  />
                </Section>
                <Section classes={{root: classes.budgetWrapper}}>
                  <div className={classes.firstBudgetColumn}>
                    {periods.map((item, i) => (
                      this.renderBudgetInput(i)
                    ))}
                  </div>
                  <div className={classes.secondBudgetColumn}>
                    {periods.map((item, i) => (
                      this.renderBudgetInput(i+6)
                    ))}
                  </div>
                </Section>
              </Card>
            {/*</ExpansionPanel>*/}
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

export default withStyles(styles)(withRouter(SpreadBudget));
