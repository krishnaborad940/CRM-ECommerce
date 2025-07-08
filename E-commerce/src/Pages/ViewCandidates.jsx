import { useEffect, useState } from 'react';
import SideBar from '../Pages/SideBar';
import '../App.css';
import { Link } from 'react-router-dom';

export default function ViewCandidates() {
  const [showData, setShowData] = useState([]);
  const [open,setOpen]=useState(null)

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewCandidate")
      .then((res) => res.json())
      .then((data) => {
        setShowData(data.data || []);
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

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
            <div className="header">
                        <h1 style={{ margin: 0 }}>🤵All Candidates</h1>
                        <Link to="/Candidate" className="addQuotationBtn">➕ Add Candidate</Link>
                     </div>
        {/* Candidate Table */}
        <div >
          <table >
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Experience</th>
                <th>Education</th>
                <th>Skils</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {showData.map((v, i) => (
                <tr key={i}>
                   <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{v.profileImage && <img src={`http://localhost:8007${v.profileImage}`} alt="Profile" width="50" style={{width:'35px',height:'35px',borderRadius:"50%",marginRight:'10px'}} />}{v.Fname} {v.Lname}</span></td>
                  <td>{v.city}</td>
                    <td>{v.experience}</td>
                  <td>{v.education}</td>
                  <td>{v.skills}</td>
                  <td>{v.source}</td>
                  {/* <td><Link to={`/candidate-details/${v._id}`}>View</Link></td> */}
                   <td style={{ position: "relative" }} className="menu-wrapper">
                  <i
                    className="ri-more-2-line"
                    onClick={() => toggleMenu(v._id)}
                    style={{ cursor: "pointer" }}
                  ></i>

                  {open === v._id && (
                    <div className="Menu">
                      <div className="menuBtn">
                        <Link to={`/candidate-details/${v._id}`}>
                          <span><i className="ri-eye-fill"></i> View</span>
                        </Link>
                      </div>
                      {/* <div className="menuBtn">
                        <span onClick={() => navigate(`/EditLead/${v._id}`)}>
                          <i className="ri-edit-line"></i> Edit
                        </span>
                      </div>
                      <div className="menuBtn">
                        <span onClick={() => handleDelete(v._id)}>
                          <i className="ri-delete-bin-6-line"></i> Delete
                        </span>
                      </div> */}
                    </div>
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
