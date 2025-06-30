import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import "../App.css"; 
import SideBar from "./SideBar";

export default function ViewTicket() {
  const [statusCount,setStatusCount]=useState({
      Open:0,
      InProgress:0,
closed:0
  })
  const [showLeads, setShowLeads] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8007/api/ShowTicket")
      .then((res) => res.json())
      .then((data) => {
        const allTickets=data.data
        setShowLeads(allTickets);
              const open = allTickets.filter(t => t.status === "Open").length;
      const inprocess = allTickets.filter(t =>t.status === "In-Progress").length;
      const closed = allTickets.filter(t => t.status === "Closed").length;

      setStatusCount({ open, inprocess, closed });

      });
      
  }, []);

const handleDelete = (_id) => {
  if (window.confirm("Are you sure you want to delete this ticket?")) {
    fetch(`http://localhost:8007/api/DeleteTicket/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setShowLeads((prev) => prev.filter((ticket) => ticket._id !== _id));
      });
  }
};


const handleClose = (_id) => {
  fetch(`http://localhost:8007/api/CloseTicket/${_id}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then(() => {
      setShowLeads((prev) =>
        prev.map((ticket) =>
          ticket._id === _id ? { ...ticket, status: "Closed" } : ticket
        )
      );
    });
};
  return (
    <div className="viewleads-container">
   <SideBar/>

      {/* Main Content */}
      <main className="main-content">
         <div className="header">
          <h1 style={{ margin: 0 }}>All Products</h1>
        </div>
        <table className="lead-table">
          <thead>
            <tr>
              <th>subject</th>
              <th>Message</th>
              <th>Customer Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Assigner</th>
              {/* <th>Remark</th> */}
              <th colSpan={4}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showLeads.map((v) => (
              <tr key={v._id}>
                <td>{v.subject}</td>
                <td>{v.message}</td>
                <td>{v.customer?.name} </td>
                <td>{v.category}</td>
                <td>{v.status}</td>
                <td>{v.role}</td>
              
      <td>
        <button className="btn btn-delete" onClick={() => handleDelete(v._id)}>🗑️</button>
      </td>
      <td>
        {v.status === "Closed" ? (
          <span className="converted">✔️</span>
        ) : (
          <button className="btn btn-convert" onClick={() => handleClose(v._id)}>🔁 Close</button>
        )}
      </td>
      
              </tr>
            ))}
          </tbody>
        </table>

        <div className="stats-container" style={{ marginTop: "30px" }}>
  <div className="card">
    <h2 style={{ color: "#007bff" }}>{statusCount.open}</h2>
    <p style={{ color: "black" }}>Open Tickets</p>
  </div>
  <div className="card">
    <h2 style={{ color: "#ffc107" }}>{statusCount.inprocess}</h2>
    <p style={{ color: "black" }}>In-Process Tickets</p>
  </div>
  <div className="card">
    <h2 style={{ color: "#28a745" }}>{statusCount.closed}</h2>
    <p style={{ color: "black" }}>Closed Tickets</p>
  </div>
</div>
      </main>
    </div>
  );
}
