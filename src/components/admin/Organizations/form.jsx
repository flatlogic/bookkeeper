import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import Joi from '@hapi/joi';
import qs from 'qs';

import Input from '../../common/Input';
import AsyncCheckInput, { STATES as InputStates } from '../../common/Input/asyncCheckInput';
import ExpansionPanel from '../../common/ExpansionPanel';
import Typography from '../../common/Typography';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Checkbox from '../../common/Checkbox';
import Section from '../../common/Form/Section';
import Form from '../../common/Form/Form';
import Table from '../../common/Table/Table';
import DeleteConfirmationModal from './deleteConfirmationModal';
import AddUser from '../../../containers/admin/Users/addUser';
import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';
import { set } from '../../../services/object';
import { getError, parseModelErrors, parseServerModelErrors } from '../../../services/form';
import { address as addressValidator } from '../../../validators';
import AddressForm from './addressForm';

const styles = theme => ({
  root: {},
  title: {
    display: 'block',
    marginBottom: 30,
  },
  addressPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
  contactsSection: {
    width: '100%',
  },
  emailingAddress: {
    paddingLeft: 40,
  },
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
  usersTableRoot: {
    width: 460,
  },
  cardPadding: {
    padding: 30
  }
});

const VALIDATION_SCHEMA = Joi.object({
  name: Joi.string()
    .min(2)
    .required(),
  description: Joi.string()
    .allow(null),
  physicalAddress: addressValidator.options({ stripUnknown: true, abortEarly: false }).allow(null),
  mailingAddress: addressValidator.options({ stripUnknown: true, abortEarly: false }).allow(null),
}).options({ stripUnknown: true, abortEarly: false });

const USERS_TABLE_CONFIG = {
  columns: [
    {id: 'firstName', label: 'First Name', type: 'text', sortable: false},
    {id: 'lastName', label: 'Last Name', type: 'text', sortable: false},
    {id: 'username', label: 'Username', type: 'text', sortable: false},
  ],
};

class OrgForm extends React.PureComponent {
  static propTypes = {
    item: T.object,
    onSave: T.func.isRequired,
    errors: T.array,
  };

  static defaultProps = {
    item: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      form: props.item,
      sameForEmailing: isEqual(
        {...props.item.physicalAddress, id: undefined},
        {...props.item.mailingAddress, id: undefined},
      ),
      errors: null,
      isValid: false,
      isNameAvailable: true,
      isDeleting: false,
      isAddingUser: false,
    };
    this.debouncedValidate = debounce(this.validate, 1000);
  }

  componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const qsParams = qs.parse(search.slice(1));
    if (qsParams && qsParams.action === 'addUser') {
      this.setState({
        isAddingUser: true,
      });
    }
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
        replaceRouteVars(ADMIN_ROUTES.organizationsList)
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
      state => set(clone(state), `form.${name}`, value, clone),
      this.debouncedValidate,
    );
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  toggleSameEmailingAddress = (e, value) => {
    this.setState({
      sameForEmailing: value,
    });
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
      this.props.history.push(replaceRouteVars(ADMIN_ROUTES.organizationsList));
    } catch (e) {}
  };

  cancelDelete = () => {
    this.setState({
      isDeleting: false,
    });
  };

  goToAddingUser = () => {
    this.setState({
      isAddingUser: true,
    });
  };

  onAddUser = (user, roles) => {
    this.setState(state => ({
      form: {
        ...state.form,
        users: [
          ...(state.form.users || []),
          { user, roles },
        ],
      },
      isAddingUser: false,
    }));
  };

  onAvailabilityCheckChanged = state => {
    this.setState({
      isNameAvailable: state === InputStates.valid,
    });
  };

  render() {
    const { classes, item } = this.props;
    const { form, sameForEmailing, errors, isValid, isNameAvailable, isDeleting, isAddingUser } = this.state;
    const { physicalAddress, mailingAddress } = form;

    if (isAddingUser) {
      return <AddUser onAdd={this.onAddUser} organization={item} />
    }

    return (
      <React.Fragment>
        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {
            form.id ? <Typography variant="h2" className={classes.title}>Edit Organization <b>{item.name}</b></Typography>
              : <Typography variant="h2" className={classes.title}>Add new Organization</Typography>
          }
          <Card className={classes.cardPadding}>
            <Section label="Organization Info">
              <AsyncCheckInput
                url="/admin/organizations/check-name"
                uniqIdentifierValue={form.id}
                id="name"
                name="name"
                label="Organization Name"
                value={form.name}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'name')}
                noPadding
                required
                onStateChange={this.onAvailabilityCheckChanged}
              />
              <Input
                id="description"
                name="description"
                label="Description"
                value={form.description}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'description')}
              />
            </Section>

            <ExpansionPanel label="ADDRESSES" classes={{expansionPanelDetailsRoot: classes.addressPanel}}>
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

            {!!form.id &&
              <ExpansionPanel label="Users Of Organization" classes={{expansionPanelDetailsRoot: classes.addressPanel}}>
                <Card direction="column">
                  <Button color="extra" onClick={this.goToAddingUser}>+ Add User</Button>
                  <br />

                  {form.users && !!form.users.length &&
                    <Table
                      allowSelectAll={false}
                      classes={{root: classes.usersTableRoot}}
                      columns={USERS_TABLE_CONFIG.columns}
                      data={form.users}
                      pagination={{
                        enabled: false,
                      }}
                    />
                  }
                </Card>
              </ExpansionPanel>
            }
          </Card>
          <Card classes={{root: classes.actions}} direction="row">
            {form.id ?
              <Button color="danger" size="large" onClick={this.onDelete}>Delete Organization</Button>
              : <span />
            }
            <Card direction="row" className="right-block">
              <Button color="secondary" size="large" onClick={this.onCancel}>Cancel</Button>
              <Button color="primary" size="large" type="submit" disabled={!isValid || !isNameAvailable}>Apply Changes</Button>
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

export default withRouter(withStyles(styles)(withRouter(OrgForm)));