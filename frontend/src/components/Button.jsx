export function Button({ className, children, ...props }) {
  return (
    <button type="button" className={`button ${className}`} {...props}>
      {children}
    </button>
  );
}
