import Api from '../../services/api';

export const fetchList = async (filter, fiscalYear) => {
  return await Api.get(`/accounts?fiscalYear=${fiscalYear}`, filter);
};

export const fetchItem = async (id) => {
  return await Api.get(`/accounts/${id}`);
};

export const create = async (data, fiscalYear) => {
  return await Api.post(`/accounts?fiscalYear=${fiscalYear}`, data);
};

export const update = async (id, data) => {
  return await Api.put(`/accounts/${id}`, data);
};

export const deleteAccount = async (id) => {
  return await Api.delete(`/accounts/${id}`);
};

export const spreadBudget = async (data, account, type) => {
  return await Api.post(`/accounts/${account}/budget?type=${type}`, data);
};

export const getBudget = async (account, type) => {
  return await Api.get(`/accounts/${account}/budget?type=${type}`,);
};
