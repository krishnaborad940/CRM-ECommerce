import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; 
import SideBar from "./SideBar";

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
         <SideBar/>
      {/* Main Content */}
          <main className="main-content">
                <div className="header">
                    <h1 style={{ margin: 0 }}>All Products</h1>
                    <Link to="/AddSales"  className="addLeadBtn">➕ Add sale</Link>
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
                    <td><Link to={`/CustomerDetails/${v._id}`}  ><button className="btn btn-edit" style={{color:"green",fontSize:"18px"}}><i class="ri-eye-fill"></i></button></Link><Link/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
    </div>
  );
}
