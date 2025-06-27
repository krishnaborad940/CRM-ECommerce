import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; // Make sure CSS is correctly imported
import SideBar from "./SideBar";

export default function AddLead() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productId: "",
    nextFollowup: "",
    remark: "",
    status: "New",
    assigner:"",
    role:"teleCaller",
  });

  const navigate = useNavigate();
useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    setFormData((prev) => ({ ...prev, assigner: userId }));
  }
}, []);
  useEffect(() => {
    fetch("http://localhost:8007/api/showproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
  }, []);

  useEffect(()=>{
    let addLead=JSON.parse(localStorage.getItem("Lead"))
    setFormData(addLead)
  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8007/api/AddLead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.status === 200) {
      alert("Lead added successfully");
      navigate("/viewLeads");
    } else {
      alert("Error: " + data.msg);
    }
  };

  return (
    <div className="addlead-container">
     <SideBar/>

      <main className="main-section">
        <div className="form-header">
          <h2>➕ Add New Lead</h2>
          <Link to="/viewLeads" className="view-link">📄 View All Leads</Link>
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          <label>Name
            <input type="text" name="name" required onChange={handleChange} />
          </label>

          <label>Email
            <input type="email" name="email" required onChange={handleChange} />
          </label>

          <label>Phone
            <input type="text" name="phone" required onChange={handleChange} />
          </label>

          <label>Product
            <select name="productId" required onChange={handleChange}>
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} - ₹{p.Price}
                </option>
              ))}
            </select>
          </label>

          <label>Next Follow-up
            <input type="date" name="nextFollowup" onChange={handleChange} />
          </label>

          <label>Remark
            <input type="text" name="remark" onChange={handleChange} />
          </label>

          <label>Status
            <select name="status" onChange={handleChange}>
              <option value="New">New</option>
              <option value="Follow-Up">Follow-Up</option>
              <option value="Intrested">Intrested</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <label>Assign To
            <select name="role" onChange={handleChange}>
              <option value="teleCaller">TeleCaller</option>
              <option value="sales">Sales</option>
              <option value="Supporter">Supporter</option>
            </select>
          </label>

          <button type="submit" className="submit-btn">Add Lead</button>
        </form>
      </main>
    </div>
  );
}
