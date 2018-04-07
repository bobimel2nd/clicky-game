import React from "react";
import "./Card.css";

const Card = (props) => (
  <div className="card">
    <div className="img-container">
      <div className={props.class} onClick={() => props.guess(props.id)} onMouseOver={() => props.hover(props.id, true)} onMouseOut={() => props.hover(props.id, false)}>
        <img alt={props.name} src={props.image} />
      </div>
    </div>
    <div className="content">
      <strong>{props.name}</strong>
    </div>
  </div>
);

export default Card;
