import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
const [role,setRole]=useState("")
  const [assigner, setAssigner] = useState("");
  const [lead,setLead]=useState("")
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8007/api/editCustomer/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data.data);
        if(data.data?.data){
          setLead(data.data)
        }
      });
  }, [id]);

  useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    setAssigner(userId);
  }
}, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !message || !status || !priority ) {
      alert("Please fill all required fields.");
      return;
    }

    fetch(`http://localhost:8007/api/AddTicket/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        message,
        assigner,
        status,
        priority,
        role,
        customer:id,
        category,
        Lead:lead?._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Ticket Added Successfully");
        navigate("/Customer");
      })
      .catch((err) => {
        console.error("Ticket Error:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <>
      <h2>Add Support Ticket</h2>
      {customer && (
        <div>
          <p><b>Name:</b> {customer.name}</p>
          <p><b>Product:</b> {customer.product?.title} - ₹{customer.product?.Price}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <table border={1}>
          <tbody>
            <tr>
              <td>Subject</td>
            <td>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
  <option value="">--select--</option>
  <option value="Login Issue">Login Issue</option>
  <option value="Product Not Working">Product Not Working</option>
  <option value="Request for Demo">Request for Demo</option>
  <option value="Billing Concern">Billing Concern</option>
  <option value="Others">Others</option>
                </select>
            </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="">--select--</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                  <option value="">--select--</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Assigner</td>
              <td>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">--select--</option>
                  <option value="teleCaller">TeleCaller</option>
                  <option value="sales">Sales</option>
                  <option value="Supporter">Supporter</option>
                </select>
              </td>
            </tr>
             <tr>
              <td>Category</td>
              <td>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">--select--</option>
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="General">General</option>
                  <option value="Other">Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">Add Ticket</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
