import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; // Make sure CSS is correctly imported
import SideBar from "./SideBar";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export default function AddLead() {
  const [products, setProducts] = useState([]);
  // const [formData, setFormData] = useState({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       productId: "",
  //       nextFollowup: "",
  //       remark: "",
  //       status: "New",
  //       assigner:"",
  //       role:"teleCaller",
  //     });

      const navigate = useNavigate();
              useEffect(() => {
                const userId = localStorage.getItem("userId");
                if (userId) {
                  setValue((prev) => ({ ...prev, assigner: userId }));
                }
    }, []);
    const  schema=yup.object().shape({
      name:yup.string().required("Name Is Required"),
      email:yup.string().required("Email Is Required"),
      phone:yup.string().required("Phone Number Is Required"),
      productId:yup.string().required("Please Select Product"),
      status:yup.string().required("Please Select Status"),
      nextFollowup:yup.date().required("Please Select Next FollowUp Date"),
      remark:yup.string().required("Remark Is Required"),
      role:yup.string().required("Please Select Assigner"),
    })
    const {
      register,
      handleSubmit,
      setValue,
      formState:{errors},
    }=useForm({resolver:yupResolver(schema)})
      useEffect(() => {
        fetch("http://localhost:8007/api/showproduct")
          .then((res) => res.json())
          .then((data) => setProducts(data.data || []));
      }, []);
      // const handleChange = (e) => {
      //   const { name, value } = e.target;
      //   setFormData((prev) => ({ ...prev, [name]: value }));
      // };
      const onsubmit = async (data) => {
            // e.preventDefault();
            const res = await fetch("http://localhost:8007/api/AddLead", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
        });
        const data1 = await res.json();
            if (res.status === 200) {
              // alert("Lead added successfully");
              navigate("/viewLeads");
            } else {
              alert("Error: " + data1.msg);
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

                <form className="lead-form" onSubmit={handleSubmit(onsubmit)}>
                      <label>Name
                        <input type="text" name="name" {...register('name')}/>
                        {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
                      </label>

                      <label>Email
                        <input type="email" name="email" {...register('email')}/>
                        {errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
                      </label>

                      <label>Phone
                        <input type="text" name="phone" {...register('phone')} />
                        {errors.phone && <p style={{color:'red'}}>{errors.phone.message}</p>}
                      </label>

                      <label>Product
                        <select name="productId" {...register('productId')}>
                          <option value="">Select Product</option>
                          {products.map((p) => (
                            <option key={p._id} value={p._id}>
                              {p.title} - ₹{p.Price}
                            </option>
                          ))}
                        </select>
                        {errors.productId && <p style={{color:'red'}}>{errors.productId.message}</p>}
                      </label>

                      <label>Next Follow-up
                        <input type="date" name="nextFollowup" {...register('nextFollowup')} />
                        {errors.nextFollowup && <p style={{color:'red'}}>{errors.nextFollowup.message}</p>}
                      </label>

                      <label>Remark
                        <input type="text" name="remark" {...register('remark')}/>
                        {errors.remark && <p style={{color:'red'}}>{errors.remark.message}</p>}
                      </label>

                      <label>Status
                        <select name="status" {...register('status')}>
                          <option value="">--select--</option>
                          <option value="New">New</option>
                          <option value="Follow-Up">Follow-Up</option>
                          <option value="Intrested">Intrested</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                        {errors.status && <p style={{color:'red'}}>{errors.status.message}</p>}
                      </label>

                      <label>Assign To
                        <select name="role" {...register('role')}>
                          <option value="">--select--</option>
                          <option value="teleCaller">TeleCaller</option>
                          <option value="sales">Sales</option>
                          <option value="Supporter">Supporter</option>
                        </select>
                        {errors.role && <p style={{color:'red'}}>{errors.role.message}</p>}
                      </label>

                      <button type="submit" className="submit-btn">Add Lead</button>
                </form>
          </main>
    </div>
  );
}
