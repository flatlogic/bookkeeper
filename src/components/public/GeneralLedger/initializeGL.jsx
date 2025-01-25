import React from 'react';
import * as T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';

import { PUBLIC_ROUTES } from '../../../config';
import { set } from '../../../services/object';
import { getError, parseServerModelErrors, parseModelErrors } from '../../../services/form';
import Typography from '../../common/Typography';
import Card from '../../common/Card';
import Button from '../../common/Button';
import AutocompleteInput from '../../common/AutocompleteInput';
import Section from '../../common/Form/Section';
import Form from '../../common/Form/Form';

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
  currentFYWrapper: {
    '& > td:first-child': {
      whiteSpace: 'initial!important',
    },
    '& > td:first-child > div': {
      width: 160,
    },
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
    marginTop: 25,
  },
  sectionPadding: {
    paddingTop: 0,
  },
});

const VALIDATION_SCHEMA = Joi.object({
  calendarYearPeriod1: Joi.number().required(),
  retainedEarningsAccount: Joi.number().required(),
  retainedEarningsSubAccount: Joi.number().required(),
  isPriorFiscalYearClosed: Joi.required(),
  period1Month: Joi.required(),
  period2Month: Joi.required(),
  period3Month: Joi.required(),
  period4Month: Joi.required(),
  period5Month: Joi.required(),
  period6Month: Joi.required(),
  period7Month: Joi.required(),
  period8Month: Joi.required(),
  period9Month: Joi.required(),
  period10Month: Joi.required(),
  period11Month: Joi.required(),
  period12Month: Joi.required(),
}).options({ stripUnknown: true, abortEarly: true });

const YEARS = [
  {label: 2018, value: 2018, id: 2018},
  {label: 2019, value: 2019, id: 2019},
];

const FISCAL_YEAR_STATUSES = [
  {label: 'OPEN', value: false, id: false},
  {label: 'CLOSED', value: true, id: true},
];

const MONTHS = moment.months().map((monthName, index) => (
  { label: monthName, id: index + 1, value: index + 1}
));

const PERIOD_STATUSES = [
  { label: 'Open', id: 1, value: 1},
  { label: 'Closed', id: 0, value: 0},
];

class InitializeGL extends React.PureComponent {
  static propTypes = {
    data: T.object,
    accounts: T.array,
    subAccounts: T.array,
    onSave: T.func.isRequired,
  };

  constructor(props) {
    super(props);

    const form = props.data || {};
    if (!form.id) {
      for (let i = 1; i <= 12; i++) {
        form[`period${i}Status`] = 1;
      }
    } else {
      form.retainedEarningsAccount = form.retainedEarningsAccount.id;
      form.retainedEarningsSubAccount = form.retainedEarningsSubAccount.id;
    }

    this.state = {
      form,
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

  onPeriodNameChange = (name, monthNumber, index) => {
    const { form } = set(this.state, `form.${name}`, monthNumber);

    if (index === 0) {
      let periodMonthNumber = monthNumber;
      for (let i = 1; i <= 12; i++) {
        if (periodMonthNumber > 12) {
          periodMonthNumber = 1;
        }
        form[`period${i}Month`] = periodMonthNumber;
        periodMonthNumber++;
      }
    }

    this.setState(
      state => ({
        ...state,
        form,
      }),
      this.debouncedValidate,
    );
  };

  onChange = (name, value) => {
    this.setState(
      state => set(state, `form.${name}`, value),
      this.debouncedValidate,
    );
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  renderBudgetInput = (index) => {
    const { classes } = this.props;
    const { form, errors } = this.state;

    return (
      <tr className={classes.budgetFieldWrapper}>
        <td>
          <Typography className={classes.budgetFieldLabel}>Description of Period {index + 1}:</Typography>
        </td>
        <td className={classes.twoFieldsWrapper}>
          <AutocompleteInput
            key={`name${index}`}
            name={`period${index+1}Month`}
            size="sm"
            value={get(form, `period${index+1}Month`, '')}
            onBlur={this.validate}
            error={getError(errors, `period${index+1}Month`, form)}
            noPadding
            items={MONTHS}
            onChange={item => this.onPeriodNameChange(`period${index+1}Month`, item.id, index)}
            displayProp="label"
          />
          <AutocompleteInput
            key={`status${index}`}
            name={`period${index+1}Status`}
            size="sm"
            value={get(form, `period${index+1}Status`, '')}
            onBlur={this.validate}
            error={getError(errors, `period${index+1}Status`, form)}
            noPadding
            items={PERIOD_STATUSES}
            onChange={item => this.onChange(`period${index+1}Status`, item.id)}
            displayProp="label"
          />
        </td>
      </tr>
    );
  };

  render() {
    const { classes, accounts, subAccounts } = this.props;
    const { isValid, form, errors } = this.state;
    const periods = (new Array(6)).fill({}, 0, 6);

    return (
      <React.Fragment>

        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          <Typography variant="h2">Initialize G/L System</Typography>

          <Card className={classes.cardPadding}>
            <Section className={classes.sectionPadding} label="">
              <table className={classes.dataWrapper}>
                <tr className={classes.currentFYWrapper}>
                  <td>
                    <Typography Component="div">Current Fiscal Year:</Typography>
                    <Typography Component="div">
                      <small className={classes.notice}>Last Year's balance have been transferred</small>
                    </Typography>
                  </td>
                  <td>
                    <Typography>{form.currentFiscalYear}</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Calendar Year of Period 1</Typography>
                  </td>
                  <td>
                    <AutocompleteInput
                      label=""
                      value={form.calendarYearPeriod1}
                      items={YEARS}
                      onChange={item => this.onChange('calendarYearPeriod1', item.id)}
                      displayProp="label"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Retained Earnings Account</Typography>
                  </td>
                  <td className={classNames(classes.twoFieldsWrapper, 'earningAccounts')}>
                    <AutocompleteInput
                      label=""
                      value={form.retainedEarningsAccount}
                      items={accounts}
                      onChange={item => this.onChange('retainedEarningsAccount', item.id)}
                      displayProp="code"
                    />
                    &mdash;
                    <AutocompleteInput
                      label=""
                      value={form.retainedEarningsSubAccount}
                      items={subAccounts}
                      onChange={item => this.onChange('retainedEarningsSubAccount', item.id)}
                      displayProp="code"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Prior Fiscal Year Status</Typography>
                  </td>
                  <td>
                    <AutocompleteInput
                      label=""
                      value={form.isPriorFiscalYearClosed}
                      items={FISCAL_YEAR_STATUSES}
                      onChange={item => this.onChange('isPriorFiscalYearClosed', item.id)}
                      displayProp="label"
                    />
                  </td>
                </tr>
              </table>
            </Section>

            <Section label="Periods Definition" classes={{root: classes.budgetWrapper}}>
              <div className="content">
                <table className={classes.dataWrapper}>
                  {periods.map((item, i) => (
                    this.renderBudgetInput(i)
                  ))}
                </table>
                <table className={classes.dataWrapper}>
                  {periods.map((item, i) => (
                    this.renderBudgetInput(i+6)
                  ))}
                </table>
              </div>
            </Section>

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

export default withStyles(styles)(withRouter(InitializeGL));
