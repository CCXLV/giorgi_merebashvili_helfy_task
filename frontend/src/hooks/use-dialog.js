import { useRef, useState } from "react";

export function useDialog() {
  const dialogRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    setIsOpen(false);
    dialogRef.current?.close();
  };

  return { dialogRef, isOpen, openDialog, closeDialog };
}
