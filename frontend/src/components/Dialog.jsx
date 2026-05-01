export function DialogContent({ children, dialogRef, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="dialog-base"
      onClick={handleBackdropClick}
    >
      <div className="dialog-content">{children}</div>
    </dialog>
  );
}
