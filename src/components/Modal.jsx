import { useEffect, useRef } from "react";

export default function Modal({ children, open, className = "" }) {
  const modalRef = useRef();

  useEffect(() => {
    const modal = modalRef.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return (
    <dialog ref={modalRef} className={`modal ${className}`}>
      {children}
    </dialog>
  );
}
