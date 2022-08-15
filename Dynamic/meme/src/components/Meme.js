import React from "react";
import DATA from "../memesData.js";

export default function Meme() {
  const [allMeme, setAllMeme] = React.useState(DATA);

  function getMemeImage() {
    const memesArray = allMeme.data.memes;
    const randNum = Math.floor(Math.random() * memesArray.length);
    return memesArray[randNum].url;
  }

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    imageSrc: getMemeImage(),
  });

  function getAndSetMemeImage() {
    setMeme({
      ...meme,
      imageSrc: getMemeImage(),
    });
  }

  return (
    <div className="meme">
      <div className="meme--container">
        <input type="text" placeholder="Top text" />
        <input type="text" placeholder="Bottom text" />
        <button type="button" onClick={getAndSetMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme--image--container">
        <img src={meme.imageSrc} alt="meme" />
      </div>
    </div>
  );
}
