import { useContext } from "react";
import { currencyFormatter } from "../utils/currency-formatting";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce(
    (totalAmout, item) => totalAmout + item.quantity * item.price,
    0
  );

  function handleOnClose() {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleOnClose : null}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total: {currencyFormatter.format(totalPrice)} </p>

        <Input label="Full Name" id="full-name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />

          <p className="modal-actions">
            <Button textOnly onClick={handleOnClose}>
              Close
            </Button>
            <Button>Confirm Order</Button>
          </p>
        </div>
      </form>
    </Modal>
  );
}
