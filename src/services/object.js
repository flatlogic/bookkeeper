import setWith from 'lodash/setWith';
import clone from 'lodash/clone';

export function set(obj, path, value) {
  return setWith(clone(obj), path, value, (val, ...rest) => {
    if (val === null && path.split('.').length > 1) {
      return Object.apply([val, ...rest]);
    }
    return clone(val);
  });
}
