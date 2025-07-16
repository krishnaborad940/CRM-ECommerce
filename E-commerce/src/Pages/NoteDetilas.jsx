import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function NoteDetails() {
  const [Note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8007/api/NoteDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setNote(data.data))
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Note) return <p>Loading...</p>;

  const imageUrl = Note.Image?.startsWith("http")
    ? Note.Image
    : `http://localhost:8007${Note.Image || ""}`;

  const cimageUrl = Note.candidate?.profileImage?.startsWith("http")
    ? Note.candidate.profileImage
    : `http://localhost:8007${Note.candidate?.profileImage || ""}`;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
  <div className="container-scroller" style={{ display: "flex" }}>
  <Header />
  <div className="container-fluid page-body-wrapper">
    <SideBar />
    <div className="main-panel" style={{ marginLeft: '250px', marginTop: '40px' }}>
      <div className="content-wrapper d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "900px", borderRadius: "16px" }}>
          {/* Header Row */}
          <div className="d-flex  align-items-center mb-3">
            <h4 className="fw-bold m-0" >Note Details</h4>
            <Link to="/view-notes" className="btn btn-outline-primary btn-sm" style={{marginLeft:'650px'}}>⬅ Back</Link>
          </div>

          <div className="row">
            {/* LEFT TEXT SIDE */}
            <div className="col-lg-8">
              <div className="table-responsive">
                <table className="table table-bordered table-hover" style={{textAlign:'left'}}>
                  <tbody >
                    <tr>
                      <th style={{ width: "180px" }}>Title:</th>
                      <td style={{textAlign:'left'}}>{Note.title}</td>
                    </tr>
                    <tr>
                      <th>Description:</th>
                      <td style={{textAlign:'left'}}>{Note.description}</td>
                    </tr>
                    <tr>
                      <th>Candidate Name:</th>
                      <td style={{textAlign:'left'}}><img src={cimageUrl} style={{marginRight:'10px'}}/>{Note.candidate?.Fname} {Note.candidate?.Lname}</td>
                    </tr>
                    <tr>
                      <th>Note Type:</th>
                      <td style={{textAlign:'left'}}>{Note.noteType}</td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td style={{textAlign:'left'}}><span className="badge bg-success">{Note.status}</span></td>
                    </tr>
                    <tr>
                      <th>Created Date:</th>
                      <td style={{textAlign:'left'}}>{formatDate(Note.createdAt)}</td>
                    </tr>
                    <tr>
                      <th>Updated Date:</th>
                      <td style={{textAlign:'left'}}>{formatDate(Note.updatedAt)}</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT IMAGE SIDE */}
            <div className="col-lg-4 d-flex justify-content-center align-items-start mt-3 mt-lg-0">
              <img
                src={imageUrl}
                alt="Candidate"
                className="img-fluid"
                style={{
                  borderRadius: "12px",
                  width: "100%",
                  maxWidth: "280px",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  // marginLeft:'-200px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
