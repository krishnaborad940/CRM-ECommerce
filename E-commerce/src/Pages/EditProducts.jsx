import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";
import "../App.css"; // CSS file import
import Header from "./Header";

export default function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Price: "",
    Image: null,
    category: "",
    stock: "",
    rate: "",
    IntialStock:''
  });
 
  useEffect(() => {
    fetch("http://localhost:8007/api/showproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));

    fetch(`http://localhost:8007/api/EditProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const lead = data.data;
        setFormData({
          title: lead.title,
          description: lead.description,
          Price: lead.Price,
          category: lead.category,
          stock: lead.stock,
           rate: lead.rate,
            IntialStock: lead.IntialStock,
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
  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("Price", formData.Price);
  form.append("category", formData.category);
  form.append("stock", formData.stock);
  form.append("rate", formData.rate);
  form.append("IntialStock", formData.IntialStock);
  form.append("Image", formData.Image); // file

  fetch(`http://localhost:8007/api/UpdateProduct/${id}`, {
    method: "PUT",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
        setFormData(data.data)
      navigate("/all-product");
    });
};


  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar/>
            <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
              <div className="content-wrapper">

          <div class="page-header" >
              <h3 class="page-title" style={{marginLeft:'60px'}}>➕ Edit Lead </h3>
              <nav aria-label="breadcrumb">
                <a class=" btn btn-gradient-primary p-2 rounded " >
                   <Link to="/ViewLeads" style={{color:'white',textDecoration:'none'}}>
            ← View Leads
          </Link>
                </a>
              </nav>
            </div>
                 

                  <form onSubmit={handleUpdate} className="edit-form">
                    <label>Title:
                      <input name="title" value={formData.title} onChange={handleChange} required />
                    </label>

                    <label>Description:
                      <input name="description" value={formData.description} onChange={handleChange} required />
                    </label>

                    <label>Price:
                      <input name="Price" value={formData.Price} onChange={handleChange} required />
                    </label>


                    <label>Stock:
                      <input type="number" name="IntialStock" value={formData.IntialStock} onChange={handleChange} />
                    </label>

                    <label>Rate:
                      <input name="rate" value={formData.rate} onChange={handleChange} />
                    </label>

                    <label>Category:
                      <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">-- Select --</option>
                       <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Toys">Toys</option>
                      </select>
                    </label>
                   

                        <label htmlFor="">Image</label>
                        <input type="file" name="Image" onChange={handleChange} />
                        {formData.Image && (
                            <img
                            src={typeof formData.Image === "string" ? `http://localhost:8007${formData.Image}` : URL.createObjectURL(formData.Image)}
                            alt="Preview"
                            style={{ width: "80px", height: "80px", borderRadius: "8px", marginBottom: "10px" }}
                            />
                        )}
                    <button type="submit" className="submit-btn btn-gradient-primary">Update Lead</button>
                  </form>
              </div>
                </div>
      </div>
    
    </div>
  );
}
