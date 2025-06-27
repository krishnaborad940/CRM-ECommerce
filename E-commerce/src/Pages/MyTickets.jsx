import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";

export default function MyTickets() {
  const { assigner } = useParams();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8007/api/MyTickets/${assigner}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Tickets:", data.data);
        setTickets(data.data);
      });
  }, [assigner]);

   const handleStatusUpdate = (_id) => {
    fetch(`http://localhost:8007/api/AddClosed/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Converted Successfully");
        setTickets((pre) =>
          pre.map((lead) =>
            lead._id === _id ? { ...lead, status: "Closed" } : lead
          )
        );
      });
  };
  console.log(tickets)

  return (
    <div className="dashboard-container">
      <SideBar/>

      {/* Main Content */}
      <div className="main-content">
        <div className="mytickets-container">
          <h2>🎟️ My Assigned Tickets</h2>
          <table className="lead-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                
                <tr key={ticket._id}>
                  <td>{ticket.subject}</td>
                  <td>{ticket.customer?.name}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.category}</td>
                  <td>
                
                    {ticket.status === "Closed" ? (
                      <span className="Closed">✔️</span>
                    ) : (
                      <button className="btn btn-convert" onClick={() => handleStatusUpdate(ticket._id)}>Closed</button>
                    )}
                  
                    
                    <Link
                      to={`/NewFollowUp/${ticket.Lead}`}
                      style={{ backgroundColor: "#28a745", color: "#fff", padding: "5px 10px", borderRadius: "5px", textDecoration: "none" }}
                    >
                      Follow Up
                    </Link>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No tickets assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
