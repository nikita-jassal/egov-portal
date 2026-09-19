import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-page">

      <div className="register-box">

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Create your E-Governance citizen account
        </p>

        <form>

          <div className="input-group">
            <label htmlFor="name">Full Name</label>

            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="register-submit"
          >
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;