import Api from '../../services/api';

export const fetchList = async (filter, fiscalYear) => {
  return await Api.get(`/subaccounts?fiscalYear=${fiscalYear}`, filter);
};

export const fetchItem = async (id) => {
  return await Api.get(`/subaccounts/${id}`);
};

export const create = async (data, fiscalYear) => {
  return await Api.post(`/subaccounts?fiscalYear=${fiscalYear}`, data);
};

export const update = async (id, data) => {
  return await Api.put(`/subaccounts/${id}`, data);
};

export const deleteAccount = async (id) => {
  return await Api.delete(`/subaccounts/${id}`);
};
