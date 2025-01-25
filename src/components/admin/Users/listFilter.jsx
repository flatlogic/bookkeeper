import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ProtectedArea from '../../../containers/ProtectedArea';
import AutocompleteInput from '../../common/AutocompleteInput';
import Input from '../../common/Input';
import Card from '../../common/Card';
import withOrganizations from '../../../HOC/withOrganizations';
import withRoles from '../../../HOC/withRoles';

const styles = () => ({
  root: {
    width: 'auto',
    flexDirection: 'row',

    '& > div:not(:first-child)': {
      marginLeft: 15,
    },
  },
  search: {
    width: 200,
  },
  organizations: {
    width: 200,
  },
  roles: {
    width: 150,
  },
});

const ADMIN_ROLE = {
  id: 'ADMINISTRATOR',
  name: 'Administrator',
};

class ListFilter extends React.PureComponent {
  static propTypes = {
    _organizations: T.array,
    _roles: T.array,
    onChange: T.func.isRequired,
  };

  render() {
    const { _organizations, _roles, onChange, classes } = this.props;

    return (
      <Card classes={{root: classes.root}}>
        <Input classes={{root: classes.search, inputRoot: classes.search}}
               placeholder="Search"
               onChange={(e, value) => onChange('query', value)}
               withDebounce noPadding
        />

        <ProtectedArea roles={['SUPER_USER']}>
          <AutocompleteInput
            noPadding
            classes={{root: classes.organizations}}
            className={classes.organizations}
            placeholder="Organization"
            items={_organizations}
            onChange={item => onChange('organization', item && item.id ? item.id : null )}
            displayProp="name"
            isClearable
          />
        </ProtectedArea>

        <AutocompleteInput
          classes={{root: classes.roles}}
          className={classes.roles}
          placeholder="Roles"
          items={[ADMIN_ROLE, ..._roles]}
          onChange={item => onChange('role', item && item.id ? item.id : null )}
          displayProp="name"
          isClearable
          noPadding
        />
      </Card>
    );
  }
}

export default withRoles(withOrganizations(withStyles(styles)(ListFilter)));
