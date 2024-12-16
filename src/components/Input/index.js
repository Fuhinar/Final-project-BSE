import "./index.css";

export function Input(props) {
  const {
    type = "text",
    placeholder = "Write here...",
    value,
    onChange = () => {},
    disabled = false,
    label,
    danger = false,
    children
  } = props;

  return (
    <div className="input-container">
      {label && (
        <label className={`input-label ${danger ? "input-label--danger" : "input-label--safe"}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`input ${disabled ? "input--disabled" : "input--enabled"} ${danger ? "input--danger" : "input--safe"}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;