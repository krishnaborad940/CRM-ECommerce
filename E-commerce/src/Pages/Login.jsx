import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
         
const allUsers=data.data;
const matchUser=allUsers.find((user)=>user.email===isLogin.email &&user.password===isLogin.password)
        if (matchUser) {
           const userObj = {
  userId: matchUser._id,
  userName: matchUser.name,
  userEmail: matchUser.email,
  userRole: matchUser.role,
  userImage: matchUser.Image,
  assigner: matchUser.role,
  password:matchUser.password
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
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <table border={1}>
          <tbody>
            <tr>
              <td>Email:</td>
              <td>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  value={isLogin.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={isLogin.password}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="submit" value="Login" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
