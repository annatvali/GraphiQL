export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'] as const;

export const GRAPHQL_METHOD = ['GRAPHQL'] as const;

export const PATH = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESTFUL_CLIENT: `/${HTTP_METHODS[0]}`,
  GRAPHQL_CLIENT: `/${GRAPHQL_METHOD[0]}`,
  HISTORY: '/history',
};

const ALL_RESTFUL_CLIENT_PATHS = HTTP_METHODS.map((method) => `/${method}`);

export const ROUTES = {
  PROTECTED: [...ALL_RESTFUL_CLIENT_PATHS, PATH.GRAPHQL_CLIENT, PATH.HISTORY],
  UNAUTHENTICATED: [PATH.LOGIN, PATH.REGISTER],
};

export const PROTECTED_ROUTES_REGEXP = new RegExp(ROUTES.PROTECTED.join('|'), 'i');
export const UNAUTHENTICATED_ROUTES_REGEXP = new RegExp(ROUTES.UNAUTHENTICATED.join('|'), 'i');
export const RESTFUL_METHODS_REGEX = new RegExp(HTTP_METHODS.join('|'), 'i');

export const API_ROUTE = {
  AUTH_STATUS: '/api/auth/status',
  SIGN_IN: '/api/auth/sign-in',
  SIGN_OUT: '/api/auth/sign-out',
};

export const SESSION_COOKIE = {
  NAME: 'user_session',
  MAX_AGE_SECONDS: 24 * 60 * 60,
} as const;

export const APP_ERROR_CODE = {
  UNEXPECTED_APP_ERROR: 'app/unexpected-app-error',
  UNEXPECTED_FIREBASE_ERROR: 'app/unexpected-firebase-error',
  UNKNOWN_ERROR: 'app/unknown-error',
  USER_NOT_FOUND: 'app/user-not-found',
  SESSION_NOT_FOUND: 'app/session-not-found',
} as const;

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
