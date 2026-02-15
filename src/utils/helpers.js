export function formatDate(date, includeTime = true) {
  if (!date) return new Date().toLocaleDateString('pt-BR');
  
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Date(date).toLocaleDateString('pt-BR', options);
}

export function validateUsername(username) {
  if (!username || username.length < 3) {
    return { 
      isValid: false, 
      error: 'Username must be at least 3 characters' 
    };
  }

  const githubUsernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  
  if (!githubUsernamePattern.test(username)) {
    return { 
      isValid: false, 
      error: 'Invalid GitHub username' 
    };
  }

  return { isValid: true, error: null };
}

export function sanitizeText(text) {
  if (!text) return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function isSticker(text) {
  return text && text.startsWith(':sticker:');
}

export function getStickerUrl(text) {
  return text.replace(':sticker:', '').trim();
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}