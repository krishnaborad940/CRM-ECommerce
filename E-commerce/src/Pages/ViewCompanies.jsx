import { useEffect, useState } from "react"
import SideBar from "../Pages/SideBar"
import "../Style/Lead.css"
import { Link, useNavigate } from "react-router-dom"
import Header from "./Header"

export default function ViewCompanies() {
  const [showCompanies, setShowCompanies] = useState([])
  const [modalData, setModalData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [open, setOpen] = useState(null)
  const [planFilter, setPlanFilter] = useState("") ;
  const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");


  // ✅ Filtering by search & plan
  const filteredCompanies = showCompanies.filter((company) => {
    const matchesPlan = planFilter ? company.Plan === planFilter : true;
    const name = company?.name?.toLowerCase() || "";
    const email = company?.email?.toLowerCase() || "";
    const search = searchTerm?.toLowerCase() || "";

    const matchesSearch = name.includes(search) || email.includes(search);
    return matchesPlan && matchesSearch;
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideMenu = e.target.closest(".menu-wrapper")
      if (!isInsideMenu) setOpen(null)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleMenu = (id) => {
    setOpen(open === id ? null : id)
  }

  const handleView = (company) => {
    setModalData(company)
    setShowModal(true)
  }

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewCompanies")
      .then(res => res.json())
      .then((data) => {
        setShowCompanies(data.data)
      })
  }, [])

  const handleDelete = (_id) => {
    fetch(`http://localhost:8007/api/DeleteCompanies/${_id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setShowCompanies(prev => prev.filter(v => v._id !== _id))
      })
  }

  // const filteredCompanies = showCompanies.filter((company) => {
  //   return planFilter ? company.Plan === planFilter : true
  // })

  return (
    <>
      <div className="container-scroller">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="container-fluid page-body-wrapper">
          <SideBar />
          <div className="main-panel" style={{ marginLeft: '250px', marginTop: '40px' }}>
            <div className="content-wrapper">
              <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'700px',fontSize:'18px'}}>  All Companies</div>
               <Link to="/add-companies" className="btn btn-primary " style={{padding:'10px 10px'}}>➕ Add Companies</Link>
                  
              <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="form-select text-dark ms-2 p-2"
                    style={{ width: "180px" }}
                  >
                    <option value="">⏳Filter</option>
                    <option value="Basic">Basic</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
              
              </div>
             

              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card2 w-100">
                    <div className="card-body2" style={{ margin: '10px' }}>
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>AccountUrl</th>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCompanies.length === 0 ? (
                            <tr>
                              <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                                Data Not Found
                              </td>
                            </tr>
                          ) : (
                            filteredCompanies.map((v) => {
                              const ImageUrl = v.Image?.startsWith('http')
                                ? v.Image
                                : `http://localhost:8007${v.Image}`
                              return (
                                <tr key={v._id}>
                                  <td style={{ display: "flex", alignItems: "center" }}>
                                    <img src={ImageUrl} alt={v.name} style={{ width: "35px", height: "35px", borderRadius: "50%", marginRight: "10px" }} />
                                    {v.name}
                                  </td>
                                  <td>{v.email}</td>
                                  <td>{v.AccountUrl}</td>
                                  <td>{v.Plan}</td>
                                  <td className="statusCeil">
                                    <span className={`status-badge ${v.status}`}> {v.status} </span>
                                  </td>
                                  <td style={{ position: "relative" }} className="menu-wrapper">
                                    <i
                                      className="ri-more-2-line"
                                      onClick={() => toggleMenu(v._id)}
                                      style={{ cursor: "pointer" }}
                                    ></i>

                                    {open === v._id && (
                                      <div className="Menu">
                                        <div className="menuBtn" style={{ color: 'grey' }}>
                                          
                                          <a href=""onClick={() => navigate(`/companies-details/${v._id}`)}><i className="ri-eye-fill" style={{ fontSize: "14px" }}></i> View</a>
                                        </div>

                                        <div className="menuBtn">
                                          <a onClick={() => navigate(`/add-companies/${v._id}`)}> <i className="ri-edit-line"></i> Edit</a>
                                        </div>
                                        <div className="menuBtn">
                                          <a onClick={() => handleDelete(v._id)}><i className="ri-delete-bin-line"></i> Delete</a>
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal */}
              {showModal && modalData && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <img
                      src={`http://localhost:8007${modalData.Image}`}
                      alt={modalData.name}
                      style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px" }}
                    />

                    <div className="modal-details">
                      <div className="modal-column">
                        <p><strong>Name:</strong> {modalData.name}</p>
                        <p><strong>Phone:</strong> {modalData.Phone}</p>
                        <p><strong>Account URL:</strong> {modalData.AccountUrl}</p>
                        <p><strong>Plan:</strong> {modalData.Plan} ({modalData.PlanType})</p>
                      </div>
                      <div className="modal-column">
                        <p><strong>Email:</strong> {modalData.email}</p>
                        <p><strong>Website:</strong> {modalData.website}</p>
                        <p><strong>Status:</strong> {modalData.status === 'Active'
                          ? <span style={{ color: "green" }}>{modalData.status}</span>
                          : <span style={{ color: "#721c24" }}>{modalData.status}</span>}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
