import React from 'react';

function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <div className="element__upp">
        <img className="element__image" alt={card.name} src={card.link} onClick={handleClick}/>
        <button type="button" className="element__delete"></button>
      </div>
      <div className="element__bottom">
          <h2 className="element__description">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className="element__like"></button>
          <p className="element__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;