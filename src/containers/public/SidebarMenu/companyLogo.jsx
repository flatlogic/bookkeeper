import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';

const styles = () => ({
  root: {
    width: 'auto',
    alignItems: 'center',
  },
  companyLogo: {
    height: 38,
    width: 38,
    backgroundColor: 'rgba(75, 159, 254, 0.5)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 700,
    marginRight: 10,
  },
  name: {
    fontWeight: 500,
    '@media (max-width: 992px)': {
      fontSize: 11,
      fontWeight: 'normal'
    },
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  role: {
    fontSize: '0.875rem',
      color: 'rgba(74, 73, 74, 0.8)',
  },
});

class CompanyLogo extends React.PureComponent {
  render() {
    const { classes, company, color, backgroundColor } = this.props;

    if (!company) {
      return null;
    }

    return (
      <Card direction="row" classes={{root: classes.root}}>
        <Typography className={classes.companyLogo} Component="div" style={{ color, backgroundColor }}>
          {get(company, 'name.0', '')}
        </Typography>
        <Typography Component="div" className={classes.name} style={{ color }}>
          {company.name}
        </Typography>
      </Card>
    );
  }
}

export default withStyles(styles)(CompanyLogo);
