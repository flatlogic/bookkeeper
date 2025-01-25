import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '../../common/Card';
import Typography from '../../common/Typography';
import MenuList from '../../common/MenuList';
import { PUBLIC_ROUTES } from '../../../config';

const MENU_ITEMS = [
  { label: 'Accounts', description: 'See a list of accounts. Create new one', url: PUBLIC_ROUTES.generalLedgerAccountsList },
  { label: 'Subaccounts', description: 'See a list of subaccounts. Create new one', url: PUBLIC_ROUTES.generalLedgerSubaccountsList },
  { label: 'General Journal Entries', description: 'Brief Description', url: PUBLIC_ROUTES.generalLedger },
  { label: 'Cash Reconciliation', description: 'Brief Description', url: PUBLIC_ROUTES.generalLedger },
  { label: 'Review Account Balances', description: 'Brief Description', url: PUBLIC_ROUTES.generalLedger },
  { label: 'General Ledger Report', description: 'Brief Description', url: PUBLIC_ROUTES.generalLedger },
  { label: 'Special G/L Tasks', description: 'Brief Description', url: PUBLIC_ROUTES.generalLedgerInitialize },
];

const styles = () => ({
  itemsWrapper: {
    marginTop: 26,
    padding: 25,
  },
});

class GeneralLedger extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card direction="row" justifyContent="spaceBetween" withoutBg>
          <Typography variant="h2" Component="div">
              General Ledger
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

export default withStyles(styles)(GeneralLedger);
