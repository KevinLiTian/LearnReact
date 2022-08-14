import React from "react";

import HeroPNG from "../images/Hero.svg";

export default function Hero() {
  return (
    <section className="Hero">
      <img src={HeroPNG} alt="Hero Image" />
      <div className="Hero--Text">
        <h1>Online Experiences</h1>
        <p>
          Join unique interactive activities led by one-of-a-kind hosts-all
          without leaving home.
        </p>
      </div>
    </section>
  );
}
