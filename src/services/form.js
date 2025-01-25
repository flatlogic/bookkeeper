import get from "lodash/get";

export const parseServerModelErrors = (errors, path = '', initialMap = {}) => {
  return errors.reduce((map, error) => {
    if (!error.children || !error.children.length) {
      map[`${path ? `${path}.` : ''}${error.property}`] = Object.values(error.constraints)[0];
    } else {
      map = parseServerModelErrors(error.children, error.property, map);
    }
    return map;
  }, initialMap);
};

export const parseModelErrors = errors => {
  if (!errors) {
    return null;
  }

  return errors.details.reduce((map, error) => {
    const path = error.path.join('.');
    map[path] = error.message;
    return map;
  }, {});
};

export const getError = (errors, fieldName, data) => {
  if (!errors) {
    return null;
  }
  if (data && get(data, fieldName, null) === null) {
    return null;
  }

  return get(errors, fieldName);
};
