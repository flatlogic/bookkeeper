import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

import Typography from '../../../components/common/Typography';
import Card from '../../../components/common/Card';
import { capitalize } from '../../../services/string';
import adminAvatar from '../../../images/cp_admin.png';

const styles = () => ({
  root: {
    width: 'auto',
  },
  userLogo: {
    height: 38,
    width: 38,
    backgroundColor: 'rgba(161, 174, 189, 0.5)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 700,
    marginRight: 10,
  },
  nameWrapper: {
    display: 'flex',
    minWidth: 90,
    flexDirection: 'column',
    justifyContent: 'center',
    '@media (max-width: 992px)': {
      minWidth: 45,
      '& > div': {
        fontSize: 13
      },
      '& > div:last-child': {
        fontSize: 13
      }
    },
    '@media (max-width: 768px)': {
      '& > div': {
        fontSize: 10
      },
      '& > div:last-child': {
        fontSize: 9
      }
    }
  },
  name: {
    fontWeight: 500,
  },
  role: {
    fontSize: '0.875rem',
      color: 'rgba(74, 73, 74, 0.8)',
  },
});

class UserLogo extends React.PureComponent {
  static propTypes = {
    user: T.object.isRequired,
  };

  render() {
    const { classes, user, color, backgroundColor } = this.props;

    return (
      <Card direction="row" classes={{root: classes.root}}>
        {user && user.username === 'superUser' ? (
          <div className={classes.userLogo}>
            <img src={adminAvatar} alt="avatar" />
          </div>
        ) : (
        <Typography className={classes.userLogo} Component="div" style={{ color, backgroundColor }}>
          {get(user, 'firstName[0]', '')}
          {get(user, 'lastName[0]', '')}
        </Typography>
        )}
        <div className={classes.nameWrapper}>
          <Typography Component="div" className={classes.name} style={{ color }}>
            {get(user, 'firstName', '')} {get(user, 'lastName', '')}
          </Typography>
          {!!get(user, 'roles[0]') &&
            <Typography Component="div" className={classes.role} style={{ color }}>
              {capitalize(get(user, 'roles[0]', '').replace('_', ' '))}
            </Typography>
          }
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(UserLogo);
