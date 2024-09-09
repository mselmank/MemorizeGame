"use client";
import useSWR from "swr";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
  const [imagesLoaded, setImagesLoaded] = useState<{
    [url: string]: HTMLImageElement;
  }>({});

  const generateDeck = (): Card[] => {
    const Cards =
      data && Array.isArray(data)
        ? data.map((item) => ({ title: item.title, url: item.url }))
        : [];
    const deck = [...Cards, ...Cards];
    return deck.sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    if (hit === 20) {
      alert("¡Felicidades! Has ganado el juego.");
    }
  }, [hit]);

  useEffect(() => {
    if (!isLoadingSWR && data && !error) {
      setCards(generateDeck());
    }
  }, [data, isLoadingSWR, error]);
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: { [url: string]: HTMLImageElement } = {};
      await Promise.all(
        cards.map(async (card) => {
          const img = new Image();
          img.src = card.url;
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          loadedImages[card.url] = img;
        })
      );
      setImagesLoaded(loadedImages);
    };

    preloadImages();
  }, [cards]);

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
      {isLoadingSWR && (
        <div>
          <h3 className="text-2xl font-mono">Cargando...</h3>
        </div>
      )}
      {error && (
        <div className="text-2xl font-mono">
          <h3>Error al cargar las imágenes</h3>
        </div>
      )}
      {!isLoadingSWR && !error && (
        <div>
          <div className="flex justify-center gap-2 mb-20">
            <div className="p-8">
              <h1 className="text-2xl font-mono">Aciertos: {hit}</h1>
            </div>
            <div className="p-8">
              <h1 className="text-2xl font-mono">Errores: {miss}</h1>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`flex justify-center  font-mono hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-l transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25 ${
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
                    className="w-32 h-36 object-cover  rounded-xl "
                  />
                ) : (
                  <div className="w-32 h-36 flex items-center justify-center">
                    <h3 className="text-9xl font-bold text-black">?</h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-center mt-10">
        <Button className="p-8" onClick={resetGame}>
          <h1 className="text-2xl font-mono">Reiniciar juego</h1>
        </Button>{" "}
      </div>
    </div>
  );
};

export default Board;
