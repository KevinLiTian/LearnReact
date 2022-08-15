import React from "react";

import Star from "../images/Star.svg";

export default function Card(props) {
  let badgeText;
  if (props.item.openSpots === 0) {
    badgeText = "SOLD OUT";
  } else if (props.item.location === "Online") {
    badgeText = "ONLINE";
  }

  return (
    <div className="Card">
      {badgeText && <div className="card--badge">{badgeText}</div>}
      <img src={props.item.coverImg} alt="Cover" className="Card--Image" />
      <div className="Card--Stats">
        <img src={Star} alt="Star Icon" />
        <span className="firstspan">{props.item.stats.rating}</span>
        <span className="otherspan">({props.item.stats.reviewCount})•</span>
        <span className="otherspan">{props.item.stats.country}</span>
      </div>
      <p className="card--title">{props.item.title}</p>
      <p>
        <strong>From ${props.item.price}</strong> / person
      </p>
    </div>
  );
}
