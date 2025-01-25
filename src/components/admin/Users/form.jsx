import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import { ADMIN_ROUTES } from '../../../config';
import { replaceRouteVars } from '../../../services/string';
import { parseServerModelErrors } from '../../../services/form';
import Typography from '../../common/Typography';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Form from '../../common/Form/Form';
import DeleteConfirmationModal from './deleteConfirmationModal';
import FormFields from './formFields';


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
  addButton: {
    display: 'inline-block',
    marginBottom: 30,
  }
});

class UserForm extends React.Component {
  static propTypes = {
    item: T.object,
    organization: T.object,
    onSave: T.func.isRequired,
    onDelete: T.func.isRequired,
    errors: T.array,
    withoutTitle: T.bool,
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
    };
  }

  onSave = async e => {
    e.preventDefault();

    const { form } = this.state;
    try {
      this.setState({errors: null});
      await this.props.onSave({
        ...form,
        roles: (form.roles || []).map(item => ({role: item.role.id, company: get(item, 'company.id')})),
      }, get(this.props, 'organization.id'));
      this.props.history.push(
        replaceRouteVars(ADMIN_ROUTES.usersList)
      );
    } catch (errors) {
      this.setState({
        errors: parseServerModelErrors(errors),
      });
    }
  };

  onChange = data => {
    this.setState({
      form: data,
    });
  };

  onValidChecked = isValid => {
    this.setState({
      isValid,
    });
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
      this.props.history.push(replaceRouteVars(ADMIN_ROUTES.usersList));
    } catch (e) {}
  };

  cancelDelete = () => {
    this.setState({
      isDeleting: false,
    });
  };

  render() {
    const { classes, item, withoutTitle, organization } = this.props;
    const { errors, isValid, isDeleting, form } = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.onSave} classes={{root: classes.root}}>
          {!withoutTitle && (
            form.id ? <Typography variant="h2" classes={{root: classes.addButton}}>Edit User <b>{item.firstName} {item.lastName}</b></Typography>
            : <Typography variant="h2" classes={{root: classes.addButton}}>Add new User</Typography>
          )}

          <FormFields item={form} organization={organization} onChange={this.onChange} onValidChecked={this.onValidChecked} errors={errors} />

          <Card classes={{root: classes.actions}} direction="row">
            {form.id ?
              <Button color="danger" size="large" onClick={this.onDelete}>Delete</Button>
              : <span />
            }
            <Card direction="row" className="right-block">
              <Button color="secondary" size="large" onClick={this.onCancel}>Cancel</Button>
              <Button color="primary" size="large" type="submit" disabled={!isValid}>Save</Button>
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

export default withStyles(styles)(withRouter(UserForm));