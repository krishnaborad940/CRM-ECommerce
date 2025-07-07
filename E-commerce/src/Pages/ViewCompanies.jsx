import { useEffect, useState } from "react"
import SideBar from "../Pages/SideBar"
import "../Style/Lead.css"
import { Link, useNavigate } from "react-router-dom"
export default function ViewCompanies(){
const [showCompanies,setShowCompanies]=useState([])
const [modalData, setModalData] = useState(null);
const [showModal, setShowModal] = useState(false); 
const [open,setOpen]=useState(null)
const navigate=useNavigate()
 // Close dropdown if clicked outside
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

  // model-view
const handleView = (company) => {
  setModalData(company);
  setShowModal(true);
};
// show
useEffect(()=>{
    fetch("http://localhost:8007/api/ViewCompanies")
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        setShowCompanies(data.data)
    })
},[])

const handleDelete=(_id)=>{
    fetch(`http://localhost:8007/api/DeleteCompanies/${_id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        setShowCompanies((prev)=>prev.filter((v)=>v._id !== _id))
    })
}

    return <>
    <div className="viewleads-container">
        <SideBar/>
        <div className="main-content">
           <div className="header">
          <h1 style={{ margin: 0 }}>All Leads</h1>
          <Link to="/add-companies" className="addCompanieBtn">➕ Add Companies</Link>
        </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>AccountUrl</th>
                                <th>Plan</th>
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showCompanies.map((v)=>{
                                 const ImageUrl=v.Image?.startsWith('http')
                                ?v.Image
                                :`http://localhost:8007${v.Image}`
                                return (
                                <tr key={v._id}>
                                    <td style={{display:"flex",alignItems:"center",justifyContent:"center"}}><img src={ImageUrl}alt={v.name} style={{width:"35px",height:"35px",borderRadius:"50%",textAlign:"center",marginRight:"10px"}}/>{v.name}</td>
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
                      <div className="menuBtn">
                        <div className="menuBtn" style={{color:'grey'}} onClick={() => handleView(v)}>
                                   <i className="ri-eye-fill" style={{fontSize:"14px"}}></i> View
                                </div>
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
                                      <p ><strong>Status:</strong> {modalData.status==='Active'?<span  style={{color:"green"}}>{modalData.status}</span>:<span style={{color:"#721c24"}}>{modalData.status}</span>}</p>
                                    </div>
                                  </div>

                                  <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
                                </div>
                              </div>
                          )}

                      </div>
                      <div className="menuBtn">
                        <a onClick={() => navigate(`/add-companies/${v._id}`)}> <i className="ri-edit-line"></i> Edit</a>
                      </div>
                      <div className="menuBtn">
                        <a  onClick={() => handleDelete(v._id)} ><i class="ri-delete-bin-line"></i> Delete</a>
                      </div>
                    </div>
                  )}
                </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    </div>
    </>
}