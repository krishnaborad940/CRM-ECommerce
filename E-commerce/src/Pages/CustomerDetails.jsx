import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";

export default function CustomerDetails() {
  const [Customer, setCustomer] = useState(null);
  const { id } = useParams(); 
  const navigate=useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewCustomerDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCustomer(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Customer) return <p>Loading...</p>;

  const imageUrl = Customer.product?.Image?.startsWith("http")
    ? Customer.product?.Image
    : `http://localhost:8007${Customer.product?.Image || ""}`;

  return (
    <div className="viewCustomers-container" style={{ display: "flex", minHeight: "100vh" }}>
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
                          <Link to="/Customer" style={{ textDecoration: "none", color: "#007bff" }}>
                            ⬅ Back to Customer
                          </Link>

                          <h2 style={{ marginTop: "20px", marginBottom: "10px", color: "#333" }}>
                            🛍️ {Customer?.name}
                          </h2>

                          <img
                            src={imageUrl}
                            alt={Customer.product?.name}
                            style={{ width: "50%", maxHeight: "300px",objectFit:'contain', borderRadius: "10px" }}
                          />

                          <div style={{ marginTop: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                            <p><strong>Email:</strong> {Customer?.email}</p>
                            <p><strong>Phone:</strong> {Customer?.phone}</p>
                            <p><strong>product:</strong> {Customer?.product?.title}-₹{Customer.product?.Price}</p>
                            {/* <p><strong>Next-FollowUp:</strong> {Customer?.nextFollowup}</p> */}
                            <p><strong>Remark:</strong>  {Customer?.remark}</p>
                            <p><strong>Status:</strong>  {Customer?.status}</p>
                            <p><strong>Assigner:</strong>  {Customer?.role}</p>
                            <p><button className="btn btn-follow" onClick={() => navigate(`/Ticket/${Customer._id}`)}>🎟️</button></p>

                          </div>

              
                </div>
          </div>
    </div>
  );
}
