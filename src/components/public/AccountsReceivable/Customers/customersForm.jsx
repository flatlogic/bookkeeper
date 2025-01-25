import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

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
import AutocompleteInput from '../../../common/AutocompleteInput';
import Checkbox from '../../../common/Checkbox';

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
  thirdWidth: {
    width: '33%',
  },
  threeItems: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      width: '30%',
    },
  },
  accounts: {
    display: 'flex',
    alignItems: 'baseline',
    '& > div': {
      width: 150,
    },
    '& > div:first-child': {
      paddingRight: 20,
    },
    '& > div:last-child': {
      paddingLeft: 20,
    },
  },
  cardPadding: {
    padding: 30,
  },
  typographySpacing: {
    marginBottom: 20,
    display: 'inline-block',
  }
});

const VALIDATION_SCHEMA = Joi.object({
  code: Joi.string()
    .min(2)
    .required(),
  name: Joi.string()
    .required(),
  contactPerson: Joi.string()
    .required(),
  contactEmail: Joi.string()
    .required(),
  status: Joi.number()
  //   .required(),
}).options({ stripUnknown: true, abortEarly: true });


class CustomersForm extends React.PureComponent {
  static propTypes = {
    item: T.object,
    onSave: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
    accounts: T.array,
    subAccounts: T.array,
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
      sameForEmailing: true,
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
      this.props.history.push(PUBLIC_ROUTES.accountsReceivableCustomersList);
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
      state => set(state, `form.${name}`, value),
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

  toggleSameEmailingAddress = (e, value) => {
    this.setState({
      sameForEmailing: value,
    });
  };

  render() {
    const { classes, item, accounts, subAccounts } = this.props;
    const { isValid, form, errors, isCodeAvailable, sameForEmailing } = this.state;
    const { physicalAddress, mailingAddress } = form;

    return (
      <React.Fragment>

        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {
            item.id ? <Typography className={classes.typographySpacing} variant="h2">Edit Customer <b>{item.name}</b></Typography>
              : <Typography className={classes.typographySpacing} variant="h2">Add new Customer</Typography>
          }
          <Card className={classes.cardPadding}>
            <Section label="">
              <div className={classes.threeItems}>
                <AsyncCheckInput
                  url="/customers/check-code"
                  uniqIdentifierValue={form.id}
                  name="code"
                  label="Customer Code"
                  value={form.code}
                  onChange={this.onChangeInput}
                  onBlur={this.validate}
                  error={getError(errors, 'code', form)}
                  required
                  onStateChange={this.onAvailabilityCheckChanged}
                />
              </div>
              <Input
                name="name"
                label="Name"
                value={form.name}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'name', form)}
                required
              />
              {/*<Card direction="row">*/}
                {/*<Section noPadding>*/}
                  {/*<AddressForm*/}
                    {/*label="Physical Address"*/}
                    {/*fieldsGroupName="physicalAddress"*/}
                    {/*data={physicalAddress}*/}
                    {/*onChange={this.onChange}*/}
                    {/*validate={this.validate}*/}
                    {/*errors={errors}*/}
                  {/*/>*/}
                {/*</Section>*/}
                {/*<Section noPadding classes={{root: classes.emailingAddress}}>*/}
                  {/*{!sameForEmailing &&*/}
                  {/*<AddressForm*/}
                    {/*label="Mailing Address"*/}
                    {/*fieldsGroupName="mailingAddress"*/}
                    {/*data={mailingAddress}*/}
                    {/*onChange={this.onChange}*/}
                    {/*validate={this.validate}*/}
                    {/*errors={errors}*/}
                  {/*/>*/}
                  {/*}*/}
                {/*</Section>*/}
              {/*</Card>*/}
              <Checkbox checked={sameForEmailing} classes={{root: classes.sameForEmailing}} label="Same for Mailing" onChange={this.toggleSameEmailingAddress} />
              <Input
                name="contactPerson"
                label="Contact Name"
                value={form.contactPerson}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'contactPerson', form)}
                required
              />
              <Input
                name="contactEmail"
                label="Contact Email"
                value={form.contactEmail}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'contactEmail', form)}
                required
              />
              <div className={classes.accounts}>
                <AutocompleteInput
                  label=""
                  value={get(form.defaultAccount, 'id', form.defaultAccount)}
                  items={accounts}
                  onChange={item => this.onChange('defaultAccount', item.id)}
                  displayProp="code"
                />
                &mdash;
                <AutocompleteInput
                  label=""
                  value={get(form.defaultSubAccount, 'id', form.defaultSubAccount)}
                  items={subAccounts}
                  onChange={item => this.onChange('defaultSubAccount', item.id)}
                  displayProp="code"
                />
              </div>
              <Input
                name="invoiceTermsMessage"
                label="Customer Terms"
                value={form.invoiceTermsMessage}
                onChange={this.onChangeInput}
                onBlur={this.validate}
                error={getError(errors, 'invoiceTermsMessage', form)}
                required
              />

              <Checkbox label="Exempt for Late Charges"
                        checked={form.isExemptForLateFee}
                        onChange={val => this.onChange('isExemptForLateFee', val ? 1 : 0)}
              />

              <div className={classes.threeItems}>
                <Input
                  name="defaultSalesTaxRate"
                  label="Sales Tax Percent"
                  value={form.defaultSalesTaxRate}
                  onChange={this.onChangeInput}
                  onBlur={this.validate}
                  error={getError(errors, 'defaultSalesTaxRate', form)}
                  required
                />
                <Input
                  name="defaultSalesTaxStateCode"
                  label="State Code"
                  value={form.defaultSalesTaxStateCode}
                  onChange={this.onChangeInput}
                  onBlur={this.validate}
                  error={getError(errors, 'defaultSalesTaxStateCode', form)}
                  required
                />
                <Input
                  name="defaultSalesTaxDistrictCode"
                  label="District Code"
                  value={form.defaultSalesTaxDistrictCode}
                  onChange={this.onChangeInput}
                  onBlur={this.validate}
                  error={getError(errors, 'defaultSalesTaxDistrictCode', form)}
                  required
                />
              </div>
            </Section>
            <Section label="Sales Activity">
              <div className={classes.threeItems}>
                <Input
                  name="thisYearBillings"
                  label="This Year"
                  value={form.thisYearBillings}
                  onChange={this.onChangeInput}
                  onBlur={this.validate}
                  error={getError(errors, 'thisYearBillings', form)}
                  noPadding
                  required
                />
                <Input
                  name="lastYearBillings"
                  label="Last Year"
                  value={form.lastYearBillings}
                  onChange={this.onChangeInput}
                  onBlur={this.validate}
                  error={getError(errors, 'lastYearBillings', form)}
                  noPadding
                  required
                />
                <Input
                  name="toDateBillings"
                  label="To-Date"
                  value={form.toDateBillings}
                  onChange={this.onChangeInput}
                  onBlur={this.validate}
                  error={getError(errors, 'toDateBillings', form)}
                  noPadding
                  required
                />
              </div>
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

export default withStyles(styles)(withRouter(CustomersForm));
