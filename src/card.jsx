import "./Card.css";
import { useState } from "react";
import { cardsAtom } from "./atoms";
import { useRecoilState } from "recoil";

const Card = ({ id, name, spotlight, selected }) => {
  const [cards, setCards] = useRecoilState(cardsAtom);

  const handleClick = (selected) => {
    const cardIndex = cards.findIndex((card) => card.id === id);
    const card = { ...cards[cardIndex] };
    card.selected = !selected;
    const updatedCards = replaceItemAtIndex(cards, cardIndex, card);
    setCards(updatedCards);
  };

  return (
    <div
      className={`flip-card ${selected ? "selected" : ""} ${
        spotlight ? "spotlight" : ""
      }`}
      onClick={() => handleClick(selected)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p>{id}</p>
        </div>
        <div className="flip-card-back">
          <p>{name}</p>
          <img
            src={
              "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-blue-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842712000"
            }
          />
        </div>
      </div>
    </div>
  );
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default Card;
