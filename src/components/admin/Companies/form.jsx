import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';
import { set } from '../../../services/object';
import { getError, parseServerModelErrors, parseModelErrors } from '../../../services/form';
import Input from '../../common/Input';
import AsyncCheckInput, {STATES as InputStates} from '../../common/Input/asyncCheckInput';
import ExpansionPanel from '../../common/ExpansionPanel';
import Typography from '../../common/Typography';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Section from '../../common/Form/Section';
import FieldsGroup from '../../common/Form/FieldsGroup';
import Form from '../../common/Form/Form';
import Checkbox from '../../common/Checkbox';
import Switch from '../../common/Switch';
import DeleteConfirmationModal from './deleteConfirmationModal';
import AddressForm from '../Organizations/addressForm';
import { address as addressValidator } from '../../../validators';

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
  sameForEmailing: {
    marginTop: 20,
  },
  statusWrapper: {
    paddingTop: 30,
    paddingLeft: 30,
  },
  addressPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardPadding: {
    padding: 30,
  },
  titleMargin: {
    marginBottom: 20,
    display: 'inline-block',
  },
});

const VALIDATION_SCHEMA = Joi.object({
  name: Joi.string()
    .min(2)
    .required(),
  code: Joi.string()
    .min(2)
    .required(),
  description: Joi.string()
    .min(3),
  country: Joi.string()
    .min(3)
    .required(),
  licenseNumber: Joi.string()
    .required(),
  physicalAddress: addressValidator.options({ stripUnknown: true, abortEarly: false }).allow(null),
  mailingAddress: addressValidator.options({ stripUnknown: true, abortEarly: false }).allow(null),
}).options({ stripUnknown: true, abortEarly: true });

class CompanyForm extends React.Component {
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
      sameForEmailing: isEqual(
        {...props.item.physicalAddress, id: undefined},
        {...props.item.mailingAddress, id: undefined},
      ),
      errors: null,
      isValid: false,
      isCodeAvailable: !!props.item.id,
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

    const { form, sameForEmailing } = this.state;
    if (sameForEmailing) {
      form.mailingAddress = form.physicalAddress;
    }
    try {
      this.setState({errors: null});
      await this.props.onSave(form);
      this.props.history.push(
        replaceRouteVars(ADMIN_ROUTES.companiesList)
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

  toggleSameEmailingAddress = (e, value) => {
    this.setState({
      sameForEmailing: value,
    }, this.validate());
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
      this.props.history.push(replaceRouteVars(ADMIN_ROUTES.companiesList));
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
    const { classes, item } = this.props;
    const { form, errors, isValid, isDeleting, sameForEmailing, isCodeAvailable } = this.state;
    const { physicalAddress, mailingAddress } = form;

    return (
      <React.Fragment>
        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {
            item.id ? <Typography className={classes.titleMargin} variant="h2">Edit Company <b>{item.name}</b></Typography>
              : <Typography className={classes.titleMargin} variant="h2">Add new Company</Typography>
          }
          <Card direction="row" classes={{root: classes.statusWrapper}}>
            <Switch name="status" checked={+form.status === 1} checkedValue={1} uncheckedValue={0}
                    label="Account status" labelPlacement="start" onChange={this.onChangeStatus}
            />
          </Card>
          <Card className={classes.cardPadding}>
            <Section label="Personal Info">
              <Input
                name="name"
                label="Company Name"
                value={form.name}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'name', form)}
                required
              />
              <AsyncCheckInput
                url="/admin/companies/check-code"
                uniqIdentifierValue={form.id}
                name="code"
                label="Abbreviation"
                value={form.code}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'code', form)}
                required
                onStateChange={this.onAvailabilityCheckChanged}
              />
              <Input
                name="description"
                label="Description"
                value={form.description}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'description', form)}
              />
              <FieldsGroup>
                <Input
                  name="country"
                  label="Country Name"
                  value={form.country}
                  onChange={this.onChange}
                  onBlur={this.validate}
                  error={getError(errors, 'country', form)}
                  required
                />
                <Input
                  name=""
                  label="NAICS Code"
                  value={form.aa}
                  onChange={this.onChange}
                  onBlur={this.validate}
                  error={getError(errors, 'aa', form)}
                />
              </FieldsGroup>
              <Input
                name="licenseNumber"
                label="Contractor License #"
                value={form.licenseNumber}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'licenseNumber', form)}
                required
              />
            </Section>

            <ExpansionPanel label="Address" classes={{expansionPanelDetailsRoot: classes.addressPanel}}>
              <Card direction="row">
                <Section noPadding>
                  <AddressForm
                    label="Physical Address"
                    fieldsGroupName="physicalAddress"
                    data={physicalAddress}
                    onChange={this.onChange}
                    validate={this.validate}
                    errors={errors}
                  />
                </Section>
                <Section noPadding classes={{root: classes.emailingAddress}}>
                  {!sameForEmailing &&
                  <AddressForm
                    label="Mailing Address"
                    fieldsGroupName="mailingAddress"
                    data={mailingAddress}
                    onChange={this.onChange}
                    validate={this.validate}
                    errors={errors}
                  />
                  }
                </Section>
              </Card>
              <Checkbox checked={sameForEmailing} classes={{root: classes.sameForEmailing}} label="Same for Mailing" onChange={this.toggleSameEmailingAddress} />
            </ExpansionPanel>
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
        {isDeleting &&
          <DeleteConfirmationModal onCancel={this.cancelDelete} onConfirm={this.confirmDelete} items={[item]}/>
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(CompanyForm));