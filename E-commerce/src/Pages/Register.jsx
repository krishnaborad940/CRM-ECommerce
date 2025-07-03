import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    Image: null,
    role: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Image" ? files[0] : value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.ConfirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("ConfirmPassword", formData.ConfirmPassword);
    data.append("role", formData.role);
    data.append("Image", formData.Image);

    fetch("http://localhost:8007/api", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Register Response:", data);

        if (data?.data?._id) {
        const user = data.data;

        // ✅ Save all data in localStorage
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("password",user.password)
        localStorage.setItem("userImage", user.Image); // if backend returns image filename
          //  const assignerData= localStorage.getItem("assigner");
          //  setFormData(assignerData)
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
    <>
     <div className="register-container">
  <div className="register-card">
    <h2 className="register-heading">Create Your Account</h2>
    <form onSubmit={handleRegister} className="register-form">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="register-input"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="register-input"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="register-input"
        required
      />
      <input
        type="password"
        name="ConfirmPassword"
        placeholder="Confirm Password"
        value={formData.ConfirmPassword}
        onChange={handleChange}
        className="register-input"
        required
      />
      <input
        type="file"
        name="Image"
        accept="image/*"
        onChange={handleChange}
        className="register-file"
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="register-select"
        required
      >
        <option value="">-- Select Role --</option>
        <option value="Admin">Admin</option>
        <option value="teleCaller">TeleCaller</option>
        <option value="sales">Sales</option>
        <option value="Supporter">Supporter</option>
      </select>
      <button type="submit" className="register-button">
        Register
      </button>
      <p>Have already an Account ?<a href="/Login">Login Here</a></p>
    </form>
  </div>
</div>

    </>
  );
}
