 import { Link } from "react-router-dom";
 import "./Navbar.css";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        E-Governance
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <Link to="/login" className="login-btn">
          Login
        </Link>
        

        
      </div>
    </nav>
  );
}

export default Navbar;