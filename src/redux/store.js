import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import app from './app';
import auth from './auth';
import user from './user';

import dictionaries from './dictionaries';
import organizations from './admin/organizations';
import superUsers from './admin/superUsers';
import users from './admin/users';
import companies from './admin/companies';
import roles from './admin/roles';

import accounts from './public/accounts';
import subAccounts from './public/subAccounts';
import customers from './public/customers';

function cleanState(state) {
  return {
    ...state,
  };
}

const createReducer = (asyncReducers = {}) => {
  return combineReducers({
    app,
    auth,
    user,
    dictionaries,
    organizations,
    superUsers,
    users,
    companies,
    roles,
    accounts,
    subAccounts,
    customers,
    ...asyncReducers,
  });
};

export function injectAsyncReducer(store, name, asyncReducer) {
  if (store.asyncReducers[name]) {
    return;
  }
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

export function configureStore(initialState) {
  const enhancers = [applyMiddleware(thunk)];

  if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const savedStore = localStorage.getItem('store') && JSON.parse(localStorage.getItem('store') || '');

  if (savedStore) {
    initialState = savedStore;
  }

  const store = createStore(createReducer(), initialState, compose(...enhancers));
  store.asyncReducers = {};

  return store;
}

export const store = configureStore();

store.subscribe(() => {
  const state = cleanState(store.getState());
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
