import React from 'react';
import * as T from 'prop-types';
import { createSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

import withRoles from '../../../HOC/withRoles';
import withCompanies from '../../../HOC/withCompanies';
import AutocompleteInput from '../../common/AutocompleteInput';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Typography from "../../common/Typography";

const getCompaniesAccordingPrevSelection = (roleId, rolesCompaniesMap, orgId, selectedCompanyId) => createSelector(
  companies => getOrganizationCompanies(orgId)(companies),
  companies => companies.filter(company => !roleId || company.id === selectedCompanyId || !rolesCompaniesMap[roleId] || !rolesCompaniesMap[roleId].includes(company.id)),
);

const getOrganizationRoles = orgId => createSelector(
  roles => roles,
  roles => roles.filter(role => orgId ? role.organizationId === orgId : true),
);

const getOrganizationCompanies = orgId => createSelector(
  companies => companies,
  companies => companies.filter(company => orgId ? company.organizationId === orgId : true),
);

const ADMIN_ROLE = {name: 'ADMINISTRATOR', id: 'ADMINISTRATOR'};

const styles = () => ({
  root: {},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  rolesWrapper: {
    paddingTop: 10,
    '& > div': {
      width: '50%',
    },
    '& > div:first-child': {
      marginRight: 20,
    },
  },
  addRoleButton: {
    marginTop: 20,
  },
  deleteRoleButton: {
    position: 'absolute',
    right: -35,
    bottom: 0,
    fontSize: 17,
    cursor: 'pointer',
    padding: 10,
  },
});

class AddUser extends React.PureComponent {
  static propTypes = {
    user: T.object,
    onChange: T.func.isRequired,
    organization: T.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      roles: [
        ...(get(props, 'user.roles') || [])
          .reduce((map, item) => {
            if (item === ADMIN_ROLE.id) {
              map.push({role: ADMIN_ROLE});
            }
            return map;
          }, []),
        ...get(props, 'user.companyRoles', [])
          .map(roleItem => ({role: {id: roleItem.roleId}, company: {id: roleItem.companyId}})),
      ],
      roleCompanies: {},
    };
    this.props.onChange(this.state.roles);
  }

  addRole = () => {
    this.setState(state => ({
      roles: [...state.roles, {}],
    }));
  };

  onChangeRole = (index, name, value) => {
    this.setState(state => ({
        roles: state.roles.map((item, i) => {
          if (index === i) {
            return {
              ...item,
              [name]: value,
            };
          }
          return item;
        }),
      }),
      this.triggerRolesUpdate,
    );
  };

  onDeleteRole = index => {
    this.setState(state => ({
        roles: state.roles.filter((item, i) => index !== i),
      }),
      this.triggerRolesUpdate,
    );
  };

  triggerRolesUpdate = () => {
    this.setState({
      roleCompanies: this.calculateRoleCompanies(this.state.roles),
    });
    this.props.onChange(
      this.state.roles
        .filter(item => (item.company && item.role) || (item.role && item.role.id === ADMIN_ROLE.id))
    );
  };

  calculateRoleCompanies = (assignedRoles) => {
    return assignedRoles
      .filter(item => item.company && item.role)
      .reduce((map, item) => {
        map[item.role.id] = map[item.role.id] || [];
        map[item.role.id].push(item.company.id);
        return map;
      },
      {},
    );
  };

  render() {
    const { _roles, _companies, classes, organization } = this.props;
    const { roles, roleCompanies } = this.state;

    return (
      <Card classes={{root: classes.root}}>
        {roles.map((role, i) => (
          <Card key={i} classes={{root: classes.item}}>
            <Card classes={{root: classes.rolesWrapper}} direction="row">
              <AutocompleteInput
                label="Role"
                value={get(role, 'role.id')}
                items={[ADMIN_ROLE, ...getOrganizationRoles(get(organization, 'id'))(_roles)]}
                onChange={item => this.onChangeRole(i, 'role', item)} displayProp="name"
                noPadding
              />
              {roles[i].role && roles[i].role.id !== ADMIN_ROLE.id &&
              <AutocompleteInput
                label="Company"
                isDisabled={!roles[i].role}
                value={get(role, 'company.id')}
                items={getCompaniesAccordingPrevSelection(get(roles, `${i}.role.id`), roleCompanies, get(organization, 'id'), get(role, 'company.id'))(_companies)}
                onChange={item => this.onChangeRole(i, 'company', item)}
                displayProp="name"
                noPadding
              />
              }
            </Card>
            <Typography Component="div" className={classes.deleteRoleButton}
                        onClick={() => this.onDeleteRole(i)}>X</Typography>
          </Card>
        ))}

        <Button color="extra" onClick={this.addRole} classes={{root: classes.addRoleButton}}>+ Add Role</Button>
      </Card>
    );
  }
}

export default withRoles(withCompanies(withStyles(styles)(AddUser)));