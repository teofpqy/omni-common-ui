import userManager from './userManager';
import _SingleSignOnHandler from './SingleSignOnHandler';
import _reducer from './reducer';
import _routes from './routes';
import * as _actions from './actions';
import createOidcMiddleware from 'redux-oidc';
import _SingleSignOnProvider from './SingleSignOnProvider';

export const SingleSignOnHandler = _SingleSignOnHandler;
export const reducer = _reducer;
export const actions = _actions;
export const routes = _routes;
export const singleSignOnMiddleware = createOidcMiddleware(userManager, null, false);
export const SingleSignOnProvider = _SingleSignOnProvider;
