import Api from '../services/api';

export const fetchItem = async (name) => {
  return await Api.get(`/admin/dictionaries/${name}`);
};
