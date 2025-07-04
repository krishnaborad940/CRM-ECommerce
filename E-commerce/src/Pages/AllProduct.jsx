import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import SideBar from "./SideBar";

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
      <SideBar />

      {/* Main content */}
      <div className="main" style={{ flex: 1, padding: "30px" }}>
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0 }}>🛍️ All Products</h1>
          <Link to="/addProduct" className="addLeadBtn1" >
            ➕ Add 
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {seeProduct.map((v) => {
            const imageUrl = v.Image?.startsWith("http")
              ? v.Image
              : `http://localhost:8007${v.Image || ""}`;

            return (
              <div
                key={v._id}
                className="card"
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: "20px",
                  textAlign: "center",
                  transition: "0.3s",
                  cursor: "pointer"
                }}
              >
                <Link to={`/ProductDetails/${v._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={imageUrl}
                    alt={v.title}
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <h3 style={{ marginTop: "15px", color: "#333" }}>{v.title}</h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    {v.description?.slice(0, 60)}...
                  </p>
                  <p><b>Category:</b> {v.category}</p>
                  <p><b>Price:</b> ₹{v.Price}</p>
                  <p><b>Stock:</b> {v.stock}</p>
                  <p style={{marginBottom:"20px"}}><b>Rating:</b> ⭐ {v.rate}</p>
                   </Link>
                  <a  href="/AddLead"style={{
                    // marginTop: "100px",
                    backgroundColor: "skyblue",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}>
                    ➕ Add Lead
                  </a>
               
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
