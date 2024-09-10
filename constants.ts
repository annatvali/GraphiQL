export const PATH = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESTFUL_CLIENT: '/restful-client',
  GRAPHQL_CLIENT: '/graphql-client',
  HISTORY: '/history',
};

export const ROUTES = {
  PROTECTED: [PATH.RESTFUL_CLIENT, PATH.GRAPHQL_CLIENT, PATH.HISTORY],
  UNAUTHENTICATED: [PATH.LOGIN, PATH.REGISTER],
};

export const API_ROUTE = {
  SIGN_IN: '/api/auth/sign-in',
  SIGN_OUT: '/api/auth/sign-out',
};

export const SESSION_COOKIE_NAME = 'user_session';

export const APP_ERROR_CODE = {
  UNKNOWN_ERROR: 'app/unknown-error',
  USER_NOT_FOUND: 'app/user-not-found',
  SESSION_NOT_FOUND: 'app/session-not-found',
};
