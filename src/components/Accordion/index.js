import "./index.css";
import { useState } from "react";

function Accordion({ className = "", title = "", defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion ${className} ${isOpen ? "accordion--open" : "accordion--closed"}`}>
      <div className="accordion__header" onClick={() => setIsOpen(!isOpen)}>
        <span className="accordion__title">{title}</span>
        <span className="accordion__icon">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="accordion__content">{children}</div>}
    </div>
  );
}

export default Accordion;