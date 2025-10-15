

const setItem = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

const getItem = (key) => {
  const item = window.sessionStorage.getItem(key);
  console.log('item', item);
  return item ? item : undefined;
 };

export { setItem, getItem };