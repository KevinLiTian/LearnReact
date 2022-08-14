import React from "react";

import Star from "../images/Star.svg";

export default function Card(props) {
  return (
    <div className="Card--Body">
      <img src={props.img} className="Card--Image" />
      <div className="Card--Stats">
        <img src={Star} alt="Star Icon" />
        <span className="firstspan">{props.rating}</span>
        <span className="otherspan">({props.reviewCount})•</span>
        <span className="otherspan">{props.country}</span>
      </div>
      <p>{props.title}</p>
      <p>
        <strong>From ${props.price}</strong> / person
      </p>
    </div>
  );
}
