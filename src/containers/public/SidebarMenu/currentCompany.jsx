import React from 'react';
import * as T from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import CompanyLogo from './companyLogo';

const styles = () => ({
  itemsBlock: {
    paddingTop: 24,
  },
  item: {
    display: 'block',
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
});

class CurrentCompany extends React.PureComponent {
  static propTypes = {
    company: T.object,
  };

  render() {
    const { classes, company } = this.props;

    return (
      <Card>
        <CompanyLogo company={company} />

        <div className={classes.itemsBlock}>
          <Link to="/app/profile" className={classes.item}>
            <Typography>Company Profile</Typography>
          </Link>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(CurrentCompany);
