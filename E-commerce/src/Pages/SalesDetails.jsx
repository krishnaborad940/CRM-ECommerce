import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";

export default function SalesDetails() {
  const [Sales, setSales] = useState(null); // Single product object
  const { id } = useParams(); // UseParams should be called like a function

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewSalesDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setSales(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Sales) return <p>Loading...</p>;

//   const imageUrl = Sales.customer?.product?.Image?.startsWith("http")
//     ? Sales.customer?.product?.Image
//     : `http://localhost:8007${Sales.customer?.product?.Image || ""}`;

  return (
    <div className="viewSaless-container" style={{ display: "flex", minHeight: "100vh" }}>
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
          <Link to="/ViewSales" style={{ textDecoration: "none", color: "#007bff" }}>
            ⬅ Back to Sales
          </Link>

          <h2 style={{ marginTop: "20px", marginBottom: "10px", color: "#333" }}>
            🛍️ {Sales?.name}
          </h2>

          {/* <img
            src={imageUrl}
            alt={Sales.customer?.product?.name}
            style={{ width: "50%", maxHeight: "300px",objectFit:'contain', borderRadius: "10px" }}
          /> */}

          <div style={{ marginTop: "20px", lineHeight: "1.8", fontSize: "16px" }}>
            <p><strong>Date:</strong> {Sales?.createdAt}</p>
            <p><strong>Product:</strong>  {Sales.product.map((item, i) => (
                      <div key={i}>
                        {item.productId?.title || "Product"} x {item.quantity} = ₹
                        {item.price}
                      </div>
                    ))}</p>
            <p><strong>Customer Name:</strong> {Sales.customerId?.name}</p>
            {/* <p><strong>Next-FollowUp:</strong> {Sales?.nextFollowup}</p> */}
            <p><strong>Total:</strong>  {Sales?.totalAmount}</p>
            <p><strong>Payment:</strong>  {Sales.PaymentStatus}</p>
            <p><strong>Create by:</strong>  {JSON.parse(localStorage.getItem("user"))?.userName}</p>


          </div>

       
        </div>
      </div>
    </div>
  );
}
