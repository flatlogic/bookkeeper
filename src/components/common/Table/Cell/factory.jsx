import React from 'react';

import Text from './Text';
import Number from './Number';
import Datetime from './Datetime';
import Switch from './Switch';
import Array from './Array';
import Link from './Link';
import TableCell from './Base';

export default (type, value, config, itemData) => {
  let Component = null;
  switch (type) {
    case 'text':
      if (config.value) {
        Component = <Text dangerouslySetInnerHTML={{__html: value}} />;
      } else {
        Component = <Text>{value}</Text>;
      }
      break;
    case 'number':
      Component = <Number format={config.properties.format}>{value}</Number>;
      break;
    case 'datetime':
      Component = <Datetime value={value} />;
      break;
    case 'switch':
      Component = <Switch value={value} data={itemData} callbacks={config.callbacks} />;
      break;
    case 'array':
      Component = <Array value={value} />;
      break;
    case 'link':
      Component = <Link value={value} data={itemData} callbacks={config.callbacks} />;
      break;
    default:
      Component = <Text>{value}</Text>;
      break;
  }

  return <TableCell key={config.id}>{Component}</TableCell>;
}
