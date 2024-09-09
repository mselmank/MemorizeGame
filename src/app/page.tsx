"use client";
import { useState, useEffect } from "react";
import { PlayerNameInput } from "./components/PlayerNameInput";
import useCachedName from "./hooks/useLocalStorageName";
import Board from "./components/Board";

export default function Home() {
  const [name, setName] = useCachedName();
  const [showNameInput, setShowNameInput] = useState(!name);

  useEffect(() => {
    if (name) {
      setShowNameInput(false);
    }
  }, [name]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h3 className="text-2xl font-mono">{name || "Bienvenido"}</h3>{" "}
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {showNameInput && (
          <div>
            <PlayerNameInput onSubmit={setName} />{" "}
          </div>
        )}
        {!showNameInput && (
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div>
              <Board data={[]} isLoading={false} />
            </div>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h1 className="text-sm font-mono">Made with ❤️ by MselmanK</h1>
      </footer>
    </div>
  );
}
