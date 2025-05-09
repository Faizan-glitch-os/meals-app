import { useContext } from "react";
import { currencyFormatter } from "../utils/currency-formatting";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./ui/Button";
import SuccessOrder from "../components/SuccessOrder";
import Error from "./Error";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { loadedData, loading, error, clearLoadedData, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    config,
    []
  );

  const totalPrice = cartCtx.items.reduce(
    (totalAmout, item) => totalAmout + item.quantity * item.price,
    0
  );

  function handleOnClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearLoadedData();
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: userData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleOnClose}>
        Close
      </Button>
      <Button type="submit">Confirm Order</Button>
    </>
  );

  if (loading) {
    actions = <p>Submitting order...</p>;
  }

  console.log(loadedData);
  console.log(error);

  if (loadedData.message && !error) {
    return (
      <SuccessOrder
        open={userProgressCtx.progress === "checkout"}
        onClose={userProgressCtx.progress === "checkout" ? handleOnClose : null}
        onFinish={handleFinish}
      />
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleOnClose : null}
    >
      <form onSubmit={handleOnSubmit}>
        <h2>Checkout</h2>
        <p>Total: {currencyFormatter.format(totalPrice)} </p>

        <Input label="Full Name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />

          {error && <Error title="Failed to submit order" message={error} />}

          <p className="modal-actions">{actions}</p>
        </div>
      </form>
    </Modal>
  );
}
