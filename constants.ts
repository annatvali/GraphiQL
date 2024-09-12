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
  AUTH_STATUS: '/api/auth/status',
  SIGN_IN: '/api/auth/sign-in',
  SIGN_OUT: '/api/auth/sign-out',
};

export const SESSION_COOKIE = {
  NAME: 'user_session',
  MAX_AGE_SECONDS: 60 * 60,
} as const;

export const APP_ERROR_CODE = {
  UNKNOWN_ERROR: 'app/unknown-error',
  USER_NOT_FOUND: 'app/user-not-found',
  SESSION_NOT_FOUND: 'app/session-not-found',
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503,
} as const;
