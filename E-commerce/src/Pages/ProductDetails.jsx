import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";

export default function ProductDetails() {
  const [product, setProduct] = useState(null); // Single product object
  const { id } = useParams(); // UseParams should be called like a function

  useEffect(() => {
    fetch(`http://localhost:8007/api/ProductDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setProduct(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const imageUrl = product.Image?.startsWith("http")
    ? product.Image
    : `http://localhost:8007${product.Image || ""}`;

  return (
    <div className="viewleads-container" style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <div className="main-content" style={{ flex: 1, padding: "30px" }}>
        <div
          className="product-details"
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Link to="/Product" style={{ textDecoration: "none", color: "#007bff" }}>
            ⬅ Back to Products
          </Link>

          <h2 style={{ marginTop: "20px", marginBottom: "10px", color: "#333" }}>
            🛍️ {product.title}
          </h2>

          <img
            src={imageUrl}
            alt={product.title}
            style={{ width: "100%", maxHeight: "300px",objectFit:'contain', borderRadius: "10px" }}
          />

          <div style={{ marginTop: "20px", lineHeight: "1.8", fontSize: "16px" }}>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ₹{product.Price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Rating:</strong> ⭐ {product.rate}</p>
          </div>

         <a href="/AddLead">
             <button 
            style={{
              marginTop: "20px",
              backgroundColor: "#00bcd4",
              border: "none",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ➕ Add Lead
          </button>
         </a>
        </div>
      </div>
    </div>
  );
}
