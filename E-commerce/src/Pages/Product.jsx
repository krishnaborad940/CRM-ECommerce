import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "../App.css"; 

export default function Product() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Price: "",
    Image: null,
    category: "",
    stock: "",
    rate: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Image" ? files[0] : value,
    }));
  };

  const handleProduct = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("Price", formData.Price);
    data.append("category", formData.category);
    data.append("Image", formData.Image);
    data.append("stock", formData.stock);
    data.append("rate", formData.rate);

    fetch("http://localhost:8007/api/Product", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Product added successfully!");
        navigate("/");
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <h2 className="form-title">➕ Add New Product</h2>
        <form onSubmit={handleProduct} className="product-form">
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </label>

          <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          </label>

          <label>
            Price:
            <input type="number" name="Price" value={formData.Price} onChange={handleChange} required />
          </label>

          <label>
            Stock:
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          </label>

          <label>
            Image:
            <input type="file" name="Image" onChange={handleChange} required />
          </label>

          <label>
            Category:
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Toys">Toys</option>
            </select>
          </label>

          <label>
            Rate:
            <input type="number" name="rate" value={formData.rate} onChange={handleChange} />
          </label>

          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
}
