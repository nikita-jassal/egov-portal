
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Token save karo
        localStorage.setItem("token", data.token);

        // User information save karo
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");

        // Role ke according page open karo
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/citizen/dashboard");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server se connection nahi ho pa raha");
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your E-Governance account
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;

