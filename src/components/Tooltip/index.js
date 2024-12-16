import "./index.css";

function Tooltip({ className = "", text = "Tooltip", position = "top", children }) {
  return (
    <div className={`tooltip ${className} tooltip--${position}`}>
      {children}
      <div className="tooltip__text">{text}</div>
    </div>
  );
}

export default Tooltip;