import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // 👈 Import the CSS file

export default function DashPage() {
  const todayDate=new Date().toISOString().split("T")[0];
  const [count, setCount] = useState({
    leadCount: 0,
    CustomerCount: 0,
    TicketCount:0,
    FollowupCount:0,
    todayDate
  });

  useEffect(() => {
    fetch("http://localhost:8007/api/dashCount")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCount({
          leadCount: data.leadCount,
          CustomerCount: data.CustomerCount,
          TicketCount:data.TicketCount,
          FollowupCount:data.FollowupCount
        });
      });

  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
     <div className="sidebar">
         <h2>📋 CRM </h2>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">🛒 Dashbord</Link></li>
          <li><Link to="/Product" className="nav-link">🛒 Product</Link></li>
          <li><Link to="/viewLeads" className="nav-link">📋  Leads</Link></li>
          <li><Link to="/customer" className="nav-link">👤 Customers</Link></li>
          <li><Link to="/ViewTicket">🎟️ Ticket</Link></li>
         <li> <Link to={`/MyTickets/${localStorage.getItem("userId")}`}>My Ticket</Link></li>
        
        </ul>
      </div>
      {/* Main Content */}
      <div className="main-content">
        <h1>📊 Dashboard</h1>
        <div className="stats-container">
          <div className="card">
            <a href="/ViewLeads">
              <h2 style={{ color: "#007bff" }}>{count.leadCount}</h2>
            <p style={{ color: "black" }}>Total Leads</p>
            </a>
          </div>
          <div className="card">
          <a href="/Customer">
              <h2 style={{ color: "#28a745" }}>{count.CustomerCount}</h2>
            <p style={{ color: "black" }}>Total Customers</p>
          </a>
          </div>
           <div className="card">
         <a href="/ViewTicket">
             <h2 style={{ color: "#28a745" }}>{count.TicketCount}</h2>
            <p style={{ color: "black" }}>Total Ticket</p>
         </a>
          </div>
           <div className="card">
              <a href="/ShowFollowUp">
                 <h2 style={{ color: "#28a745" }}>{count.FollowupCount}</h2>
            <p style={{ color: "black" }}>Total FollowUp</p>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
}
