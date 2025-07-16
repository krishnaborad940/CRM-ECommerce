import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8007/api/ProductDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const imageUrl = product.Image?.startsWith("http")
    ? product.Image
    : `http://localhost:8007${product.Image || ""}`;

  return (
    <div className="container-scroller" style={{ display: "flex" }}>
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginLeft: '250px', marginTop: '40px' }}>
          <div className="content-wrapper d-flex justify-content-center">
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "1000px", borderRadius: "16px" }}>
              {/* Header Row */}
              <div className="d-flex align-items-center mb-3">
                <h4 className="fw-bold m-0">Product Details</h4>
                <Link to="/all-product" className="btn btn-outline-primary btn-sm" style={{ marginLeft: 'auto' }}>⬅ Back</Link>
              </div>

              <div className="row">
                {/* LEFT TEXT SIDE */}
                <div className="col-lg-8">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover" style={{ textAlign: 'left' }}>
                      <tbody>
                        <tr>
                          <th style={{ width: "180px" }}>Product Title:</th>
                          <td style={{textAlign:'left'}}>{product.title}</td>
                        </tr>
                        <tr>
                          <th>Category:</th>
                          <td style={{textAlign:'left'}}>{product.category}</td>
                        </tr>
                        <tr>
                          <th>Description:</th>
                          <td style={{ textAlign: 'left', whiteSpace: 'normal', wordBreak: 'break-word',lineHeight:'20px' }}>
  {product.description}
</td>
                        </tr>
                        <tr>
                          <th>Price:</th>
                          <td style={{textAlign:'left'}}>₹{product.Price}</td>
                        </tr>
                        <tr>
  <th>Stock:</th>
  <td style={{ textAlign: 'left' }}>
    <span className="badge  text-danger" style={{fontWeight:'600',fontSize:'13px'}}>
      {product.stock} left out of {product.IntialStock}
    </span>
  </td>
</tr>
                        <tr>
                          <th>Rating:</th>
                          <td style={{textAlign:'left'}}>⭐ {product.rate}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td style={{marginLeft:'-200px'}}> <Link to="/add-lead">
                    <button
                     className="btn btn-gradient-primary "
                    >
                      ➕ Add Lead
                    </button>
                  </Link></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                 
                </div>

                {/* RIGHT IMAGE SIDE */}
                <div className="col-lg-4 d-flex justify-content-center align-items-start mt-3 mt-lg-0">
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="img-fluid"
                    style={{
                      borderRadius: "12px",
                      width: "100%",
                      maxWidth: "280px",
                      objectFit: "cover",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
