import get from 'lodash/get';

import { ACCOUNT_TYPES, ACCOUNT_RESTRICTIONS, ACCOUNT_STATUSES } from '../config';

export const getAccountTypeById = id => get(ACCOUNT_TYPES.find(item => item.id === id), 'name', '');
export const getAccountRestrictionById = id => get(ACCOUNT_RESTRICTIONS.find(item => item.id === id), 'name', '');
export const getAccountStatusById = id => get(ACCOUNT_STATUSES.find(item => item.id === id), 'name', '');
