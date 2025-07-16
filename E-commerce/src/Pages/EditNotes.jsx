import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";
import "../App.css"; // CSS file import
import Header from "./Header";

export default function EditNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    candidate: "",
    noteType: "",
    Image:null
  });


  useEffect(() => {
    fetch("http://localhost:8007/api/ViewCandidate")
      .then((res) => res.json())
      .then((data) => setCandidates(data.data));

    fetch(`http://localhost:8007/api/EditNote/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const lead = data.data;
        setFormData({
          title: lead.title,
          description: lead.description,
          noteType: lead.noteType,
          candidate: lead.candidate?._id || "",
          Image:lead.Image || null
        });
      });
  }, [id]);

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "Image") {
    setFormData((prev) => ({ ...prev, Image: files[0] })); // Store the File object
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleUpdate = (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("candidate", formData.candidate);
  form.append("noteType", formData.noteType);
  form.append("Image", formData.Image); // file

  fetch(`http://localhost:8007/api/UpdateNote/${id}`, {
    method: "PUT",
    body: form,
  })
    .then((res) => res.json())
    .then(() => {
    //   alert("Notes updated successfully!");
      navigate("/view-notes");
    });
};


  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar/>
            <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
              <div className="content-wrapper">

          <div class="page-header" >
              <h3 class="page-title" style={{marginLeft:'60px'}}>➕ Edit Lead </h3>
              <nav aria-label="breadcrumb">
                <a class="btn-gradient-primary p-2 rounded " >
                   <Link to="/view-notes" style={{color:'white'}}>
            ← View Notes
          </Link>
                </a>
              </nav>
            </div>
                 

                  <form onSubmit={handleUpdate} className="edit-form">
                    <label>Title:
                      <input name="title" value={formData.title} onChange={handleChange} required />
                    </label>

                    <label>Description:
                      <input name="description" value={formData.description} onChange={handleChange} required />
                    </label>
                   <label>Candidate:
  <select
    name="candidate"
    value={formData.candidate}
    onChange={handleChange}
    required
  >
    <option value="">-- Select Candidate --</option>
    {candidate.map((p) => (
      <option key={p._id} value={p._id}>
        {p.Fname} {p.Lname}
      </option>
    ))}
  </select>
</label>
                      <label>Note Type:
                      <select name="noteType" value={formData.noteType} onChange={handleChange} required>
                        <option value="">-- Select Product --</option>
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
                    </label>
                        <label htmlFor="">Image</label>
                        <input type="file" name="Image" onChange={handleChange} />
                        {formData.Image && (
            <img
              src={typeof formData.Image === "string" ? `http://localhost:8007${formData.Image}` : URL.createObjectURL(formData.Image)}
              alt="Preview"
              style={{ width: "80px", height: "80px", borderRadius: "8px", marginBottom: "10px" }}
            />
          )}
                    <button type="submit" className="submit-btn btn-gradient-primary">Update Lead</button>
                  </form>
              </div>
                </div>
      </div>
    
    </div>
  );
}
