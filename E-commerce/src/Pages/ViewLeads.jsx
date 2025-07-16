import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../Style/Lead.css";
import SideBar from "./SideBar";
import Header from "./Header";

export default function ViewLeads() {
  const [showLeads, setShowLeads] = useState([]);
  const [open, setOpen] = useState(null);
    const [planFilter, setPlanFilter] = useState("") 
  const navigate = useNavigate();
  const [searchTerm,setSearchTerm]=useState('')

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewLead")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
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
  const filteredLeads=showLeads.filter((Lead)=>{
      const matchLead=planFilter ? Lead.status === planFilter :true
      const name=Lead?.name?.toLowerCase() || ''
      const companyName=Lead?.companies?.name?.toLowerCase() || ''

      const serach=searchTerm?.toLowerCase() || ''
      const matchSearch=name.includes(serach) || companyName.includes(serach)
      return matchLead && matchSearch
      
  })

  //  const filteredLeads = showLeads.filter((Lead) => {
  //   return planFilter ? Lead.status === planFilter : true
  // })

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
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
          <div className="content-wrapper">
             <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'700px',fontSize:'18px'}}>  All Leads</div>
              <Link to="/add-lead" className="btn btn-primary " style={{padding:'10px 12px'}}>
                        ➕ Add Lead
                      </Link>
              <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="form-select text-dark  p-2"
                    style={{ width: "180px" }}
                  >
                     <option value="" >⏳Filter</option>
                      <option value="New">New</option>
                      <option value="Follow-Up">Follow-Up</option>
                      <option value="Intrested">Intrested</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                  </select>
              
              </div>
            

            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card2 p-2 w-100">
                  <div className="card-body2 mb-2">
                    <div className="header d-flex justify-content-between align-items-center mb-3">
                      {/* <h4 className="card-title m-0">Leads Table</h4> */}
                      
                    </div>

                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Company</th>
                          <th>Phone</th>
                          <th>Product</th>
                          <th>Status</th>
                          <th>Lead Owner</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                       {filteredLeads.length ===0 ?(
<tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                              Data Not Found
                            </td>
                          </tr>
                       ):( filteredLeads.map((v) => {
                          const companyImg = v.companies?.Image?.startsWith("http")
                            ? v.companies.Image
                            : `http://localhost:8007${v.companies?.Image}`;
                          const leadImg = v.Image?.startsWith("http")
                            ? v.Image
                            : `http://localhost:8007${v.Image}`;
                          const assignerImg = v.assigner?.Image?.startsWith("http")
                            ? v.assigner.Image
                            : `http://localhost:8007${v.assigner?.Image}`;

                          return (
                            <tr key={v._id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={leadImg}
                                    alt=""
                                    className="rounded-circle"
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      marginRight: "10px",
                                    }}
                                  />
                                  {v.name}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={companyImg}
                                    alt={v.companies?.name}
                                    className="rounded-circle"
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      marginRight: "10px",
                                    }}
                                  />
                                  {v.companies?.name}
                                </div>
                              </td>
                              <td>+91{v.phone}</td>
                              <td>
                                {v.product?.title} - ₹{v.product?.Price}
                              </td>
                            <td className="status-ceil badge ">
                                  <span className={`status-badge ${v.status?.toLowerCase().replace(/\s/g, '-')}`}>
                               {v.status}
                             </span>
                          </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={assignerImg}
                                    alt=""
                                    className="rounded-circle"
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      marginRight: "10px",
                                    }}
                                  />
                                  {v.assigner?.name}
                                </div>
                              </td>
                              <td className="menu-wrapper" style={{ position: "relative" }}>
                                <i
                                  className="ri-more-2-line"
                                  onClick={() => toggleMenu(v._id)}
                                  style={{ cursor: "pointer" }}
                                ></i>

                                {open === v._id && (
                                  <div className="Menu position-absolute bg-white shadow p-2 rounded">
                                    <div className="menuBtn mb-1">
                                      <Link to={`/lead-details/${v._id}`} style={{color:'grey',textDecoration:'none'}}>
                                        <i className="ri-eye-fill"></i> View
                                      </Link>
                                    </div>
                                    <div
                                      className="menuBtn mb-1" style={{color:'grey',textDecoration:'none'}}
                                      onClick={() => navigate(`/edit-lead/${v._id}`)}
                                    >
                                      <i className="ri-edit-line"></i> Edit
                                    </div>
                                    <div className="menuBtn text-danger d-flex" onClick={() => handleDelete(v._id)}>
                                      <i className="ri-delete-bin-6-line me-1"></i> Delete
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                       )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
