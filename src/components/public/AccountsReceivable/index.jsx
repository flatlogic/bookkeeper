import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '../../common/Card';
import Typography from '../../common/Typography';
import MenuList from '../../common/MenuList';
import { PUBLIC_ROUTES } from '../../../config';

const MENU_ITEMS = [
  { label: 'Customers', description: 'See a list of customers. Create new one', url: PUBLIC_ROUTES.accountsReceivableCustomersList },
];

const styles = () => ({
  itemsWrapper: {
    marginTop: 26,
    padding: 25,
  },
});

class AccountsReceivable extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card direction="row" justifyContent="spaceBetween" withoutBg>
          <Typography variant="h2" Component="div">
              Accounts Receivable
          </Typography>
        </Card>
        <Card classes={{root: classes.itemsWrapper}}>
          <MenuList
            items={MENU_ITEMS}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AccountsReceivable);
