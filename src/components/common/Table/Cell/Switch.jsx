import React from 'react';

import Switch from '../../Switch';

export default ({value, data, callbacks, ...props}) => {
  return <Switch
    checked={!!value}
    onChange={() => callbacks.onChange && callbacks.onChange(data) }
    onClick={e => e.stopPropagation()}
    {...props}
  />
};
