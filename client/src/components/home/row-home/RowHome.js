import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "./card-home/CardHome.js";
import "./RowHome.css";

function RowHome({ title, fetchUrl }) {
  // include -> fetchUrl from the props
  const [cards, setCards] = useState([]);

  // A snippet of code which runs on a specific condition
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setCards(response.data);
      console.log(title, response.data);
      return null;
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {cards.map((card) => (
          <Card title={title} data={card} />
        ))}
      </div>
    </div>
  );
}

export default RowHome;
