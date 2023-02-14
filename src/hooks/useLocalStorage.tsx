import { useEffect, useState } from "react";

/** From https://upmostly.com/next-js/using-localstorage-in-next-js */
export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? (JSON.parse(stored) as T) : fallbackValue);
  }, [key, fallbackValue]);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
