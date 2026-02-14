import { useState, useEffect } from 'react';
import { subscribeToMessages, sendMessage as firebaseSendMessage, deleteMessage as firebaseDeleteMessage } from '../services/firebase';

export function useGithubUser(username, delay = 500) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username.length < 3) {
      setData(null);
      setError('');
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
          if (!res.ok) throw new Error('User not found');
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError('');
        })
        .catch((err) => {
          setError(err.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, delay);

    return () => clearTimeout(timer);
  }, [username, delay]);

  return { data, loading, error };
}

export function useRealtimeMessages(currentUser) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((data) => {
      setMessages(data);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const sendMessage = async (text) => {
    if (!text || !text.trim()) return;

    try {
      await firebaseSendMessage(currentUser, text.trim());
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  };

  const deleteMessage = async (messageId, messageFrom) => {
    if (currentUser !== messageFrom) {
      throw new Error('You can only delete your own messages');
    }

    try {
      await firebaseDeleteMessage(messageId);
    } catch (err) {
      console.error('Error deleting message:', err);
      throw err;
    }
  };

  return { messages, loading, error, sendMessage, deleteMessage };
}
