import { Link } from "react-router-dom";
import "../App.css";

export default function CRMLayout() {
 const userName = localStorage.getItem("userName");
  // const userImage = localStorage.getItem("userImage");

// const imageUrl = userImage?.startsWith("http")
//   ? userImage
//   : `http://localhost:8007${userImage}`;

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="crm-header">
        <h1>📋 CRM Panel</h1>
        <div className="user-info">
<div className="user-info">
   {userName ? (
    <>
      <div style={{display:"flex",alignItems:"center"}}>
        <div
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        {userName.charAt(0).toUpperCase()}
      </div>
      {userName}
      </div>
    </>
  ) : (
    <>
      <button onClick={() => window.location.href = "/login"} className="btn">Login</button>
      <button onClick={() => window.location.href = "/Register"} className="btn">Signup</button>
    </>
  )}
  </div>
  </div>
      </header>

      {/* Main Section: Sidebar + Content */}
      <div className="crm-main">
        {/* Sidebar */}
        <aside className="crm-sidebar">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">📊 Dashboard</Link></li>
            <li><Link to="/Product" className="nav-link">🛒 Product</Link></li>
            <li><Link to="/viewLeads" className="nav-link">📋 Leads</Link></li>
            <li><Link to="/customer" className="nav-link">👤 Customers</Link></li>
            <li><Link to="/ViewTicket" className="nav-link">🎟️ Ticket</Link></li>
            <li><Link to={`/MyTickets/${localStorage.getItem("userId")}`} className="nav-link">🎟️ My Ticket</Link></li>
            <li><Link to="/ViewQuotation" className="nav-link">📄 Quotation</Link></li>
            <li><Link to="/ViewSales" className="nav-link">💰 Sales</Link></li>
            <li><Link to="/ViewPayment" className="nav-link">💳 Payment</Link></li>
              {userName && (
    <li>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="nav-link"
        style={{ background: "none", border: "none", cursor: "pointer", paddingLeft: "0" }}
      >
        🚪 Logout
      </button>
    </li>
  )}
          </ul>
        </aside>

        {/* Page Content */}
        <section className="crm-content">
        {/* {children} */}
        </section>
      </div>
    </div>
  );
}
