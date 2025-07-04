import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import SideBar from "./SideBar";

export default function AllProduct() {
  const [seeProduct, setSeeProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

      const filteredProducts = seeProduct.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
      });

      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ display: "flex", fontFamily: "sans-serif", minHeight: "100vh" }}>
             <SideBar />
      {/* Main content */}
            <div className="main" style={{ flex: 1, padding: "30px",marginTop:"50px" }}>
              <div className="header" style={{  display: "flex",justifyContent: "space-between",alignItems: "center", marginBottom: "20px",}} >
                    <h1 style={{ margin: 0 }}>🛍️ All Products</h1>
                    <Link to="/addProduct" className="addLeadBtn1" style={{backgroundColor:'green',color:'white',padding:'5px 20px',borderRadius:"10px"}}> ➕ Add </Link>
              </div>

              {/* Filters */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                      <input  type="text" placeholder="Search by title..." value={searchTerm}onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", flex: 1 }}/>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} >
                              <option value="">All Categories</option>
                              {[...new Set(seeProduct.map(p => p.category))].map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                              ))}
                      </select>
              </div>

              {/* Product Grid */}
              <div className="grid" style={{ display: "grid",gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",gap: "20px" }}>
                {displayedProducts.map((v) => {
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
                        <p style={{ marginBottom: "20px" }}><b>Rating:</b> ⭐ {v.rate}</p>
                      </Link>
                      <a href="/AddLead" style={{
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

              {/* Pagination */}
              <div style={{ marginTop: "30px", textAlign: "center" }}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{
                      padding: "8px 12px",
                      margin: "0 5px",
                      backgroundColor: currentPage === index + 1 ? "#3b82f6" : "#e5e7eb",
                      color: currentPage === index + 1 ? "#fff" : "#000",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
    </div>
  );
}
