import { useRecoilState } from "recoil";
import { cardsAtom, spotlightAtom } from "./atoms";
import Card from "./card";
import "./Cards.css";
import { useEffect, useState } from "react";

const Cards = () => {
  const [cards, setCards] = useRecoilState(cardsAtom);
  const [spotlight, setSpotlight] = useRecoilState(spotlightAtom);
  const [isShuffle, setIsShuffle] = useState(false);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setInterval(function () {
      setSpotlight(Math.floor(Math.random() * cards.length));
    }, 5000);
  }, []);

  const handleShuffleClick = () => {
    setReady(false);
    setIsShuffle(true);
    setTimeout(() => {
      setIsShuffle(false);
      setTimeout(() => {
        setReady(true);
        setTimeout(() => {
          setCards(shuffle(cards));
        }, 1000);
      }, 600);
    }, 600);
  };

  return (
    <div>
      <div
        id={"cards-container"}
        className={`cards-container ${isShuffle ? "shuffle" : ""} ${
          ready ? "ready" : ""
        }`}
      >
        {cards.map((card) => (
          <Card key={card.id} {...card} spotlight={spotlight === card.id} />
        ))}
      </div>

      <div className={"button-container"}>
        <button
          className={"shuffle-btn"}
          type={"button"}
          onClick={handleShuffleClick}
        >
          shuffle
        </button>
      </div>
    </div>
  );
};

export default Cards;

const shuffle = (cards) => {
  const result = [...cards];

  const indexes = [];
  result.forEach((card, index) => {
    if (!card.selected) {
      indexes.push(index);
    }
  });

  const size = indexes.length;

  for (let i = 0; i < size; i++) {
    const currentIndex = indexes[i];
    const changeIndex = Math.floor(Math.random() * size);
    const index = indexes[changeIndex];

    const temp = result[index];
    result[index] = result[currentIndex];
    result[currentIndex] = temp;
  }

  return result;
};
