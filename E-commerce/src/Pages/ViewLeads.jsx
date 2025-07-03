import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";

export default function ViewLeads() {
  const [showLeads, setShowLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewLead")
      .then((res) => res.json())
      .then((data) => {
        setShowLeads(data.data);
        localStorage.setItem("Lead", JSON.stringify(data.data));
      });
  }, []);

  const handleDelete = (_id) => {
    fetch(`http://localhost:8007/api/DeleteLead/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setShowLeads((pre) => pre.filter((lead) => lead._id !== _id));
      });
  };

  const handleConvert = (_id) => {
    fetch(`http://localhost:8007/api/AddConvert/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Converted Successfully");
        setShowLeads((pre) =>
          pre.map((lead) =>
            lead._id === _id ? { ...lead, status: "Converted" } : lead
          )
        );
      });
  };

  return (
    <>
      <div className="viewleads-container">
      <SideBar/>
        {/* Main Content */}
        <main className="main-content">
          <div className="header">
            <h1 style={{ margin: 0 }}>All Leads</h1>
            <Link to="/AddLead" className="addLeadBtn">➕ Add Lead</Link>
          </div>

          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Next Follow-up</th>
                <th>Remark</th>
                <th>Status</th>
                <th>Assigner</th>
                <th colSpan={4}>Actions</th>
                <th>Quatation</th>
              </tr>
            </thead>
            <tbody>
              {showLeads.map((v) => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td>{v.product?.title} - ₹{v.product?.Price}</td>
                  <td>{new Date(v.nextFollowup).toLocaleDateString()}</td>
                  <td>{v.remark}</td>
                  <td>{v.status}</td>
                  <td>{v.role}</td>
                  <td><button className="btn btn-edit" onClick={() => navigate(`/EditLead/${v._id}`)}>✏️</button></td>
                  <td><button className="btn btn-delete" onClick={() => handleDelete(v._id)}>🗑️</button></td>
                  <td><button className="btn btn-follow" onClick={() => navigate(`/FollowUp/${v._id}`)}>📞</button></td>
                  <td>
                    {v.status === "Converted" ? (
                      <span className="converted">✔️</span>
                    ) : (
                      <button className="btn btn-convert" onClick={() => handleConvert(v._id)}>Convert</button>
                    )}
                  </td>
                  <td>
                  
                      <Link to={`/Quotation/${v._id}`}>Add </Link>
                    
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
