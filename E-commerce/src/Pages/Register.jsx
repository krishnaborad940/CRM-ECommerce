import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Register() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("User Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
    role: yup.string().required("Please select a role"),
    Image: yup.mixed().required("Image is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = (data) => {
    if (data.password !== data.ConfirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("ConfirmPassword", data.ConfirmPassword);
    formData.append("role", data.role);
    if (data.Image && data.Image[0]) {
      formData.append("Image", data.Image[0]);
    }

    fetch("http://localhost:8007/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Register Response:", data);

        if (data?.data?._id) {
          const user = data.data;
          localStorage.setItem("userId", user._id);
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("userImage", user.Image);
        localStorage.setItem("userPassword", user.password);
          alert("Registered Successfully");
          navigate("/");
        } else {
          alert("Registration failed, please check your data");
        }
      })
      .catch((err) => {
        console.error("Register Error:", err);
        alert("Something went wrong during registration.");
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading">Create Your Account</h2>
        <form onSubmit={handleSubmit(onsubmit)} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="register-input"
          />
          {errors.name && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="register-input"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="register-input"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("ConfirmPassword")}
            className="register-input"
          />
          {errors.ConfirmPassword && (
            <p style={{ color: "red" }}>{errors.ConfirmPassword.message}</p>
          )}

          <input
            type="file"
            accept="image/*"
            {...register("Image")}
            className="register-file"
          />
          {errors.Image && (
            <p style={{ color: "red" }}>{errors.Image.message}</p>
          )}

          <select {...register("role")} className="register-select">
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="teleCaller">TeleCaller</option>
            <option value="sales">Sales</option>
          </select>
          {errors.role && (
            <p style={{ color: "red" }}>{errors.role.message}</p>
          )}

          <button type="submit" className="btn  btn-gradient-primary">
            Register
          </button>
          <p>
            Already have an account? <a href="/Login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
