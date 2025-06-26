import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCustomer() {
  const { id } = useParams(); // get lead id from URL
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
    assigner:""
  });

  // ✅ Fetch all products for dropdown
  const getProducts = async () => {
    const res = await fetch("http://localhost:8007/api/showproduct");
    const data = await res.json();
    setProducts(data.data);
  };

  // ✅ Fetch lead data by ID
  const getLead = async () => {
    const res = await fetch(`http://localhost:8007/api/editCustomer/${id}`);
    const data = await res.json();
    const lead = data.data;
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      productId: lead.product._id,
      nextFollowup: lead.nextFollowup?.slice(0, 10),
      remark: lead.remark,
      status: lead.status,
      assigner:lead.assigner
    });
  };

  useEffect(() => {
    getProducts();
    getLead();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update lead
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8007/api/UpdateCustomer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Customer updated successfully!");
        navigate("/Customer");
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <a href="/Customer">View Customer</a>
      <h1>Edit Customer</h1>
      <form onSubmit={handleUpdate} style={{ marginLeft: "600px" }}>
        <table border={1}>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Product</td>
              <td>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}, ₹{p.Price}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            {/* <tr>
              <td>Next Follow-up</td>
              <td>
                <input
                  type="date"
                  name="nextFollowup"
                  value={formData.nextFollowup}
                  onChange={handleChange}
                />
              </td>
            </tr> */}
            <tr>
              <td>Remark</td>
              <td>
                <input
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="InActive">InActive</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Active">Active</option>
                  <option value="Converted">Converted</option>
                </select>
              </td>
            </tr>
            <tr>
                <td>Assign To</td>
                <td>
            <select name="assigner" value={formData.assigner} onChange={handleChange}>
                <option value="">--select--</option>
              <option value="teleCaller">TeleCaller</option>
              <option value="sales">Sales</option>
              <option value="Supporter">Supporter</option>
            </select>
          </td>
            </tr>
            <tr>
                <td>Next FollowUp</td>
                <td><input type="date" name="nextFollowup" value={formData.nextFollowup} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">Update Lead</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
