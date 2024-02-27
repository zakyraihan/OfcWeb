import { useState, useEffect } from "react";

const useDebounce = (keyword: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(keyword);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  return debouncedValue;
};

export default useDebounce;
