import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";
import "../App.css"; // CSS file import

export default function EditLead() {
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
    role: "",
  });

  useEffect(() => {
    fetch("http://localhost:8007/api/showproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));

    fetch(`http://localhost:8007/api/EditLead/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const lead = data.data;
        setFormData({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          productId: lead.product?._id || "",
          nextFollowup: lead.nextFollowup?.slice(0, 10),
          remark: lead.remark,
          status: lead.status,
          role: lead.role || "",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8007/api/UpdateLead/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Lead updated successfully!");
        navigate("/ViewLeads");
      });
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="edit-header">
          <h2>Edit Lead</h2>
          <Link to="/ViewLeads" className="back-btn">← View Leads</Link>
        </div>

        <form onSubmit={handleUpdate} className="edit-form">
          <label>Name:
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>Email:
            <input name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>Phone:
            <input name="phone" value={formData.phone} onChange={handleChange} required />
          </label>

          <label>Product:
            <select name="productId" value={formData.productId} onChange={handleChange} required>
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.title} ₹{p.Price}</option>
              ))}
            </select>
          </label>

          <label>Next Follow-Up:
            <input type="date" name="nextFollowup" value={formData.nextFollowup} onChange={handleChange} />
          </label>

          <label>Remark:
            <input name="remark" value={formData.remark} onChange={handleChange} />
          </label>

          <label>Status:
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="New">New</option>
              <option value="Follow-Up">Follow-Up</option>
              <option value="Interested">Interested</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <label>Assign To:
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="teleCaller">TeleCaller</option>
              <option value="sales">Sales</option>
              <option value="Supporter">Supporter</option>
            </select>
          </label>

          <button type="submit" className="submit-btn">Update Lead</button>
        </form>
      </div>
    </div>
  );
}
