import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'
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
     <SideBar/>
      {/* Main content */}
      <div className="main">
        <div className="header">
          <h1 style={{ margin: 0 }}>All Products</h1>
          <Link to="/addProduct"  className="addLeadBtn">➕ Add Product</Link>
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

