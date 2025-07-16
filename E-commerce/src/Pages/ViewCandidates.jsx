import { useEffect, useState } from 'react';
import SideBar from '../Pages/SideBar';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function ViewCandidates() {
  const [showData, setShowData] = useState([]);
  const [open,setOpen]=useState(null);
  const [planList,setPlanList]=useState('')
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Filtering by search & plan
    const filterCandidate=showData.filter((candidate)=>{
    const matchesPlan = planList?candidate.experience===planList:true
    const name = candidate?.Fname?.toLowerCase() || "";
    const search = searchTerm?.toLowerCase() || "";

    const matchesSearch = name.includes(search) 
    return matchesPlan && matchesSearch;
  });
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
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className='container-fluid page-body-wrapper'>
      <SideBar />
<div className="main-panel" style={{marginTop:'40px',marginLeft:'250px'}}>
<div className="content-wrapper">
  <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'700px',fontSize:'18px'}}>  All Candidate</div>
               <Link to="/add-candidate" className="btn btn-primary" style={{padding:'10px 12px'}}>
                                    ➕ Add Candidate
                                </Link>
              <select
                    value={planList}
                    onChange={(e) => setPlanList(e.target.value)}
                    className="form-select text-dark  p-2"
                    style={{ width: "180px" }}
                  >
                    <option value="">⏳Filter</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="1-3">3-5 Years</option>
                    <option value="1-3">5+ Years</option>
                  </select>
              
              </div>
        {/* Candidate Table */}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card2 p-2 w-100">
            <div className="card-body2 mb-2">
                <div >
          <table className='table table-bordered table-hover' >
            <thead>
              <tr>
                <th>#</th>
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
              {filterCandidate.length ===0?(
<tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                              Data Not Found
                            </td>
                          </tr>
              ):(filterCandidate.map((v, i) => (
                <tr key={i}>
                  <td>{i}</td>
                   <td><span style={{display:'flex',textAlign:'left',alignItems:'center'}}>{v.profileImage && <img src={`http://localhost:8007${v.profileImage}`} alt="Profile" width="50" style={{width:'35px',height:'35px',borderRadius:"50%",marginRight:'10px'}} />}{v.Fname} {v.Lname}</span></td>
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
              ))
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
      
    </div>
  );
}
