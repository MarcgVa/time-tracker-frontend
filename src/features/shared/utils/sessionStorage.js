

const setItem = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

const getItem = (key) => {
  const item = window.sessionStorage.getItem(key);
  return item ? item : undefined;
};

const removeItem = (key) => {
  return window.sessionStorage.removeItem(key);
}

export { setItem, getItem, removeItem };