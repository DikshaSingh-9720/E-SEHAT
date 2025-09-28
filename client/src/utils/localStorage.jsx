const localStorageUtil = {
  set: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error(`Error reading ${key} from localStorage:`, err);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from localStorage:`, err);
    }
  },

  clearAll: () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  }
};

export default localStorageUtil;