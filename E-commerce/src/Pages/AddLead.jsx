import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "./Header";

export default function AddLead() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [role, setRole] = useState(""); // 👈 Role selected by user

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    productId: yup.string().required("Please select a product"),
    nextFollowup: yup.date().required("Next Follow-Up Date is required"),
    remark: yup.string().required("Remark is required"),
    status: yup.string().required("Please select status"),
    role: yup.string().required("Please select role"),
    assigner: yup.string().required("Please select assigner"),
    companies: yup.string().required("Please select company"),
  });

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    fetch("http://localhost:8007/api/showproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewCompanies")
      .then((res) => res.json())
      .then((data) => setCompaniesList(data.data || []));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8007/api/AllUser")
      .then((res) => res.json())
      .then((data) => setUsers(data.data || []));
  }, []);

  useEffect(() => {
    const filtered = users.filter((u) => u.role === role);
    setFilteredUsers(filtered);
  }, [role, users]);

  const onSubmit = async (data) => {
    const fileInput = document.querySelector('input[name="Image"]');
    if (!fileInput || fileInput.files.length === 0) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("productId", data.productId);
    formData.append("nextFollowup", data.nextFollowup);
    formData.append("remark", data.remark);
    formData.append("status", data.status);
    formData.append("role", role); // from selected role
    formData.append("assigner", data.assigner); // from assigner dropdown
    formData.append("companies", data.companies);
    formData.append("Image", fileInput.files[0]);

    const res = await fetch("http://localhost:8007/api/AddLead", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (res.status === 200) {
      navigate("/view-leads");
    } else {
      alert("Error: " + result.msg);
    }
  };

  return (
    <div className="container-scroller">
      <Header />
       <div className="container-fluid page-body-wrapper">
        <SideBar/>
      <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
        <div className="content-wrapper">
    
          <div class="page-header" >
              <h3 class="page-title" style={{marginLeft:'60px'}}>➕ Add New Lead </h3>
              
                <a class="btn-gradient-primary p-2 rounded "  style={{textDecoration:'none'}}>
                   <Link to="/view-leads" style={{color:'white',textDecoration:'none'}}>
            📄 View All Leads
          </Link>
                </a>
            </div>
         <div >
          <div>
           {/* <h2></h2> */}
        
             <form className="lead-form" onSubmit={handleSubmit(onSubmit)}>
          <label>Name
            <input type="text" {...register("name")} />
            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
          </label>

          <label>Email
            <input type="email" {...register("email")} />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          </label>

          <label>Phone
            <input type="text" {...register("phone")} />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
          </label>

          <label>Product
            <select {...register("productId")}>
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} - ₹{p.Price}
                </option>
              ))}
            </select>
            {errors.productId && <p style={{ color: "red" }}>{errors.productId.message}</p>}
          </label>

          <label>Next Follow-up
            <input type="date" {...register("nextFollowup")} />
            {errors.nextFollowup && <p style={{ color: "red" }}>{errors.nextFollowup.message}</p>}
          </label>

          <label>Remark
            <input type="text" {...register("remark")} />
            {errors.remark && <p style={{ color: "red" }}>{errors.remark.message}</p>}
          </label>

          <label>Status
            <select {...register("status")}>
              <option value="">--select--</option>
              <option value="New">New</option>
              <option value="Follow-Up">Follow-Up</option>
              <option value="Intrested">Intrested</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.status && <p style={{ color: "red" }}>{errors.status.message}</p>}
          </label>

          <label>Role
            <select {...register("role")} onChange={(e) => setRole(e.target.value)}>
              <option value="">--select--</option>
              <option value="teleCaller">TeleCaller</option>
              <option value="sales">Sales</option>
              <option value="Supporter">Supporter</option>
            </select>
            {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
          </label>

          {role && (
            <label>Assign To
              <select {...register("assigner")}>
                <option value="">--select--</option>
                {filteredUsers.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.assigner && <p style={{ color: "red" }}>{errors.assigner.message}</p>}
            </label>
          )}

          <label>Company
            <select {...register("companies")}>
              <option value="">--select--</option>
              {companiesList.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.companies && <p style={{ color: "red" }}>{errors.companies.message}</p>}
          </label>

          <label>Upload Image
            <input type="file" name="Image" />
          </label>

          <button type="submit" className="submit-btn btn-gradient-primary ">Add Lead</button>
        </form>
         </div>
         </div>
        </div>

     
      </div>
</div>
    </div>

  );
}
