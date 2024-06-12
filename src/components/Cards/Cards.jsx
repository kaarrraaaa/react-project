import React from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

export default function Cards(props) {
  const { cards, onUserClick } = props;

  return (
    <div className="card-container">
      {cards.length > 0 &&
        cards.map((card) => (
          <Link
            key={card.id}
            to={`/users/${card.id}`}
            className="list-group-item"
            onClick={() => onUserClick(card.id)}
          >
            <p className="userName">
              <strong>{card.first_name}</strong>
            </p>
            <p className="userEmail">{card.email}</p>
            <img className="userPhoto" src={card.avatar} alt="Avatar" />
          </Link>
        ))}
    </div>
  );
}
