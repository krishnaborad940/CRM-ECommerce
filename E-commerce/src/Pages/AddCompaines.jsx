import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';

export default function AddCompanies() {
  const [companies, setCompanies] = useState({
    name: '', email: '', Phone: '', Image: null,address:'',
    Plan: '', PlanType: '', website: '', AccountUrl: '', status: ''
  });

  const [existingImage, setExistingImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
            Image: null,
            address:c.address,
            Plan: c.Plan,
            PlanType: c.PlanType,
            website: c.website,
            AccountUrl: c.AccountUrl,
            status: c.status
          });
          setExistingImage(c.Image);
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
    <div className="container-scroller">
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <SideBar />
        <div className="main-panel" style={{ marginLeft: '250px', marginTop: '40px' }}>
          <div className="content-wrapper">

            <div className="page-header">
              <h3 className="page-title" style={{ marginLeft: '60px' }}>{id ? "✏️ Edit Company" : "🏢 Add New Company"}</h3>
              <nav aria-label="breadcrumb">
                <Link to="/view-companies" className="btn btn-gradient-primary p-3 rounded" style={{ color: "white" }}>
                  📄 View All Companies
                </Link>
              </nav>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="lead-form">
              <label>Name
                <input type="text" name='name' value={companies.name} onChange={onChange} required />
              </label>

              <label>Email
                <input type="email" name='email' value={companies.email} onChange={onChange} required />
              </label>

              <label>Phone
                <input type="number" name='Phone' value={companies.Phone} onChange={onChange} required />
              </label>
                <label>Address
                <input type="text" name='address' value={companies.address} onChange={onChange} />
              </label>

              <label>Account URL
                <input type="text" name='AccountUrl' value={companies.AccountUrl} onChange={onChange} />
              </label>

              <label>Website
                <input type="text" name='website' value={companies.website} onChange={onChange} />
              </label>

              <label>Plan
                <select name="Plan" value={companies.Plan} onChange={onChange}>
                  <option value="">--select--</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Basic">Basic</option>
                  <option value="EnterPrise">EnterPrise</option>
                </select>
              </label>

              <label>Plan Type
                <select name="PlanType" value={companies.PlanType} onChange={onChange}>
                  <option value="">--select--</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </label>

              <label>Status</label>
<div style={{ display: "flex", alignItems: "center", gap: "30px", marginTop: "10px", marginBottom: "15px" }}>
  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <input
      type="radio"
      name="status"
      value="Active"
      checked={companies.status === "Active"}
      onChange={onChange}
    />
    Active
  </label>

  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <input
      type="radio"
      name="status"
      value="InActive"
      checked={companies.status === "InActive"}
      onChange={onChange}
    />
    InActive
  </label>
</div>


              <label>Upload Logo
                <input type="file" name="Image" onChange={onChange} />
              </label>

              {existingImage && !companies.Image && (
                <img
                  src={`http://localhost:8007${existingImage}`}
                  alt="Existing Preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}

              {companies.Image && (
                <img
                  src={URL.createObjectURL(companies.Image)}
                  alt="New Upload Preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}

              <button type="submit" className="submit-btn btn-gradient-primary">
                {id ? "Update Company" : "Add Company"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
