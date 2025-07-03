import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "../App.css"; // Custom CSS

export default function FollowUp() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [remark, setRemark] = useState("");
  const [nextFollowup, setNextFollowup] = useState("");
  const [FollowUpType, setFollowUpType] = useState("");
  const [status, setStatus] = useState("");

    useEffect(() => {
    fetch(`http://localhost:8007/api/editLead/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Lead Data:", data.data);
        setLead(data.data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!remark || !FollowUpType || !status) {
      alert("Please fill all required fields.");
      return;
    }

    const assigner = localStorage.getItem("userId");

    fetch(`http://localhost:8007/api/AddFollowUp/${id}`, {
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
        assigner,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Follow-Up Added Successfully");
        navigate("/ViewLeads");
      });
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="followup-header">
          <h2>📞 Set Follow-Up</h2>
          {lead && (
            <div className="lead-info">
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Product:</strong> {lead.product?.title} - ₹{lead.product?.Price}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="followup-form">
          <label>
            Remark:
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              required
            />
          </label>

          <label>
            Next Follow-Up Date:
            <input
              type="date"
              value={nextFollowup}
              onChange={(e) => setNextFollowup(e.target.value)}
            />
          </label>

          <label>
            Follow-Up Type:
            <select value={FollowUpType} onChange={(e) => setFollowUpType(e.target.value)} required>
              <option value="">-- Select --</option>
              <option value="Call">Call</option>
              <option value="Visit">Visit</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="Email">Email</option>
            </select>
          </label>

          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">-- Select --</option>
              <option value="Intrested">Interested</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <button type="submit" className="submit-btn">➕ Set Follow-Up</button>
        </form>
      </div>
    </div>
  );
}
