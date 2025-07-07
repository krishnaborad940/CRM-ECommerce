import { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddCompanies() {
  const [companies, setCompanies] = useState({
    name: '', email: '', Phone: '', Image: null,
    Plan: '', PlanType: '', website: '', AccountUrl: '', status: ''
  });

  const [existingImage, setExistingImage] = useState(null); // ✅ For editing mode
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ UseParams as a function

  // ✅ Load data if in Edit mode
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8007/api/EditCompanies/${id}`)
        .then(res => res.json())
        .then(data => {
          const c = data.data;
          setCompanies({
            name: c.name,
            email: c.email,
            Phone: c.Phone,
            Image: null, // 👈 Don't prefill file
            Plan: c.Plan,
            PlanType: c.PlanType,
            website: c.website,
            AccountUrl: c.AccountUrl,
            status: c.status
          });
          setExistingImage(c.Image); // ✅ Save existing image
        });
    }
  }, [id]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setCompanies(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in companies) {
      formData.append(key, companies[key]);
    }

    const url = id
      ? `http://localhost:8007/api/UpdateCompanies/${id}`
      : `http://localhost:8007/api/AddCompanies`;

    fetch(url, {
      method: id ? "PUT" : "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert(id ? "Company updated successfully!" : "Company added successfully!");
        navigate('/view-companies');
      });
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Name:</label>
          <input type="text" name='name' value={companies.name} onChange={onChange} required /><br />

          <label>Email:</label>
          <input type="email" name='email' value={companies.email} onChange={onChange} required /><br />

          <label>Phone:</label>
          <input type="number" name='Phone' value={companies.Phone} onChange={onChange} required /><br />

          <label>Account URL:</label>
          <input type="text" name='AccountUrl' value={companies.AccountUrl} onChange={onChange} /><br />

          <label>Website:</label>
          <input type="text" name='website' value={companies.website} onChange={onChange} /><br />

          <label>Plan:</label>
          <select name="Plan" value={companies.Plan} onChange={onChange}>
            <option value="">--select--</option>
            <option value="Advanced">Advanced</option>
            <option value="Basic">Basic</option>
            <option value="EnterPrise">EnterPrise</option>
          </select><br />

          <label>Plan Type:</label>
          <select name="PlanType" value={companies.PlanType} onChange={onChange}>
            <option value="">--select--</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select><br />

          <label>Status:</label>
          <input
            type="radio"
            name='status'
            value="Active"
            checked={companies.status === 'Active'}
            onChange={onChange}
          /> Active
          <input
            type="radio"
            name='status'
            value="InActive"
            checked={companies.status === 'InActive'}
            onChange={onChange}
          /> InActive
          <br />

          <label>Image:</label>
          <input type="file" name="Image" onChange={onChange} /><br />

          {/* ✅ Show existing image preview if editing */}
          {existingImage && !companies.Image && (
            <img
              src={`http://localhost:8007${existingImage}`}
              alt="Existing Preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}

          {/* ✅ Show new uploaded image preview */}
          {companies.Image && (
            <img
              src={URL.createObjectURL(companies.Image)}
              alt="New Upload Preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}

          <br />
          <input type="submit" value={id ? "Update" : "Add"} />
        </form>
      </div>
    </div>
  );
}
