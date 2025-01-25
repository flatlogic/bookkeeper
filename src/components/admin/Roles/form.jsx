import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Joi from '@hapi/joi';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';
import { getError, parseServerModelErrors, parseModelErrors } from '../../../services/form';
import Input from '../../common/Input';
import Typography from '../../common/Typography';
import Checkbox from '../../common/Checkbox';
import Table from '../../common/Table/Table';
import BaseRow from '../../common/Table/Row/BaseRow';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Section from '../../common/Form/Section';
import Form from '../../common/Form/Form';
import DeleteConfirmationModal from './deleteConfirmationModal';
import { ROLES_PERMISSIONS, ROLES_PERMISSION_VALUES } from '../../../config';
import {set} from "../../../services/object";
import clone from "lodash/clone";

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
  tableRoot: {
    marginTop: 30,
    width: 500,

    '& tr td:first-child': {
      width: 200,
    },
  }
});

const VALIDATION_SCHEMA = Joi.object({
  name: Joi.string()
    .min(2)
    .required(),
}).options({ stripUnknown: true, abortEarly: true });

const TABLE_CONFIG = {
  columns: [
    {id: 'name', label: 'Name', type: 'text'},
    {id: 'create', label: 'Create', type: 'checkbox'},
    {id: 'read', label: 'Read', type: 'checkbox'},
    {id: 'update', label: 'Update', type: 'checkbox'},
    {id: 'delete', label: 'Delete', type: 'checkbox'},
  ],
};

class RoleForm extends React.Component {
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
      form: props.item,
      errors: null,
      isValid: false,
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
      this.props.history.push(
        replaceRouteVars(ADMIN_ROUTES.rolesList)
      );
    } catch (errors) {
      this.setState({
        errors: parseServerModelErrors(errors),
      });
    }
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
      this.props.history.push(replaceRouteVars(ADMIN_ROUTES.rolesList));
    } catch (e) {}
  };

  cancelDelete = () => {
    this.setState({
      isDeleting: false,
    });
  };

  onPermissionChange = (pKey, pValue, value) => {
    this.setState(state => ({
      form: {
        ...state.form,
        [pKey]: value ?
          [...get(state.form, pKey, []), pValue] :
          get(state.form, pKey, []).filter(item => item !== pValue),
      },
    }), this.validate);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(
      state => set(clone(state), `form.${name}`, value, clone),
      this.debouncedValidate,
    );
  };

  render() {
    const { classes, item } = this.props;
    const { form, errors, isValid, isDeleting } = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {
            item.id ? <Typography variant="h2">Edit Role <b>{item.name}</b></Typography>
              : <Typography variant="h2">Add new Role</Typography>
          }
          <Card>
            <Section>
              <Input
                name="name"
                label="Role Name"
                value={form.name}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'name', form)}
                required
              />
              <Input
                name="description"
                label="Role Description"
                value={form.name}
                onChange={this.onChange}
                onBlur={this.validate}
                error={getError(errors, 'description', form)}
              />
            </Section>
          </Card>
          <Card>
            <Table data={[null]}
                   columns={TABLE_CONFIG.columns}
                   pagination={{
                     enabled: false,
                   }}
                   allowSelectAll={false}
                   classes={{root: classes.tableRoot}}
            >
            {Object.keys(ROLES_PERMISSIONS).map(permissionKey => (
              <BaseRow>
                <Typography>{ROLES_PERMISSIONS[permissionKey]}</Typography>
                <Checkbox name="create"
                          checked={get(form, permissionKey, []).includes(ROLES_PERMISSION_VALUES.create)}
                          onChange={(e, value) => this.onPermissionChange(permissionKey, ROLES_PERMISSION_VALUES.create, value)} />
                <Checkbox name="read"
                          checked={get(form, permissionKey, []).includes(ROLES_PERMISSION_VALUES.read)}
                          onChange={(e, value) => this.onPermissionChange(permissionKey, ROLES_PERMISSION_VALUES.read, value)} />
                <Checkbox name="update"
                          checked={get(form, permissionKey, []).includes(ROLES_PERMISSION_VALUES.update)}
                          onChange={(e, value) => this.onPermissionChange(permissionKey, ROLES_PERMISSION_VALUES.update, value)} />
                <Checkbox name="delete"
                          checked={get(form, permissionKey, []).includes(ROLES_PERMISSION_VALUES.delete)}
                          onChange={(e, value) => this.onPermissionChange(permissionKey, ROLES_PERMISSION_VALUES.delete, value)} />
              </BaseRow>
            ))}
            </Table>
          </Card>

          <Card classes={{root: classes.actions}} direction="row">
            {!!form.id ?
              <Button color="danger" size="large" onClick={this.onDelete}>Delete</Button>
            : <span />}
            <Card direction="row" className="right-block">
              <Button color="secondary" size="large" onClick={this.onCancel}>Cancel</Button>
              <Button color="primary" size="large" type="submit" disabled={!isValid}>Apply Changes</Button>
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

export default withStyles(styles)(withRouter(RoleForm));