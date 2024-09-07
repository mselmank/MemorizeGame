"use client";

import React, { FC, useEffect, useState } from "react";

interface ImageData {
  url: string;
  uuid: string;
  title: string;
  content_type: string;
}

interface BoardProps {
  data: string[];
  isLoading: boolean;
}

const Board: FC<BoardProps> = ({ data, isLoading }) => {
  console.log("🚀 ~ data:", data);
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  const generateDeck = () => {
    const Cards = data.map((item) => item);
    const deck = [...Cards, ...Cards];
    return deck.sort(() => Math.random() - 0.5);
  };
  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
  };
  useEffect(() => {
    const checkForMatch = () => {
      const [firstCard, secondCard] = flipped;
      if (cards[firstCard] === cards[secondCard]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [cards, flipped, solved]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex justify-center text-4xl font-bold ${
              flipped.includes(index) || solved.includes(index) ? "" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <img
                src={`/memory-cards/${card}.webp`}
                alt="Memory Card"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                ?
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
