"use client";
import useSWR from "swr";
import React, { FC, useEffect, useState } from "react";

interface BoardProps {
  data: [];
  isLoading: boolean;
}
interface Card {
  title: string;
  url: string;
}

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

const Board: FC<BoardProps> = () => {
  const {
    data,
    error,
    isLoading: isLoadingSWR,
  } = useSWR("https://challenge-uno.vercel.app/api/images", fetcher);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [hit, setHit] = useState<number>(0);
  const [miss, setMiss] = useState<number>(0);

  const generateDeck = (): Card[] => {
    const Cards =
      data && Array.isArray(data)
        ? data.map((item) => ({ title: item.title, url: item.url }))
        : [];
    const deck = [...Cards, ...Cards];
    return deck.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (!isLoadingSWR && data && !error) {
      setCards(generateDeck());
    }
  }, [data, isLoadingSWR, error]);

  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
    setHit(0);
    setMiss(0);
  };

  const checkForMatch = () => {
    const [firstCard, secondCard] = flipped;
    if (cards[firstCard] === cards[secondCard]) {
      setSolved([...solved, ...flipped]);
      setHit(hit + 1);
    } else {
      setMiss(miss + 1);
    }
    setFlipped([]);
  };

  useEffect(() => {
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
      {isLoadingSWR && <div>Cargando...</div>}
      {error && <div>Error al cargar las imágenes</div>}
      {!isLoadingSWR && !error && (
        <div>
          <p>Aciertos: {hit}</p> {/* Mostrar el contador de aciertos */}
          <p>Errores: {miss}</p> {/* Mostrar el contador de errores */}
          <button onClick={resetGame}>Reiniciar juego</button>{" "}
          <div className="grid grid-cols-4 gap-5">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`flex justify-center text-4xl font-bold ${
                  flipped.includes(index) || solved.includes(index)
                    ? ""
                    : "bg-gray-200"
                }`}
                onClick={() => handleClick(index)}
              >
                {flipped.includes(index) || solved.includes(index) ? (
                  <img
                    src={card.url}
                    alt="Memory Card"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h3 className="text-4xl font-bold text-red-400">?</h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
