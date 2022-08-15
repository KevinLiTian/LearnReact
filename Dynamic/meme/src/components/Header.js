import React from "react";

import trollFace from "../images/Troll Face.svg";

export default function Header() {
  return (
    <header>
      <img src={trollFace} alt="Troll Face" />
      <h1>Meme Generator</h1>
      <h3>React Course - Project 3</h3>
    </header>
  );
}
