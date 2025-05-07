import Header from "./components/Headerr";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CarContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
