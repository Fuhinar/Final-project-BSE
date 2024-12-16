import "./index.css";

export function Button({
  type = "button",
  onClick = () => console.log("Nothing happened"),
  disabled = false,
  variant = "primary",
  size = "md",
  children,
}) {
  const className = `btn btn--${variant} btn--${size}`;
  const handleClick = typeof onClick === "function" ? onClick : () => console.log("Nothing happened");

  return (
    <button type={type} className={className} onClick={handleClick} disabled={disabled}>{children}</button>
  );
}

export default Button;