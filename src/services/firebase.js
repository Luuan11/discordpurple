import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove, query, orderByChild, limitToLast } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

const messagesRef = ref(database, 'messages');

export async function sendMessage(from, text) {
  try {
    const newMessage = {
      from,
      text,
      createdAt: Date.now(),
    };
    
    await push(messagesRef, newMessage);
    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export function subscribeToMessages(callback) {
  const messagesQuery = query(
    messagesRef,
    orderByChild('createdAt'),
    limitToLast(50)
  );

  const unsubscribe = onValue(messagesQuery, (snapshot) => {
    const messages = [];
    
    snapshot.forEach((childSnapshot) => {
      const message = {
        id: childSnapshot.key,
        ...childSnapshot.val()
      };
      messages.push(message);
    });
    
    callback(messages.reverse());
  }, (error) => {
    console.error('Error listening to messages:', error);
  });

  return unsubscribe;
}

export async function deleteMessage(messageId) {
  try {
    const messageRef = ref(database, `messages/${messageId}`);
    await remove(messageRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

export { database, messagesRef };
