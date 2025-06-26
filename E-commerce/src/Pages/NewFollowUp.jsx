import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NewFollowUp() {
  const { id } = useParams(); // lead ID
//   console.log("lead id:-"+id)
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [remark, setRemark] = useState("");
  
  const [nextFollowup, setNextFollowup] = useState("");
  const [FollowUpType, setFollowUpType] = useState("");
  const [status, setStatus] = useState("");

  // Fetch lead details for context (name, product)
  useEffect(() => {
    
    fetch(`http://localhost:8007/api/EditLead/${id}`,{
        method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
       
        console.log("Lead Data:", data.data);
        setLead(data.data);
      });
  }, [id]);
//   localStorage
// useEffect(() => {
//   const leads = JSON.parse(localStorage.getItem("Lead")) || [];

//   console.log("All leads:", leads);
//   console.log("Current ID from params:", id);

//   const currentLead = leads.find((lead) => lead._id === id);

//   if (currentLead) {
//     console.log("Matched Lead:", currentLead);
//     setLead(currentLead);
//   } else {
//     alert("Lead not found in local storage.");
//   }
// }, [id]);


  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();


    let assigner=localStorage.getItem("userId")
    if (!remark || !FollowUpType || !status) {
      alert("Please fill all required fields.");
      return;
    }

    fetch(`http://localhost:8007/api/AddNewFollowUp/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remark,
        nextFollowup,
        FollowUpType,
        Lead:lead?._id,
        product: lead?.product?._id,
        status,
        assigner
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Follow-Up Added Successfully");
        navigate("/ViewTicket");
      })
      .catch((err) => {
        console.error("FollowUp Error:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <>
      <h2>Set Follow-Up</h2>
      {lead && (
        <div>
          <p><b>Name:</b> {lead.name}</p>
          <p><b>Product:</b> {lead.product?.title} - ₹{lead.product?.Price}</p>        </div>
      )}

      <form onSubmit={handleSubmit}>
        <table border={1}>
          <tbody>
            <tr>
              <td>Remark</td>
              <td>
                <input
                  type="text"
                  name="remark"
                  placeholder="Enter your Remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Next Follow-Up Date</td>
              <td>
                <input
                  type="date"
                  name="Followup"
                  value={nextFollowup}
                  onChange={(e) => setNextFollowup(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Follow-Up Type</td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="submit" value="Set Follow-Up" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
