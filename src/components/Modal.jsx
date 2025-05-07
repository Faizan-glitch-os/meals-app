import { useEffect, useRef } from "react";

export default function Modal({ children, open, className = "" }) {
  const modal = useRef();

  useEffect(() => {
    if (open) {
      modal.current.showModal();
    }
  }, [open]);

  return (
    <dialog ref={modal} className={`modal ${className}`}>
      {children}
    </dialog>
  );
}
