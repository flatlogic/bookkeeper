import React from 'react';
import * as T from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {withStyles} from '@material-ui/core/styles';
import get from 'lodash/get';

import withUsers from '../../../HOC/withUsers';
import { create, setRoles, fetchItem } from '../../../redux/admin/users';
import {ADMIN_ROUTES} from '../../../config';
import {replaceRouteVars} from '../../../services/string';
import Typography from '../../../components/common/Typography';
import AutocompleteInput from '../../../components/common/AutocompleteInput';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import UserRoles from '../../../components/admin/Users/userRoles';
import UserForm from '../../../components/admin/Users/form';
import Section from '../../../components/common/Form/Section';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 440,
  },
  description: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  submitButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 40,
  },
  noUserOption: {
    display: 'flex',
    '& > div': {
      cursor: 'pointer',
      textAlign: 'center',
      width: '100%',
      padding: '6px 0',
    },
  },
});

const getOrganizationUsers = orgId => createSelector(
  users => users,
  users => users.filter(user => [null, orgId].includes(get(user.organizations, '0.id', null))),
);

class AddUser extends React.PureComponent {
  static propTypes = {
    organization: T.object,
  };

  state = {
    roles: [],
    user: null,
  };

  setUser = async user => {
    if (user && user.id) {
      const data = await this.props.fetchItem(user.id, true);
      this.setState({
        user: data,
      });
    } else {
      this.setState({
        user: {},
      });
    }
  };

  onRolesChange = roles => {
    this.setState({
      roles,
    });
  };

  createNewUser = e => {
    e.preventDefault();

    this.setState({
      user: {},
    });
  };

  updateUserRoles = async () => {
    const { organization } = this.props;

    await this.props.setRoles(
      this.state.user.id,
      this.state.roles.map(item => ({role: item.role.id, company: get(item, 'company.id', null)})),
    );
    this.props.history.push(
      false ?
        replaceRouteVars(ADMIN_ROUTES.organizationsEdit, {id: organization.id}) :
        ADMIN_ROUTES.organizationsList,
    );
  };

  render() {
    const { _users, classes, organization } = this.props;
    const { user } = this.state;

    return (
      <Card classes={{root: classes.root}}>
        <Typography variant="h2">Add User</Typography>
        <Typography variant="h5" className={classes.description}>Select user or create new one to assign roles</Typography>
        <AutocompleteInput
          allowCreateNewOptions
          placeholder="Start typing user name..."
          items={getOrganizationUsers(organization.id)(_users)}
          onChange={this.setUser}
          displayProp={item => `${item.firstName} ${item.lastName}`}
        />

        {user && !user.id &&
          <Section>
            <UserForm item={user} onSave={this.props.create} organization={organization} withoutTitle />
          </Section>
        }
        {user && user.id &&
          <Section>
            <UserRoles key={user.id} user={user} onChange={this.onRolesChange} organization={organization} />
            <Card classes={{root: classes.submitButton}}>
              <Button onClick={this.updateUserRoles}>Apply Roles</Button>
            </Card>
          </Section>
        }
      </Card>
    );
  }
}

const mapDispatchToProps = {
  create,
  setRoles,
  fetchItem,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(withUsers(withStyles(styles)(AddUser)))
);
