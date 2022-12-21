import { useRecoilState } from "recoil";
import { cardsAtom, createDefault, prizes } from "./atoms";
import Card from "./card";
import "./Cards.css";
import { useEffect, useState } from "react";

const Cards = () => {
  const [cards, setCards] = useRecoilState(cardsAtom);
  const [isShuffle, setIsShuffle] = useState(false);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.setItem('cards', JSON.stringify(cards));  
    }, 3000);

    return () => {
      clearInterval(intervalId);
    }
  }, [cards]);

  const handleClickSaveBtn = () => {
    localStorage.setItem('cards', JSON.stringify(cards));
  };


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

  const handleFlipAllClick = () => {
    const newCards = cards.map(c => {
      return {
        ...c,
        selected: true
      }
    });

    setCards(newCards);
  };

  const handleFlipTypes = (type) => {
    const newCards = cards.map(c => {
      let selected = c.selected;
      if (type === c.name) {
        selected = true;
      };

      return {
        ...c,
        selected: selected
      }
    });

    setCards(newCards);
  }

  const handlePickClick = (e, card, idx) => {
    e.preventDefault();
    e.stopPropagation();

    const owner = card.owner;

    const name = window.prompt(`${idx}를 찜콩하시겠습니까?`, `${owner || ""}`);
    if (name !== owner) {
      const cardIndex = cards.findIndex((c) => c.id === card.id);
      const newCard = { 
        ...card,
        owner: name
       };
      const updatedCards = replaceItemAtIndex(cards, cardIndex, newCard);
      setCards(updatedCards);
    }
  };

  const handleResetBtnClick = () => {
    localStorage.clear('cards');
    setCards(createDefault());
  }

  return (
    <div className="main-container">
      <div className="main-content">
        <div
          id={"cards-container"}
          className={`cards-container ${isShuffle ? "shuffle" : ""} ${
            ready ? "ready" : ""
          }`}
        >
          {cards.map((card, idx) => (
            <div style={{ paddingBottom: '20px'}} key={card.id}>
              <Card {...card} idx={idx} />
              <button className={'pick-btn'} onClick={(e) => handlePickClick(e, card, idx)}>찜!</button>
            </div>
          ))}
        </div>
        
      </div>
      <div className="main-util">
      <div>
          {prizes.map(p => p.name).map(k => {
            const active = cards.filter(c => c.name === k).some(c => c.selected !== true);
            return <p key={k}><button className={`shuffle-btn m-4 ${active ? '' : 'disabled'}`} onClick={() => handleFlipTypes(k)} disabled={!active}>{k}</button></p>
          })}
        </div>

        <div className={"button-container"}>
          <button
            className={"shuffle-btn m-4"}
            type={"button"}
            onClick={handleShuffleClick}
          >
            shuffle
          </button>

          <button
            className={"shuffle-btn m-4"}
            type={"button"}
            onClick={handleFlipAllClick}
          >
            가즈아!
          </button>

          <br />
          <br />

          <button
            className={"shuffle-btn m-4"}
            type={"button"}
            onClick={handleClickSaveBtn}
          >
            SAVE
          </button>

          <button
            className={"shuffle-btn m-4"}
            type={"button"}
            onClick={handleResetBtnClick}
          >
            RESET
          </button>
        </div>
      </div>
      <br />
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

export function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
