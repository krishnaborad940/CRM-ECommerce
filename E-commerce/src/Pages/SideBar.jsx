import { Link } from "react-router-dom";


export default function SideBar(){

    return <>
     <div className="sidebar">
             <h2>📋 CRM </h2>
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">🛒 Dashbord</Link></li>
              <li><Link to="/Product" className="nav-link">🛒 Product</Link></li>
              <li><Link to="/viewLeads" className="nav-link">📋  Leads</Link></li>
              <li><Link to="/customer" className="nav-link">👤 Customers</Link></li>
              <li><Link to="/ViewTicket">🎟️ Ticket</Link></li>
             <li> <Link to={`/MyTickets/${localStorage.getItem("userId")}`}>My Ticket</Link></li>
            <li><Link to="/ViewQuotation " className="nav-link">Quotation</Link></li>
            </ul>
          </div>
    </>
}