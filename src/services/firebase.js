import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove, update, query, orderByChild, limitToLast } from 'firebase/database';
import { 
  getAuth, 
  signInWithPopup, 
  GithubAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app = null;
let database = null;
let messagesRef = null;
let auth = null;
let githubProvider = null;

const isConfigValid = firebaseConfig.apiKey && firebaseConfig.databaseURL && firebaseConfig.projectId;

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    messagesRef = ref(database, 'messages');
    auth = getAuth(app);
    githubProvider = new GithubAuthProvider();
    githubProvider.addScope('read:user');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

const userLastMessageTime = new Map();
const RATE_LIMIT_MS = 3000;
export const MAX_MESSAGE_LENGTH = 200;

export async function sendMessage(from, text) {
  if (!messagesRef) {
    throw new Error('Firebase not configured');
  }

  if (!text || text.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (text.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`);
  }

  const now = Date.now();
  const lastMessageTime = userLastMessageTime.get(from) || 0;
  const timeSinceLastMessage = now - lastMessageTime;

  if (timeSinceLastMessage < RATE_LIMIT_MS) {
    const waitTime = Math.ceil((RATE_LIMIT_MS - timeSinceLastMessage) / 1000);
    throw new Error(`Please wait ${waitTime} second(s) before sending another message.`);
  }

  try {
    await push(messagesRef, {
      from,
      text: text.trim(),
      createdAt: now,
    });
    
    userLastMessageTime.set(from, now);
    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export function subscribeToMessages(callback) {
  if (!messagesRef) {
    console.error('Firebase not configured');
    callback([]);
    return () => {};
  }

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
  if (!database) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const messageRef = ref(database, `messages/${messageId}`);
    await remove(messageRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

export async function updateMessage(messageId, newText, originalFrom) {
  if (!database) {
    throw new Error('Firebase not configured');
  }

  if (!newText || newText.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (newText.length > 1000) {
    throw new Error('Message too long. Maximum 1000 characters.');
  }

  try {
    const messageRef = ref(database, `messages/${messageId}`);
    await update(messageRef, {
      text: newText.trim(),
      editedAt: Date.now(),
      editedBy: originalFrom
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating message:', error);
    throw error;
  }
}

export async function signInWithGitHub() {
  if (!auth || !githubProvider) {
    throw new Error('Firebase Auth not configured');
  }
  
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    const githubUsername = user.reloadUserInfo?.screenName || 
                          user.providerData?.[0]?.uid ||
                          user.displayName;
    
    return {
      user,
      githubUsername,
      token,
      photoURL: user.photoURL,
      displayName: user.displayName,
      email: user.email,
      uid: user.uid
    };
  } catch (error) {
    console.error('Error signing in with GitHub:', error);
    throw error;
  }
}

export async function signOut() {
  if (!auth) {
    throw new Error('Firebase Auth not configured');
  }
  
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export function onAuthChange(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const githubUsername = user.reloadUserInfo?.screenName || 
                            user.providerData?.[0]?.uid ||
                            user.displayName;
      callback({
        user,
        githubUsername,
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
      });
    } else {
      callback(null);
    }
  });
}

export function getCurrentUser() {
  return auth?.currentUser || null;
}

export { database, messagesRef, auth };
