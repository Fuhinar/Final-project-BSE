import "./index.css";

function Typography({ className = "", textSize = "md", children }) {
  return (
    <p className={`typography ${className} typography--${textSize}`}>
      {children}
    </p>
  );
}

export default Typography;