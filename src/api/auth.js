import Api from '../services/api';

export const login = async (username, password) => {
  return await Api.post('/login', { username, password });
};

export const register = async (username, email, password) => {
  return await Api.post('/register', { username, email, password });
};

export const setPassword = async (password, repeatPassword, token) => {
  return await Api.post('/password/set-password', { password, repeatPassword, token });
};

export const resetPassword = async username => {
  return await Api.post('/password/reset-password', { username });
};

export const logout = async () => {
  return await Api.post('/logout');
};
