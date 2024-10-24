import { useEffect, useState } from "react";
import { cardData } from "../constants";

const useGameState = () => {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    if (isGameComplete) {
      clearInterval(interval);
    }
  }, [isGameComplete]);

  const handleCardClick = (index) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    )
      return;
    const newFlippedCards = [...flippedCards, index];
    const updatedCards = cards.map((card, idx) =>
      idx === index ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    setFlippedCards(newFlippedCards);
    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      if (cards[firstCard].value === cards[secondCard].value) {
        const matchedCards = updatedCards.map((card, idx) =>
          idx === firstCard || idx === secondCard
            ? { ...card, isMatched: true }
            : card
        );
        setCards(matchedCards);
        setMatches(matches + 1);
        setFlippedCards([]);
      }
      if (matches + 1 === 8) setIsGameComplete(true);
    } else {
      setTimeout(() => {
        const resetCards = updatedCards.map((card, idx) =>
          newFlippedCards.includes(idx) ? { ...card, isFlipped: false } : card
        );
        setCards(resetCards);
        setFlippedCards([]);
      }, 3000);
    }
    setMoves(moves + 1);
  };

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setTimer(0);
    setIsGameComplete(false);
    setMatches(0);
    setMoves(0);
    shuffleCards();
  };
  return {
    cards,
    moves,
    matches,
    timer,
    isGameComplete,
    handleCardClick,
    resetGame,
  };
};
export default useGameState;
