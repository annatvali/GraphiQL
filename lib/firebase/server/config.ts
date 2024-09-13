import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
  }),
};

const firebaseAdminApp =
  getApps().find((app) => app.name === 'firebase-admin-app') ??
  initializeApp(firebaseAdminConfig, 'firebase-admin-app');

export const firebaseAdminAuth = getAuth(firebaseAdminApp);

export default firebaseAdminApp;
