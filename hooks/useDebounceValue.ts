import { useState, useEffect, useCallback } from "react";

function useDebounceValue<T>(defaultValue: T, delay: number): [T, (newValue: T) => void] {
  const [value, setValue] = useState(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState(defaultValue);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return [debouncedValue, updateValue];
}

export default useDebounceValue;
