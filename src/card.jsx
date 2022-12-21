import "./Card.css";
import { cardsAtom } from "./atoms";
import { useRecoilState } from "recoil";
import { EditComponent, PurpleIOLogo } from "./components/sub-components";

const Card = ({ id, name, selected, owner, img, idx }) => {
  const [cards, setCards] = useRecoilState(cardsAtom);

  const handleClick = () => {
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
    <div className="GradientBorder">
      <div
        className={`flip-card ${selected ? "selected" : ""}`}
        onClick={handleClick}
      >
        <div className="flip-card-inner">
          
          <div className="flip-card-front">
            <p className="idx m-4">{idx}</p>
            <PurpleIOLogo />
            {owner && <p className={"owner-name"}>{owner}</p>}
          </div>
          <div className="flip-card-back">
            <p className={"product-name"}>{idx}. {name} </p>
            {img && <img className={"product-img"} src={img} alt={'product'} />}

            {owner && <p className={"owner-name"}>{owner}</p>}
            <EditComponent onClick={handleEditClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export default Card;
