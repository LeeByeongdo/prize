import { useRecoilState } from "recoil";
import { cardsAtom, spotlightAtom } from "./atoms";
import Card from "./card";
import "./Cards.css";
import { useEffect } from "react";

const Cards = () => {
  const [cards, setCards] = useRecoilState(cardsAtom);
  const [spotlight, setSpotlight] = useRecoilState(spotlightAtom);

  useEffect(() => {
    setInterval(function () {
      setSpotlight(Math.floor(Math.random() * cards.length));
    }, 5000);
  }, []);

  const handleShuffleClick = () => {
    const shuffledCards = shuffle(cards);
    setCards(shuffledCards);
  };

  return (
    <div>
      <div className={"cards-container"}>
        {cards.map((card) => (
          <Card key={card.id} {...card} spotlight={spotlight === card.id} />
        ))}
      </div>
      <button type={"button"} onClick={handleShuffleClick}>
        shuffle
      </button>
    </div>
  );
};

export default Cards;

const shuffle = (cards) => {
  const result = [...cards];
  const size = result.length;

  for (let i = 0; i < size; i++) {
    if (result[i].selected) {
      continue;
    }

    const index = Math.floor(Math.random() * size);
    if (result[index].selected) {
      continue;
    }

    const temp = result[index];
    result[index] = result[i];
    result[i] = temp;
  }

  return result;
};
