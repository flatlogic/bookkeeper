import Api from '../../services/api';

export const fetchList = async (filter) => {
  return await Api.get('/admin/roles', filter);
};

export const fetchItem = async (id) => {
  return await Api.get(`/admin/roles/${id}`);
};

export const create = async (data) => {
  return await Api.post('/admin/roles', data);
};

export const update = async (id, data) => {
  return await Api.put(`/admin/roles/${id}`, data);
};

export const deleteRole = async (id) => {
  return await Api.delete(`/admin/roles/${id}`);
};
