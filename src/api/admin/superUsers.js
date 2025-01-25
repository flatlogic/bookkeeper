import Api from '../../services/api';

export const fetchList = async (filter) => {
  return await Api.get('/admin/super-users', filter);
};

export const fetchItem = async (id) => {
  return await Api.get(`/admin/super-users/${id}`);
};

export const create = async (data) => {
  return await Api.post('/admin/super-users', data);
};

export const update = async (id, data) => {
  return await Api.put(`/admin/super-users/${id}`, data);
};

export const deleteSuperUser = async (id) => {
  return await Api.delete(`/admin/super-users/${id}`);
};

export const changeStatus = async (id, value) => {
  return await Api.put(`/admin/super-users/${id}/update-status`, {status: value});
};
