import React from 'react';
import formatNumber from 'number-format.js';

import Typography from '../../Typography';

export default ({children: value, format}) => (
  <Typography>{formatNumber(format, value) || ''}</Typography>
);
