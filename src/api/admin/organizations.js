import Api from '../../services/api';

export const fetchOrgsList = async (filter) => {
  return await Api.get('/admin/organizations', filter);
};

export const fetchOrgItem = async (id) => {
  return await Api.get(`/admin/organizations/${id}`);
};

export const create = async (data) => {
  return await Api.post('/admin/organizations', data);
};

export const update = async (id, data) => {
  return await Api.put(`/admin/organizations/${id}`, data);
};

export const deleteOrganization = async (id) => {
  return await Api.delete(`/admin/organizations/${id}`);
};
