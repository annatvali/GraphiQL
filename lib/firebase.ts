import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBEKJ9UDUOC6Hx9ZnxD8aX4e12Y9JKbPOQ',
  authDomain: 'graphiql-app-eecfd.firebaseapp.com',
  projectId: 'graphiql-app-eecfd',
  storageBucket: 'graphiql-app-eecfd.appspot.com',
  messagingSenderId: '36749421826',
  appId: '1:36749421826:web:c6a9bb3446a79e89fee61b',
  measurementId: 'G-TPJEPPTXM5',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);