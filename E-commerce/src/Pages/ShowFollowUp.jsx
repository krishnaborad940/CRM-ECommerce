import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; 

export default function ShowFollowUp() {
  const [showLeads, setShowLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8007/api/AllFollowUp")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setShowLeads(data.data);
      });
  }, []);
//     useEffect(() => {
//     fetch("http://localhost:8007/api/AllCustomer")
//       .then((res) => res.json())
//       .then((data) => {
//         setShowLeads(data.data);
//       });
//   }, []);

  // const handleDelete = (_id) => {
  //   fetch(`http://localhost:8007/api/DeleteLead/${_id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setShowLeads((pre) => pre.filter((lead) => lead._id !== _id));
  //     });
  // };

  const handleConvert = (_id) => {
    fetch(`http://localhost:8007/api/AddClosed/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Converted Successfully");
        setShowLeads((pre) =>
          pre.map((lead) =>
            lead._id === _id ? { ...lead, status: "Closed" } : lead
          )
        );
      });
  };
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
            <li> <Link to={`/MyTickets/${localStorage.getItem("userId")}`}>My Ticket</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
         <div className="header">
          <h1 style={{ margin: 0 }}>All Products</h1>
          <Link to="/ViewLeads"  className="addLeadBtn">Back Lead</Link>
        </div>
        <table className="lead-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Product</th>
              <th>Next Follow-up</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Assigner</th>
              <th colSpan={4}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showLeads.map((v) => (
              <tr key={v._id}>
                <td>{v.Lead?.name}</td>
                <td>{v.Lead?.email}</td>
                <td>{v.product?.title} - ₹{v.product?.Price}</td>
                <td>{new Date(v.nextFollowup).toLocaleDateString()}</td>
                <td>{v.remark}</td>
                <td>{v.status}</td>
                <td>{v.Lead?.role}</td>
                <td><button className="btn btn-follow" onClick={() => navigate(`/FollowUp/${v._id}`)}>📞</button></td>
                <td>
                  {v.status === "Closed" ? (
                    <span className="converted">✔️</span>
                  ) : (
                    <button className="btn btn-convert" onClick={() => handleConvert(v._id)}>Closed</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
