import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "", onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const modal = modalRef.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
