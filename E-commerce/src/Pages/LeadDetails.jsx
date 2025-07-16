import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";
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
          navigate(`/view-leads`)
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


     const imageUrl2 = Lead.companies?.Image?.startsWith("http")
    ? Lead.companies?.Image
    : `http://localhost:8007${Lead.companies?.Image || ""}`;
       const imageUrl3 = Lead.assigner?.Image?.startsWith("http")
    ? Lead.assigner?.Image
    : `http://localhost:8007${Lead.assigner?.Image || ""}`;

 



  return (
    <div className="container-scroller" style={{ display: "flex" }}>
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginLeft: '250px', marginTop: '40px' }}>
          <div className="content-wrapper d-flex justify-content-center">
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "1000px", borderRadius: "16px" }}>
              {/* Header Row */}
              <div className="d-flex align-items-center mb-3">
                <h4 className="fw-bold m-0">Lead Details</h4>
                <Link to="/view-leads" className="btn btn-outline-primary btn-sm" style={{ marginLeft: 'auto' }}>⬅ Back</Link>
              </div>

              <div className="row">
                {/* LEFT TEXT SIDE */}
                <div className="col-lg-8">
                  <div className="table-responsive" style={{marginTop:'-25px'}}>
                    <table className="table table-bordered table-hover" style={{ textAlign: 'left' }}>
                      <tbody>
                      <tr>
                                           
  <th style={{ width: "150px", padding: "8px" }}>Product :</th>
  <td style={{ padding: "8px" }}>{Lead.product?.title}- ₹{Lead.product?.Price}</td>
</tr>
  <tr>
  <th style={{ width: "150px", padding: "8px" }}> Name:</th>
  <td style={{ padding: "8px" }}>{Lead.name}</td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Email:</th>
  <td style={{ padding: "8px" }}>{Lead.email}</td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Phone:</th>
  <td style={{ padding: "8px" }}>{Lead.phone}</td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Company:</th>
  <td style={{ padding: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
    <img src={imageUrl2} alt="Company" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
    {Lead.companies?.name}
  </td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Role:</th>
  <td style={{ padding: "8px" }}>{Lead.role}</td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Assigner:</th>
  <td style={{ padding: "8px" }}><img src={imageUrl3}/>{Lead.assigner?.name}</td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Next-FollowUp:</th>
  <td style={{ padding: "8px" }}>{Lead.nextFollowup}</td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Remark:</th>
  <td style={{ padding: "8px" }}>{Lead.remark}</td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>Status:</th>
  <td style={{ padding: "8px" }}>
    <span
      style={{
        color:Lead.status==='Active'?'#155724':'#a71d2a',
        backgroundColor: Lead.status === "Active" ? "#d4edda" : "#f5c6cb",

        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "13px"
      }}
    >
      {Lead.status}
    </span>
  </td>
</tr>
<tr>
  <th style={{ padding: "8px" }}>CreateAt:</th>
  <td style={{ padding: "8px" }}>{Lead.createdAt}</td>
</tr>

<tr>
  <th style={{ padding: "8px" }}></th>
  <td style={{ padding: "8px" }}>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
     <button className="btn btn-danger p-2" onClick={() => navigate(`/FollowUp/${Lead._id}`)}>📞</button>
      {Lead.status === "Converted" ? (
        <button className="btn "  style={{backgroundColor:'green',padding:'5px 7px'}}>✔️ </button>
      ) : (
        <button className="btn  p-2 " style={{backgroundColor:'rgb(9 139 39 / 68%)'}}  onClick={() => handleConvert(Lead._id)}>  <i className="ri-exchange-line" style={{ fontSize:'18px',color:'green' }}></i></button>
      )}
      <Link to={`/Quotation`}>
        <button className="btn btn-info p-2">
          <i className="ri-folder-add-fill"></i> 
        </button>
      </Link>
    </div>
  </td>
</tr>

                        
                      </tbody>
                    </table>
                  </div>
                 
                </div>

                {/* RIGHT IMAGE SIDE */}
                <div className="col-lg-4 d-flex justify-content-center align-items-start mt-3 mt-lg-0">
                  <img
                    src={imageUrl}
                    alt={Lead.title}
                    className="img-fluid"
                    style={{
                      borderRadius: "12px",
                      width: "100%",
                      maxWidth: "280px",
                      objectFit: "cover",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
