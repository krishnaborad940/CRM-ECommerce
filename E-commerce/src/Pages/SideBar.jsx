import { Link } from "react-router-dom";

export default function CRMLayout() {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="crm-header">
        <h1>📋 CRM Panel</h1>
        <div className="user-info">
          {parsedUser ? (
            <>
              <Link to="/Profile">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" ,color:"white"}}>
                  <img
                    src={`http://localhost:8007${parsedUser.userImage}`}
                    alt="User"
                    width="35"
                    height="35"
                    style={{ borderRadius: "50%" }}
                  />
                  {parsedUser.userName}
                </div>
              </Link>
            </>
          ) : (
            <>
              <button onClick={() => window.location.href = "/login"} className="btn">Login</button>
              <button onClick={() => window.location.href = "/Register"} className="btn">Signup</button>
            </>
          )}
        </div>
      </header>

      {/* Main Section */}
      <div className="crm-main">
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
             <li><Link to="/ViewCandidates" className="nav-link">💳 Candidate</Link></li>
            {parsedUser && (
              <li>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  className="nav-link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    paddingLeft: "0",
                  }}
                >
                  🚪 Logout
                </button>
              </li>
            )}
          </ul>
        </aside>

        <section className="crm-content">
          {/* {children} */}
        </section>
      </div>
    </div>
  );
}
