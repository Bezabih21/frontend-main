import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import comments from './comments';
import users from './users';
import category from './category';

export const reducers = combineReducers({ posts, auth, comments, users, category });
