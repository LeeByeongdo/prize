import "./Card.css";
import { cardsAtom } from "./atoms";
import { useRecoilState } from "recoil";
import { EditComponent, PurpleIOLogo } from "./components/sub-components";

const Card = ({ id, name, spotlight, selected, owner, img }) => {
  const [cards, setCards] = useRecoilState(cardsAtom);

  const handleClick = (selected) => {
    const cardIndex = cards.findIndex((card) => card.id === id);
    const card = { ...cards[cardIndex] };
    card.selected = !selected;
    const updatedCards = replaceItemAtIndex(cards, cardIndex, card);
    setCards(updatedCards);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const name = window.prompt("행운의 당첨자는 누구?", `${owner || ""}`);
    if (name !== owner) {
      const cardIndex = cards.findIndex((card) => card.id === id);
      const card = { ...cards[cardIndex] };
      card.owner = name;
      const updatedCards = replaceItemAtIndex(cards, cardIndex, card);
      setCards(updatedCards);
    }
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
          <PurpleIOLogo />
        </div>
        <div className="flip-card-back">
          <p className={"product-name"}>{name} </p>
          {img && <img className={"product-img"} src={img} />}

          {owner && <p className={"owner-name"}>{owner}</p>}
          <EditComponent onClick={handleEditClick} />
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
