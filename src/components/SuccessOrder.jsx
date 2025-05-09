import Modal from "./Modal";
import Button from "./ui/Button";

export default function SuccessOrder({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2>Success</h2>
      <p>Your order was submitted successfully</p>
      <p className="modal-actions">
        <Button onClick={onClose}>Okay</Button>
      </p>
    </Modal>
  );
}
