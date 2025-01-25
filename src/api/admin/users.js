import Api from '../../services/api';

export const fetchList = async (filter) => {
  return await Api.get('/admin/users', filter);
};

export const fetchItem = async (id) => {
  return await Api.get(`/admin/users/${id}`);
};

export const create = async (data, organization) => {
  const qsParams = organization ? `?organization=${organization}` : '';
  return await Api.post(`/admin/users${qsParams}`, data);
};

export const update = async (id, data) => {
  return await Api.put(`/admin/users/${id}`, data);
};

export const setRoles = async (userId, roles) => {
  return await Api.put(`/admin/users/${userId}/set-roles`, {roles});
};

export const sendInvitation = async userId => {
  return await Api.post(`/admin/users/${userId}/send-invitation`);
};

export const deleteSuperUser = async (id) => {
  return await Api.delete(`/admin/users/${id}`);
};

export const changeStatus = async (id, value) => {
  return await Api.put(`/admin/users/${id}/update-status`, {status: value});
};
