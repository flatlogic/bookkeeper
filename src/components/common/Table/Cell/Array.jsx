import React from 'react';

import Typography from '../../Typography';
import { capitalize } from '../../../../services/string';

export default ({value}) => (
  <Typography>{(value || []).map(item => capitalize(item)).join(', ')}</Typography>
);
