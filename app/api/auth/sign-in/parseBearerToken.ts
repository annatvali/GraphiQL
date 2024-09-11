export const parseBearerToken = (authorizationHeader: string | null): string => {
  if (!authorizationHeader) {
    throw new Error('Authorization header is missing');
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new Error('Authorization header format is invalid or token is missing');
  }

  return token;
};
