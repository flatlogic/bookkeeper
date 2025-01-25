import Api from '../../services/api';

export const fetchList = async (filter) => {
  return await Api.get('/admin/companies', filter);
};

export const fetchItem = async (id) => {
  return await Api.get(`/admin/companies/${id}`);
};

export const create = async (data) => {
  return await Api.post('/admin/companies', data);
};

export const update = async (id, data) => {
  return await Api.put(`/admin/companies/${id}`, data);
};

export const deleteCompany = async (id) => {
  return await Api.delete(`/admin/companies/${id}`);
};

export const changeStatus = async (id, value) => {
  return await Api.put(`/admin/companies/${id}/update-status`, {status: value});
};
