import React from "react";
import Confetti from "react-confetti";

import Die from "./components/Die";

export default function App() {
  function allNewDice() {
    let numArray = [];
    for (let i = 0; i < 10; i++) {
      let numObj = {
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      };
      numArray.push(numObj);
    }
    return numArray;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const [dice, setDice] = React.useState(() => allNewDice());
  const [tenzies, setTenzies] = React.useState(() => false);
  const diceComponents = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const referenceValue = dice[0].value;
    const sameValue = dice.every((die) => die.value === referenceValue);
    if (allHeld && sameValue) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="tenzies-text">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls
        </p>
      </div>

      <div className="dice-container">{diceComponents}</div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
