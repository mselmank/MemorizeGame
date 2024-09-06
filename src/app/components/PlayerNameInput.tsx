import React, { useState } from "react";

interface PlayerNameInputProps {
  onPlayerNameSubmit: (name: string) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({
  onPlayerNameSubmit,
}) => {
  const [inputName, setInputName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onPlayerNameSubmit(inputName);
    console.log("🚀 ~ inputName:", inputName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        htmlFor="playerName"
      >
        Enter your name:
      </label>
      <input
        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        type="text"
        id="playerName"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        required
      />
      <button
        type="submit"
        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
      >
        Start Game{" "}
      </button>
    </form>
  );
};

export default PlayerNameInput;
