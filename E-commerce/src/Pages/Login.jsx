// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  // const [isLogin, setIsLogin] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [isLogin,setIsLogin]=useState()

  const navigate = useNavigate();
  const schema=yup.object().shape({
    email:yup.string().email("Invalid Email").required("Email Is required"),
    password:yup.string().required("Password Is Required")
  })
  const {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm({
    resolver:yupResolver(schema)
  })

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setIsLogin((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const onsubmit = (data) => {
   fetch("http://localhost:8007/api/Login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
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
        userPassword:user.password 
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", data.token);
      // alert("Login Successful");
      navigate("/");
    } else {
      alert("Invalid Email Or Password");
    }
  });

  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login to Your CRM</h2>
        <form onSubmit={handleSubmit(onsubmit)} className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            // value={isLogin.email}
            {...register('email')}
            // onChange={handleChange}
            className="login-input"
            
          />{errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            // value={isLogin.password}
            {...register('password')}
            // onChange={handleChange}
            className="login-input"
            
          />{errors.password && <p style={{color:'red'}}>{errors.password.message}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <p>Don't have an account ? <a href="/Register">SignIn</a></p>
        </form>
      </div>
    </div>
  );
}
