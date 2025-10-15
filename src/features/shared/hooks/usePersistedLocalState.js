import { useEffect, useState } from "react";
import { setItem, getItem } from '../utils/localStorage';


export function usePersistedLocalState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = getItem(key);
    return item || initialValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [value]);

  return [value, setValue];
}