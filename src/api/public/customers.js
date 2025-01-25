import Api from '../../services/api';

export const fetchList = async (filter) => {
  return await Api.get('/customers', filter);
};

export const fetchItem = async (id) => {
  return await Api.get(`/customers/${id}`);
};

export const create = async (data) => {
  return await Api.post('/customers', data);
};

export const update = async (id, data) => {
  return await Api.put(`/customers/${id}`, data);
};

export const deleteCustomer = async (id) => {
  return await Api.delete(`/customers/${id}`);
};
