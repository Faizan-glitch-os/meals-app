import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const config = {};

export default function Meals() {
  const {
    loadedData: loadedMeals,
    loading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);

  console.log(loadedMeals);

  if (loading) {
    return <p>Fetching meals</p>;
  }

  if (!loadedMeals) {
    return <p className="center">No meals to show</p>;
  }

  if (error) {
    return <Error title="Failed to fetch" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
