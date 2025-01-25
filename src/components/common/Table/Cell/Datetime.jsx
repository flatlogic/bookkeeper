import React from 'react';
import moment from 'moment';

import Typography from '../../Typography';

const FORMAT = 'MM/DD/YY @ hh:mma';

export default ({value, ...props}) => {
  const date = value ? `${moment.parseZone(value).format(FORMAT)} CEST` : '';
  return <Typography {...props}>{date}</Typography>
};
