import React from "react";

export default function Meme() {
  const [allMeme, setAllMeme] = React.useState([]);
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    imageSrc: "http://i.imgflip.com/1bij.jpg",
  });

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  function getAndSetMemeImage() {
    const randNum = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randNum].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageSrc: url,
    }));
  }

  function inputHandler(event) {
    const { name, value } = event.target;

    setMeme({
      ...meme,
      [name]: value,
    });
  }

  return (
    <div className="meme">
      <div className="meme--container">
        <input
          onChange={inputHandler}
          name="topText"
          type="text"
          placeholder="Top text"
        />
        <input
          onChange={inputHandler}
          type="text"
          name="bottomText"
          placeholder="Bottom text"
        />
        <button type="button" onClick={getAndSetMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme--image--container">
        <img src={meme.imageSrc} alt="meme" />
        <h2 className="meme--text meme--text--top">{meme.topText}</h2>
        <h2 className="meme--text meme--text--bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
