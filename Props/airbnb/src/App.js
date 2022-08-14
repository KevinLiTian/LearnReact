import React from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";

import KZ from "./images/KZ.svg";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Hero />
      <Card
        img={KZ}
        rating="5.0"
        reviewCount={6}
        country="USA"
        title="Life Lessons with Katie Zaferes"
        price={136}
      />
    </div>
  );
}
