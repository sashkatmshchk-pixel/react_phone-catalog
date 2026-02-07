import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        background: "#fff",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: "40px",
          padding: "20px 40px",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
};

export default Header;