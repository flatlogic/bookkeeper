import React from 'react';

import Typography from '../../Typography';

export default ({children, ...props}) => (
  <Typography {...props}>{children}</Typography>
);
