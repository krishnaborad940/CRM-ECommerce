import { useEffect, useState } from "react";
import SideBar from "../Pages/SideBar";
import { Link, useParams } from "react-router-dom";
import "../Style/Lead.css";
import Header from "./Header";

export default function CandidateDetails() {
  const [candidate, setCandidate] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8007/api/CandidateDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setCandidate(data.data));
  }, [id]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleImageClick = (url) => {
    setModalImageUrl(url);
    setShowImageModal(true);
  };

  const handlePreview = (url) => {
    setPreviewUrl(`http://localhost:8007${url}`);
    setModalOpen(true);
  };

   const closeModal = () => {
    setModalOpen(false);
    setPreviewUrl("");
  };
  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="container-scroller">
      <Header/>
      <div className="container-fluid page-body-wrapper">
      <SideBar />
      <div className="main-panel" style={{marginTop:'40px',marginLeft:'250px'}}>
        <div className="content-wrapper">
          <div className="page-header">
                    <h3 className="page-title" style={{marginLeft:"50px"}}>All Candidate</h3>
                     <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    <span></span><a href="/ViewCandidates">View-Candidate</a>/CandidateDetails
                  </li>
                </ul>
              </nav>
           </div> <div className="row" style={{marginTop:'-20px'}}>
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className=" card-body">

        <div style={{ display: "flex", gap: "30px", marginBottom: "20px" }}>
          <img
            src={`http://localhost:8007${candidate.profileImage}`}
            alt="Profile"
            width="120"
            style={{ borderRadius: "10px", border: "1px solid #ccc" }}
          />
          <div>
            <h3>{candidate.Fname} {candidate.Lname}</h3>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Phone:</strong> {candidate.phone}</p>
            <p><strong>Website:</strong> {candidate.website}</p>
            <p><strong>Fax:</strong> {candidate.fax}</p>
          </div>
        </div>

        {/* 📍 Address */}
        <div className={`section ${openSection === "address" ? "open" : ""}`}>
          <div className="section-header" onClick={() => toggleSection("address")}>📍 Address</div>
          {openSection === "address" && (
            <div className="section-body">
              <div className="detail-row"><strong>Street:</strong> {candidate.street}</div>
              <div className="detail-row"><strong>City:</strong> {candidate.city}</div>
              <div className="detail-row"><strong>State:</strong> {candidate.state}</div>
              <div className="detail-row"><strong>Code:</strong> {candidate.code}</div>
              <div className="detail-row"><strong>Country:</strong> {candidate.country}</div>
            </div>
          )}
        </div>

        {/* 💼 Professional Info */}
        <div className={`section ${openSection === "professional" ? "open" : ""}`}>
          <div className="section-header" onClick={() => toggleSection("professional")}>📚 Professional Info</div>
          {openSection === "professional" && (
            <div className="section-body">
              <div className="detail-row"><strong>Education:</strong> {candidate.education}</div>
              <div className="detail-row"><strong>Experience:</strong> {candidate.experience}</div>
              <div className="detail-row"><strong>Skills:</strong> {candidate.skills}</div>
              <div className="detail-row"><strong>Salary:</strong> {candidate.salary}</div>
            </div>
          )}
        </div>

        {/* 🌐 Other Info */}
        <div className={`section ${openSection === "other" ? "open" : ""}`}>
          <div className="section-header" onClick={() => toggleSection("other")}>🌐 Other Info</div>
          {openSection === "other" && (
            <div className="section-body">
              <div className="detail-row"><strong>Twitter ID:</strong> {candidate.twitterId}</div>
              <div className="detail-row"><strong>Skype ID:</strong> {candidate.skypeId}</div>
              <div className="detail-row"><strong>Source:</strong> {candidate.source}</div>
            </div>
          )}
        </div>
{/* 🎓 Education Info */}
<div className={`section ${openSection === "educationInfo" ? "open" : ""}`}>
  <div className="section-header" onClick={() => toggleSection("educationInfo")}>🎓 Education Info</div>
  {openSection === "educationInfo" && (
    <div className="section-body">
      {candidate.educationInfo && candidate.educationInfo.length > 0 ? (
        candidate.educationInfo.map((edu, index) => (
          <div  key={index}>
           
              <div className="detail-row"><strong>Degree:</strong> {edu.degree}</div>
              <div className="detail-row"><strong>Institute:</strong>  {edu.institute}</div>
              <div className="detail-row"><strong>Year:</strong> {edu.year}</div>
          </div>
        ))
      ) : (
        <div>No Education Info Available</div>
      )}
    </div>
  )}
</div>

{/* 🏢 Work Experience */}
<div className={`section ${openSection === "workExperience" ? "open" : ""}`}>
  <div className="section-header" onClick={() => toggleSection("workExperience")}>🏢 Work Experience</div>
  {openSection === "workExperience" && (
    <div className="section-body">
      {candidate.workExperience && candidate.workExperience.length > 0 ? (
        candidate.workExperience.map((work, index) => (
          <div  key={index} style={{textAlign:'left'}}>
            <strong>Company:</strong> {work.company}<br/>
            <strong>Role:</strong> {work.role} <br />
            <strong>Duration:</strong> {work.duration}<br/>
           
          </div>
        ))
      ) : (
        <div>No Work Experience Available</div>
      )}
    </div>
  )}
</div>

        {/* 📎 Attachments */}
        <div className={`section ${openSection === "documents" ? "open" : ""}`}>
          <div className="section-header" onClick={() => toggleSection("documents")}>📎 Attachments</div>
          {openSection === "documents" && (
            <div className="section-body">
              <div className="detail-row">
                <strong>Resume:</strong>
                {candidate.resume && (
                     <li>
             
              <button onClick={() => handlePreview(candidate.resume)}>View</button>
            </li>
                )}
              </div>
              <div className="detail-row">
                <strong>Cover Letter:</strong>
                {candidate.coverLetter && (
                  <li>
              <button onClick={() => handlePreview(candidate.coverLetter)}>View</button>
            </li>
                )}
              </div>
              <div className="detail-row">
                <strong>Contract:</strong>
                {candidate.contract && (
                  <li>
              
              <button onClick={() => handlePreview(candidate.contract)}>View</button>
            </li>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ✅ Modal for viewing images */}
        {showImageModal && (
          <div className="modal-backdrop" onClick={() => setShowImageModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={modalImageUrl} alt="Zoomed Attachment" />
              <button className="close-btn" onClick={() => setShowImageModal(false)}>×</button>
            </div>
          </div>
        )}
           {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
            />
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
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
