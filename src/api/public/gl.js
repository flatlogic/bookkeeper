import Api from '../../services/api';

export const fetchGLConfig = async () => {
  return await Api.get(`/general-ledger`);
};

export const saveGLConfig = async data => {
  return await Api.post('/general-ledger', data);
};
