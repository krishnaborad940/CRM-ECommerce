import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";

export default function LeadDetails() {
  const [Lead, setLead] = useState(null);
  const { id } = useParams(); 
  const navigate=useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8007/api/LeadDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setLead(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);
   const handleConvert = (_id) => {
      fetch(`http://localhost:8007/api/AddConvert/${_id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then(() => {
          alert("Converted Successfully");
          setLead((pre) =>
            pre.map((lead) =>
              lead._id === _id ? { ...lead, status: "Converted" } : lead
            )
          );
        });
    };

  if (!Lead) return <p>Loading...</p>;

  const imageUrl = Lead.product?.Image?.startsWith("http")
    ? Lead.product?.Image
    : `http://localhost:8007${Lead.product?.Image || ""}`;

  return (
    <div className="viewleads-container" style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <div className="main-content" style={{ flex: 1, padding: "30px" }}>
        <div
          className="product-details"
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Link to="/ViewLeads" style={{ textDecoration: "none", color: "#007bff" }}>
            ⬅ Back to Lead
          </Link>

          <h2 style={{ marginTop: "20px", marginBottom: "10px", color: "#333" }}>
            🛍️ {Lead.name}
          </h2>

          <img
            src={imageUrl}
            alt={Lead.product?.name}
            style={{ width: "50%", maxHeight: "300px",objectFit:'contain', borderRadius: "10px" }}
          />

          <div style={{ marginTop: "20px", lineHeight: "1.8", fontSize: "16px" }}>
            <p><strong>Email:</strong> {Lead.email}</p>
            <p><strong>Phone:</strong> {Lead.phone}</p>
            <p><strong>product:</strong> {Lead.product?.title}-₹{Lead.product?.Price}</p>
            <p><strong>Next-FollowUp:</strong> {Lead.nextFollowup}</p>
            <p><strong>Remark:</strong>  {Lead.remark}</p>
            <p><strong>Status:</strong> <span style={{color:"green"}}> {Lead.status}</span></p>
            <p><strong>Assigner:</strong>  {Lead.role}</p>
             <div style={{display:"flex",alignItems:"center"}}><button className="btn btn-edit"style={{marginRight:"5px"}} onClick={() => navigate(`/EditLead/${Lead._id}`)}>✏️</button>
                 {/* <button className="btn btn-delete" style={{marginRight:"5px"}} onClick={() => handleDelete(Lead._id)}>🗑️</button> */}
                  <button className="btn btn-follow" style={{marginRight:"5px"}} onClick={() => navigate(`/FollowUp/${Lead._id}`)}>📞</button>
                  
                    {Lead.status === "Converted" ? (
                      <span className="converted"><button className="btn btn-edit">✔️</button></span>
                    ) : (
                      <button className="btn btn-convert" style={{backgroundColor:"#aab7b8 "}} onClick={() => handleConvert(Lead._id)}>Convert</button>
                    )}
                  <p><Link to={`/Quotation/${Lead._id}`}><button className="btn btn-edit" style={{fontSize:"18px"}}><i className="ri-folder-add-fill"></i></button> </Link></p>
                 </div>

          </div>

       
        </div>
      </div>
    </div>
  );
}
