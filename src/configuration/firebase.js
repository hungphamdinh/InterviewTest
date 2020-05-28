import Firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDrI9jb3ilA1loJqEEC5V-lcvd--lCUPRg',
  authDomain: 'todoreact-9cfe7.firebaseapp.com',
  databaseURL: 'https://todoreact-9cfe7.firebaseio.com',
  projectId: 'todoreact-9cfe7',
  storageBucket: 'todoreact-9cfe7.appspot.com',
  messagingSenderId: '517382888604',
  appId: '1:517382888604:web:82908994b8206e708ae159',
  measurementId: 'G-8S67J6YM16',
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
