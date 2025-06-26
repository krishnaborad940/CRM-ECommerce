import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";

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

  const handleStatusUpdate = (ticketId, newStatus) => {
    fetch(`http://localhost:8007/api/UpdateTicketStatus/${ticketId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        alert("Status Updated Successfully");
        // Refresh ticket list
        setTickets((prev) =>
          prev.map((t) =>
            t._id === ticketId ? { ...t, status: newStatus } : t
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update status");
      });
  };
  console.log(tickets)

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>📋 CRM </h2>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">📊 Dashboard</Link></li>
          <li><Link to="/Product" className="nav-link">🛒 Product</Link></li>
          <li><Link to="/viewLeads" className="nav-link">📋 Leads</Link></li>
          <li><Link to="/customer" className="nav-link">👤 Customers</Link></li>
          <li><Link to="/ViewTicket" className="nav-link">🎟️ All Tickets</Link></li>
          <li><Link to={`/MyTickets/${localStorage.getItem("userId")}`} className="nav-link">🎯 My Ticket</Link></li>
        </ul>
      </div>

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
                    <button
                      onClick={() => handleStatusUpdate(ticket._id, "Closed")}
                      style={{ marginRight: "10px", backgroundColor: "#ff4d4d", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px" }}
                    >
                      Close
                    </button>
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
