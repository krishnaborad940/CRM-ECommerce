import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isLogin.email || !isLogin.password) {
      alert("Please enter both email and password");
      return;
    }

   fetch("http://localhost:8007/api/Login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(isLogin),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.token) {
      const user = data.user;
      const userObj = {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
        userImage: user.Image,
        assigner: user.role,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", data.token);
      alert("Login Successful");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  });

  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login to Your CRM</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={isLogin.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={isLogin.password}
            onChange={handleChange}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p>Don't have an account ? <a href="/Register">SignIn</a></p>
        </form>
      </div>
    </div>
  );
}
