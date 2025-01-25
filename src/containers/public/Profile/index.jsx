import React from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import ProfileComponent from '../../../components/public/Profile';
import { selectUser } from '../../../selectors/auth';
import { updateUser } from '../../../redux/user';

class Profile extends React.PureComponent {
  render() {
    const { user, updateUser } = this.props;

    return (
      <ProfileComponent data={user} onSave={updateUser} />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

const mapDispatchToProps = {
  updateUser,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Profile)
);
