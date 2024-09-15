import { jwtDecode } from 'jwt-decode';

interface DecodedIdToken {
  exp: number;
}

export const isTokenAlmostExpired = (idToken: string, bufferSeconds = 120): boolean => {
  try {
    const decodedIdToken = jwtDecode<DecodedIdToken>(idToken);

    const expirationTimeMs = decodedIdToken.exp * 1000;
    const currentTimeMs = Date.now();
    const bufferTime = expirationTimeMs - bufferSeconds * 1000;

    return currentTimeMs >= bufferTime;
  } catch {
    throw new Error('Invalid token.');
  }
};
