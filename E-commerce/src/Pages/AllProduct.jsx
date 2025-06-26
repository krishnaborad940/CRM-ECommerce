import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'

export default function AllProduct() {
  const [seeProduct, setSeeProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8007/api/showProduct")
      .then((res) => res.json())
      .then((data) => {
        setSeeProduct(data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div style={{ display: "flex", fontFamily: "sans-serif", minHeight: "100vh" }}>
      {/* Sidebar */}
     <div className="sidebar">
        <h2>Menu</h2>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">🛒 Dashbord</Link></li>
          <li><Link to="/Product" className="nav-link">🛒 Product</Link></li>
          <li><Link to="/viewLeads" className="nav-link">📋  Leads</Link></li>
          <li><Link to="/customer" className="nav-link">👤 Customers</Link></li>
          <li><Link to="/ViewTicket">🎟️ Ticket</Link></li>
          <li><Link to={`/MyTickets/${localStorage.getItem("userId")}`}></Link></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main">
        <div className="header">
          <h1 style={{ margin: 0 }}>All Products</h1>
          <Link to="/Product"  className="addLeadBtn">➕ Add Product</Link>
        </div>

        {/* Product Grid */}
        <div className="grid">
          {seeProduct.map((v) => {
            const imageUrl = v.Image?.startsWith("http")
              ? v.Image
              : `http://localhost:8007${v.Image || ""}`;

            return (
              <div key={v._id} className="card">
                <img src={imageUrl} alt={v.title} className="image" />
                <h3>{v.title}</h3>
                <p className="desc">{v.description?.slice(0, 60)}...</p>
                <p><b>Category:</b> {v.category}</p>
                <p><b>Price:</b> ₹{v.Price}</p>
                <p><b>Stock:</b> {v.stock}</p>
                <p><b>Rating:</b> ⭐ {v.rate}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

