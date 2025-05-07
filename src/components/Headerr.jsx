import { useContext } from "react";
import logo from "../assets/logo.jpg";

import Button from "./ui/Button";
import CartContext from "../store/CarContext";

export default function Header() {
  const cartCtx = useContext(CartContext);

  const totalItems = cartCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  console.log(totalItems);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalItems})</Button>
      </nav>
    </header>
  );
}
