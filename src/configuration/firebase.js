import Firebase from 'firebase';
const FIREBASE_API_KEY = 'AIzaSyDrI9jb3ilA1loJqEEC5V-lcvd--lCUPRg';
const MESSAGING_SENDER_ID = '517382888604';
const APP_ID = '1:517382888604:web:82908994b8206e708ae159';
const FIREBASE_PROJECT_ID = 'todoreact-9cfe7';
const FIREBASE_URL = 'https://todoreact-9cfe7.firebaseio.com';
const MESUAREMENT_ID = 'G-8S67J6YM16';
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'todoreact-9cfe7.firebaseapp.com',
  databaseURL: FIREBASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: 'todoreact-9cfe7.appspot.com',
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MESUAREMENT_ID,
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
