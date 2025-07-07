import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../Style/Lead.css";
import SideBar from "./SideBar";

export default function ViewLeads() {
  const [showLeads, setShowLeads] = useState([]);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewLead")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setShowLeads(data.data);
        localStorage.setItem("Lead", JSON.stringify(data.data));
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideMenu = e.target.closest(".menu-wrapper");
      if (!isInsideMenu) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpen(open === id ? null : id);
  };

  const handleDelete = (_id) => {
    fetch(`http://localhost:8007/api/DeleteLead/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowLeads((prev) => prev.filter((lead) => lead._id !== _id));
      });
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <main className="main-content">
        <div className="header">
          <h1 style={{ margin: 0 }}>All Leads</h1>
          <Link to="/AddLead" className="addLeadBtn">➕ Add Lead</Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th><i className="ri-arrow-up-down-line"></i> Company</th>
              <th><i className="ri-arrow-up-down-line"></i> Phone</th>
              <th><i className="ri-arrow-up-down-line"></i> Product</th>
              <th><i className="ri-arrow-up-down-line"></i> Status</th>
              <th><i className="ri-arrow-up-down-line"></i> Assigner</th>
              <th><i className="ri-arrow-up-down-line"></i> Actions</th>
            </tr>
          </thead>
          <tbody>
            {showLeads.map((v) => {
              const imageUrl=v.companies?.Image?.startsWith('http')
              ?v.companies?.Image
              :`http://localhost:8007${v.companies?.Image}`;
               const imageUrls=v.Image?.startsWith('http')
              ?v.Image
              :`http://localhost:8007${v.Image}`
              return (
              <tr key={v._id}>
                <td><span style={{display:"flex",alignItems:"center",justifyContent:'center'}}><img src={imageUrls} alt="" style={{width:"35px",height:'35px',borderRadius:'50%',alignItems:'center',marginRight:"10px"}}/>{v.name}</span></td>
                <td style={{display:"flex",alignItems:'center',justifyContent:'center'}}><img src={imageUrl} alt={v.companies?.name}style={{width:"35px",height:"35px",borderRadius:"50%",marginRight:"10px"}} />{v.companies?.name}</td>
                <td>+91{v.phone}</td>
                <td>{v.product?.title} - ₹{v.product?.Price}</td>
                <td className="status-ceil">
                  <span className={`status-badge ${v.status?.toLowerCase().replace(/\s/g, '-')}`}>
                    {v.status}
                  </span>
                </td>
                <td>{v.role}</td>
                <td style={{ position: "relative" }} className="menu-wrapper">
                  <i
                    className="ri-more-2-line"
                    onClick={() => toggleMenu(v._id)}
                    style={{ cursor: "pointer" }}
                  ></i>

                  {open === v._id && (
                    <div className="Menu">
                      <div className="menuBtn">
                        <Link to={`/LeadDetails/${v._id}`}>
                          <span><i className="ri-eye-fill"></i> View</span>
                        </Link>
                      </div>
                      <div className="menuBtn">
                        <span onClick={() => navigate(`/EditLead/${v._id}`)}>
                          <i className="ri-edit-line"></i> Edit
                        </span>
                      </div>
                      <div className="menuBtn">
                        <span onClick={() => handleDelete(v._id)}>
                          <i className="ri-delete-bin-6-line"></i> Delete
                        </span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
              )
})}
          </tbody>
        </table>
      </main>
    </div>
  );
}
