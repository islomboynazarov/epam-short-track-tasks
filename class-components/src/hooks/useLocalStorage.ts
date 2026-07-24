import { useState } from "react";

function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
}

export default useLocalStorage;