import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();
let user=JSON.parse(localStorage.getItem("user"))
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const [assigner, setAssigner] = useState("");
  const [lead, setLead] = useState("");
  const [customer, setCustomer] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8007/api/AllUser")
    .then((res) => res.json())
    .then((data) => setUsers(data.data || []));
}, []);const filteredUsers = users.filter((u) => u.role === role);
  useEffect(() => {
    fetch(`http://localhost:8007/api/editCustomer/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data.data);
        if (data.data?.data) {
          setLead(data.data);
        }
      });
  }, [id]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setAssigner(userId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message || !status || !priority) {
      alert("Please fill all required fields.");
      return;
    }

    fetch(`http://localhost:8007/api/AddTicket/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        message,
        assigner:user?.userId,
        status,
        priority,
        role,
        customer: id,
        category,
        lead: customer?.lead?._id || lead?._id,
        
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Ticket Added Successfully");
        navigate("/view-customer");
      })
      .catch((err) => {
        console.error("Ticket Error:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="container-scroller">
      <Header/>
      <div  className="container-fluid page-body-wrapper">
       
      <SideBar />
      <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
        <div className="content-wrapper">
           <div class="page-header" >
              <h3 class="page-title" style={{marginLeft:'60px'}}>➕ Add Support Ticket</h3>
            </div>
  {/* <h2 className="form-heading">Add Support Ticket</h2> */}

       

        <form onSubmit={handleSubmit} className="lead-form">
           {customer && (
          <div className="lead-info">
            <p><b>Name:</b> {customer.name}</p>
            <p><b>Product:</b> {customer.product?.title} - ₹{customer.product?.Price}</p>
          </div>
        )}
          <label>
            Subject:
            <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
              <option value="">--select--</option>
              <option value="Login Issue">Login Issue</option>
              <option value="Product Not Working">Product Not Working</option>
              <option value="Request for Demo">Request for Demo</option>
              <option value="Billing Concern">Billing Concern</option>
              <option value="Others">Others</option>
            </select>
          </label>

          <label>
            Description:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Enter ticket details"
            />
          </label>

          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">--select--</option>
              <option value="Open">Open</option>
              <option value="InProgress">In-Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <label>
            Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
              <option value="">--select--</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

         <label>
  Assign Role:
  <select value={role} onChange={(e) => setRole(e.target.value)} required>
    <option value="">--select--</option>
    <option value="teleCaller">TeleCaller</option>
    <option value="sales">Sales</option>
    <option value="Supporter">Supporter</option>
  </select>
</label>

{role && (
  <label>
    Assign To:
    <select value={assigner} onChange={(e) => setAssigner(e.target.value)} required>
      <option value="">--select--</option>
      {filteredUsers.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name} ({user.email})
        </option>
      ))}
    </select>
  </label>
)}


          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">--select--</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="General">General</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <button type="submit" className="btn btn-gradient-primary">Add Ticket</button>
        </form>
        </div>
      
      </div>
    
      </div>
    </div>
  );
}
