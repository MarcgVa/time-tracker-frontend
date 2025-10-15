/*
  The localstorage utility allows us to use localstorage while handling the error it could throw.
*/

const setItem = (key,value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

const getItem = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (e) {
    console.error(e);
  }
}

export { setItem, getItem };