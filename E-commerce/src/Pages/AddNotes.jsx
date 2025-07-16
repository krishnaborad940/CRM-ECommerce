import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function AddNotes() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    candidate: "",
    Image: null,
    noteType:''
  });
  const navigate=useNavigate()

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewCandidate")
      .then((res) => res.json())
      .then((data) => {

        console.log(data.data)
        setCandidates(data.data || []);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
   for (let key in formData) {
  data.append(key, formData[key]);
}
    try {
      const res = await fetch("http://localhost:8007/api/AddNote", {
        method: "POST",
        body: data
      });
      const result = await res.json();
      alert("Note added successfully!");
      navigate("/view-notes")
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginLeft: "250px", marginTop: "40px" }}>
          <div className="content-wrapper">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 grid-margin stretch-card">
                <div className="w-75 ">
                  <h2 className="mb-4 text-primary">📝 Add Note</h2>
                  <form onSubmit={handleSubmit} className="lead-form p-5" encType="multipart/form-data">
                    <div className="form-group mb-3">
                      <label htmlFor="title">Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter note title"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="description">Description *</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Enter note description"
                        required
                      ></textarea>
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="candidate">Select Candidate *</label>
                      <select
                        className="form-control"
                        name="candidate"
                        value={formData.candidate}
                        onChange={handleChange}
                        
                      >
                        <option value="">-- Select Candidate --</option>
                        {candidates.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.Fname} {c.Lname}
                          </option>
                        ))}
                      </select>
                    </div>
                     <div className="form-group mb-3">
                      <label htmlFor="candidate">Select Note Type </label>
                      <select
                        className="form-control"
                        name="noteType"
                        value={formData.noteType}
                        onChange={handleChange}
                        
                      >
                        <option value="">-- Select Note Type --</option>
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

                    <div className="form-group mb-4">
                      <label htmlFor="Image">Upload Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="Image"
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary me-2">
                        Submit
                      </button>
                        <a href="/view-notes" className="btn btn-outline-primary" style={{textDecoration:'none'}}>Reset</a>
                     
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
