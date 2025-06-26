import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; 

export default function Customer() {
  const [showCustomer, setShowCustomer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8007/api/AllCustomer")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setShowCustomer(data.data);
      });
  }, []);


  return (
    <div className="viewleads-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>📋 CRM </h2>
        <nav>
          <ul>
            <li><Link to="/">🏠 Dashboard</Link></li>
            <li><Link to="/Product">📦 Products</Link></li>
            <li><Link to="/viewLeads">🧾 View Leads</Link></li>
            <li><Link to="/customer">👤 Customers</Link></li>
            {/* <li><Link to="/AddLead">➕ Add Lead</Link></li> */}
            <li><Link to="/ViewTicket">🎟️ Ticket</Link></li>
            <li><Link to={`/MyTickets/${localStorage.getItem("userId")}`}></Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
         <div className="header">
          <h1 style={{ margin: 0 }}>All Products</h1>
          {/* <Link to="/AddLead"  className="addLeadBtn">➕ Add Lead</Link> */}
        </div>
        <table className="lead-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Next Follow-up</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Assigner</th>
              <th colSpan={4}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showCustomer.map((v) => (
              <tr key={v._id}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td>{v.product?.title} - ₹{v.product?.Price}</td>
                <td>{new Date(v.nextFollowup).toLocaleDateString()}</td>
                <td>{v.remark}</td>
                <td>{v.status}</td>
                <td>{v.role}</td>
                <td><button className="btn btn-edit" onClick={() => navigate(`/EditCustomer/${v._id}`)}>✏️</button></td>
                {/* <td><button className="btn btn-delete" onClick={() => handleDelete(v._id)}>🗑️</button></td> */}
                <td><button className="btn btn-follow" onClick={() => navigate(`/Ticket/${v._id}`)}>🎟️</button></td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
