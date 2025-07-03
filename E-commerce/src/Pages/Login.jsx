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

    fetch("http://localhost:8007/api/AllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const allUsers = data.data;
        const matchUser = allUsers.find(
          (user) =>
            user.email === isLogin.email &&
            user.password === isLogin.password
        );

        if (matchUser) {
          const userObj = {
            userId: matchUser._id,
            userName: matchUser.name,
            userEmail: matchUser.email,
            userRole: matchUser.role,
            userImage: matchUser.Image,
            assigner: matchUser.role,
            password: matchUser.password,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          alert("Login Successfully");
          navigate("/");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        alert("Something went wrong. Please try again.");
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
