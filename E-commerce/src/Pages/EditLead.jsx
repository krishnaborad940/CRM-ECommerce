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
    companies:"",
    Image:null
  });
   const [companiesList, setCompaniesList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8007/api/ViewCompanies")
      .then((res) => res.json())
      .then((data) => setCompaniesList(data.data || []));
  }, []);

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
          companies:lead.companies || "",
          Image:lead.Image || null
        });
      });
  }, [id]);

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "Image") {
    setFormData((prev) => ({ ...prev, Image: files[0] })); // Store the File object
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleUpdate = (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("phone", formData.phone);
  form.append("productId", formData.productId);
  form.append("nextFollowup", formData.nextFollowup);
  form.append("remark", formData.remark);
  form.append("status", formData.status);
  form.append("role", formData.role);
  form.append("companies", formData.companies);
  form.append("Image", formData.Image); // file

  fetch(`http://localhost:8007/api/UpdateLead/${id}`, {
    method: "PUT",
    body: form,
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
              <option value="Intrested">Intrested</option>
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
          <label>Company</label>
          <select name="companies" value={formData.companies} onChange={handleChange} id="">
            <option value="">--select--</option>
            {companiesList.map((v)=>(
              <option value={v._id}>{v.name}</option>
            ))}
          </select>

              <label htmlFor="">Image</label>
              <input type="file" name="Image" onChange={handleChange} />
              {formData.Image && (
  <img
    src={typeof formData.Image === "string" ? `http://localhost:8007${formData.Image}` : URL.createObjectURL(formData.Image)}
    alt="Preview"
    style={{ width: "80px", height: "80px", borderRadius: "8px", marginBottom: "10px" }}
  />
)}
          <button type="submit" className="submit-btn">Update Lead</button>
        </form>
      </div>
    </div>
  );
}
