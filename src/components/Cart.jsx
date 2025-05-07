import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Button from "./ui/Button";
import { currencyFormatter } from "../utils/currency-formatting";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce(
    (totalAmout, item) => totalAmout + item.quantity * item.price,
    0
  );

  function handleOnClose() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      {cartCtx.items.map((item) => (
        <li key={item.id}>
          {item.name} ----- {item.quantity}
        </li>
      ))}
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleOnClose}>
          Close
        </Button>
        <Button>Checkout</Button>
      </p>
    </Modal>
  );
}
