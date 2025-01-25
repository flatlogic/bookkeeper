import Api from '../services/api';

export const selectCompany = async companyId => {
  return await Api.post('/users/select-company', { company: companyId });
};

export const updateUser = async data => {
  return await Api.put('/users', data);
};
