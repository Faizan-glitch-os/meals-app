import { useEffect } from "react";
import { useState } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      const responseData = response.json();

      setLoadedMeals(responseData);
    }
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        <li key={meal.id} className="meal-item">
          <article>
            <img src={meal.price} alt="price of the meal" />
            <h3>{meal.name}</h3>
            <p className="price">{meal.price}</p>
            <p className="description">{meal.description}</p>
            <button className="actions">Add to Cart</button>
          </article>
        </li>;
      })}
    </ul>
  );
}
