import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function NewFollowUp() {
  const { id } = useParams(); // lead ID
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [remark, setRemark] = useState("");
  const [nextFollowup, setNextFollowup] = useState("");
  const [FollowUpType, setFollowUpType] = useState("");
  const [status, setStatus] = useState("");

  // Fetch lead details for context (name, product)
  useEffect(() => {
    fetch(`http://localhost:8007/api/editLead/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Lead Data:", data.data);
        setLead(data.data);
      });
  }, [id]);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!remark || !FollowUpType || !status) {
      alert("Please fill all required fields.");
      return;
    }
    
  const assigner = localStorage.getItem("userId");

    fetch(`http://localhost:8007/api/AddNewFollowUp/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remark,
        nextFollowup,
        FollowUpType,
        Lead: id,
        product: lead?.product?._id,
        status,
        assigner
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Follow-Up Added Successfully");
        navigate("/ViewLeads");
      })
      
  };

  return (
    <>
    <div className="container-scroller">
      <Header/>
      <div className="container-fluid page-body-wrapper">
        <SideBar/>
        <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
          <div className="content-wrapper">
 
        <div className="">
            <div class="page-header" >
              <h3 class="page-title" style={{marginLeft:'60px'}}>➕ Set Follow Up </h3>
            
            </div>
     

      <form onSubmit={handleSubmit} className="lead-form">
       {lead && (
        <div>
          <p><b>Name:</b> {lead.name}</p>
          <p><b>Product:</b> {lead.product?.title} - ₹{lead.product?.Price}</p>        </div>
      )}
              <label>Remark</label>
             <input
                  type="text"
                  name="remark"
                  placeholder="Enter your Remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  required
                />
             
       
              <label>Next Follow-Up Date</label>
            
                <input
                  type="date"
                  name="Followup"
                  value={nextFollowup}
                  onChange={(e) => setNextFollowup(e.target.value)}
                />

              <label>Follow-Up Type</label>
              
                <select
                  name="FollowUpType"
                  value={FollowUpType}
                  onChange={(e) => setFollowUpType(e.target.value)}
                  required
                >
                  <option value="">--select--</option>
                  <option value="Call">Call</option>
                  <option value="Visit">Visit</option>
                  <option value="Whatsapp">Whatsapp</option>
                  <option value="Email">Email</option>
                </select>
             
              <label>Status</label>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">--select--</option>
                  <option value="Intrested">Interested</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
                <button  className="submit-btn btn-gradient-primary " style={{textAlign:"center",marginLeft:'250px'}}>Set FollowUp</button>
              
      </form>
        </div>
      
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}
