import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../Style/Lead.css";
import SideBar from "./SideBar";
import Header from "./Header";

export default function ViewNote() {
  const [showNotes, setShowNotes] = useState([]);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const [planList,setPlanList]=useState('')
    const [searchTerm, setSearchTerm] = useState("");
  const filterNote=showNotes.filter((notes)=>{
    const matchPlan= planList?notes.noteType===planList:true;
    const name =notes?.candidate?.Fname?.toLowerCase() || "";
    const search = searchTerm?.toLowerCase() || "";

    const matchesSearch = name.includes(search) 
    return matchPlan && matchesSearch;
  })

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewNote")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setShowNotes(data.data);
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
    fetch(`http://localhost:8007/api/DeleteNote/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowNotes((prev) => prev.filter((lead) => lead._id !== _id));
      });
  };

  return (
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
          <div className="content-wrapper">
            <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'800px',fontSize:'18px'}}>  All Note</div>
               <Link to="/add-notes" className="btn btn-primary" style={{padding:'11px 12px'}}>
                                    ➕ Add Note
                                </Link>
              <select
                    value={planList}
                    onChange={(e) => setPlanList(e.target.value)}
                    className="form-select text-dark  p-2"
                    style={{ width: "180px" }}
                  >
                    <option value="">⏳Filter</option>
                     <option value="Interview">InterView</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Document">Document</option>
                         <option value="Feedback">Feedback</option>
                          <option value="Reminder">Reminder</option>
                           <option value="Offer">Offer</option>
                            <option value="Rejection">Rejection</option>
                             <option value="Shortlist">Shortlist</option>
                              <option value="Verification">Verification</option>
                               <option value="Other">Other</option>
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
                          <th>Title</th>
                          <th>Description</th>
                          <th>Candidate</th>
                          <th>Notes Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                       {filterNote.length === 0? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                              Data Not Found
                            </td>
                          </tr>
                       ):(filterNote.map((v) => {
                        
                          const leadImg = v.Image?.startsWith("http")
                            ? v.Image
                            : `http://localhost:8007${v.Image}`;
                          const assignerImg = v.candidate?.profileImage?.startsWith("http")
                            ? v.candidate?.profileImage
                            : `http://localhost:8007${v.candidate?.profileImage}`;

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
                                  {v.title}
                                </div>
                              </td>
                              <td>{v.description}</td>
                               <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={assignerImg}
                                    alt={v.companies?.name}
                                    className="rounded-circle"
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      marginRight: "10px",
                                    }}
                                  />
                                  {v.candidate?.Fname} {v.candidate?.Lname}
                                </div>
                              </td>
                             <td>{v.noteType}</td>
                            <td className="status-ceil badge ">
                                  <span className=" "style={{backgroundColor:'#d4edda',color:'green',padding:'5px 10px',borderRadius:'10px',marginTop:'10px',textAlign:'center'}}>
                               {v.status}
                             </span>
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
                                      <Link to={`/NoteDetails/${v._id}`} style={{color:"grey",textDecoration:'none',display:'flex'}}>
                                        <i className="ri-eye-fill"></i> View
                                      </Link>
                                    </div>
                                    <div
                                      className="menuBtn mb-1"
                                      onClick={() => navigate(`/edit-notes/${v._id}`)}
                                      style={{color:"grey",textDecoration:'none',display:'flex'}}
                                    >
                                      <i className="ri-edit-line"></i> Edit
                                    </div>
                                    <div className="menuBtn text-danger" onClick={() => handleDelete(v._id)} style={{color:"grey",textDecoration:'none',display:'flex'}}>
                                      <i className="ri-delete-bin-6-line"></i> Delete
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
