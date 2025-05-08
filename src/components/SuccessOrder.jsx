import Modal from "./Modal";
import Button from "./ui/Button";

export default function SuccessOrder({ onClick, onOpen, onClose }) {
  return (
    <Modal open={onOpen} onClose={onClose}>
      <h2>Success</h2>
      <p>Your order was submitted successfully</p>
      <p className="modal-actions">
        <Button onClick={onClick}>Okay</Button>
      </p>
    </Modal>
  );
}
