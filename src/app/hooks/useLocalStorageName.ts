import { useState } from "react";

function useLocalStorageName() {
  const [name, setName] = useState<string | null>(() => {
    const storedName = localStorage.getItem("name");
    return storedName ? storedName : null;
  });

  const saveName = (newName: string) => {
    localStorage.setItem("name", newName);
    setName(newName);
  };

  return [name, saveName] as const;
}

export default useLocalStorageName;
