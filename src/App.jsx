import Header from "./components/Headerr";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressCartProvider } from "./store/UserProgressContext";

function App() {
  return (
    <CartContextProvider>
      <UserProgressCartProvider>
        <Header />
        <Meals />
      </UserProgressCartProvider>
    </CartContextProvider>
  );
}

export default App;
