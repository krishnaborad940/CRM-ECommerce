import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";
import "../App.css"; 

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productId: "",
    nextFollowup: "",
    remark: "",
    status: "",
    assigner: ""
  });

  useEffect(() => {
    fetch("http://localhost:8007/api/showproduct")
      .then(res => res.json())
      .then(data => setProducts(data.data));

    fetch(`http://localhost:8007/api/editCustomer/${id}`)
      .then(res => res.json())
      .then(data => {
        const lead = data.data;
        setFormData({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          productId: lead.product?._id || "",
          nextFollowup: lead.nextFollowup?.slice(0, 10),
          remark: lead.remark,
          status: lead.status,
          assigner: lead.assigner
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8007/api/UpdateCustomer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert("Customer updated successfully!");
        navigate("/Customer");
      });
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="edit-header">
          <h2>Edit Customer</h2>
          <Link to="/Customer" className="back-btn">← View Customers</Link>
        </div>
        <form onSubmit={handleUpdate} className="edit-form">
          <label>
            Name:
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Email:
            <input name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Phone:
            <input name="phone" value={formData.phone} onChange={handleChange} required />
          </label>

          <label>
            Product:
            <select name="productId" value={formData.productId} onChange={handleChange} required>
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.title} ₹{p.Price}</option>
              ))}
            </select>
          </label>

          <label>
            Remark:
            <input name="remark" value={formData.remark} onChange={handleChange} />
          </label>

          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="InActive">InActive</option>
              <option value="Blocked">Blocked</option>
              <option value="Active">Active</option>
              <option value="Converted">Converted</option>
            </select>
          </label>

          <label>
            Assign To:
            <select name="assigner" value={formData.assigner} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="teleCaller">TeleCaller</option>
              <option value="sales">Sales</option>
              <option value="Supporter">Supporter</option>
            </select>
          </label>

          <label>
            Next FollowUp:
            <input type="date" name="nextFollowup" value={formData.nextFollowup} onChange={handleChange} />
          </label>

          <button type="submit" className="submit-btn">Update Customer</button>
        </form>
      </div>
    </div>
  );
}
