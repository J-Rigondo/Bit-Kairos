export default (function() {
  const st = localStorage || {};
  return {
    set: (key, object) => {
      st[key] = typeof object === 'string' ? object : JSON.stringify(object);
    },
    get: (key) => {
      if (!st[key]) {
        return null;
      }
      const value = st[key];

      try {
        const parsed = JSON.parse(value);
        return parsed;
      } catch (e) {
        return value;
      }
    },
    remove: (key) => {
      if (st) {
        return st.removeItem(key);
      }
      delete st[key];
    }
  };
})();
