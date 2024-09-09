import { useState, useEffect } from "react";

function useLocalStorageName() {
  const [name, saveName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("name") || "";
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("name", name);
    }
  }, [name]);

  return [name, saveName];
}

export default useLocalStorageName;
