import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../redux/auth';

const Logout = ({ logout }) => {
  logout();
  return <Redirect to="/login" />;
};

export default connect(
  null,
  { logout },
)(Logout);
