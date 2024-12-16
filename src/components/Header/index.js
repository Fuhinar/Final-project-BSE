import "./index.css";

function Header({ className = "", level = 1, children }) {
  const Tag = `h${level}`;
  return <Tag className={`${className} header header--${level}`}>{children}</Tag>;
}

export default Header;