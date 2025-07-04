import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";

export default function PaymentDetails() {
  const [Payment, setPayment] = useState(null); // Single product object
  const { id } = useParams(); // UseParams should be called like a function

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewPaymentDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setPayment(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Payment) return <p>Loading...</p>;

//   const imageUrl = Payment.customer?.product?.Image?.startsWith("http")
//     ? Payment.customer?.product?.Image
//     : `http://localhost:8007${Payment.customer?.product?.Image || ""}`;

  return (
    <div className="viewPayments-container" style={{ display: "flex", minHeight: "100vh" }}>
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
          <Link to="/ViewPayment" style={{ textDecoration: "none", color: "#007bff" }}>
            ⬅ Back to Payment
          </Link>

          <h2 style={{ marginTop: "20px", marginBottom: "10px", color: "#333" }}>
            🛍️ {Payment?.name}
          </h2>

          {/* <img
            src={imageUrl}
            alt={Payment.customer?.product?.name}
            style={{ width: "50%", maxHeight: "300px",objectFit:'contain', borderRadius: "10px" }}
          /> */}

          <div style={{ marginTop: "20px", lineHeight: "1.8", fontSize: "16px" }}>
            <p><strong>Date:</strong> {Payment?.createdAt}</p>
            <p><strong>Product:</strong>  {Payment?.saleId?.product?.map((item, i) => (
                      <li key={i}>
                                {item?.productId?.name || "Product"} x {item?.quantity} = ₹{item?.price}
                     </li>
                    ))}</p>
            <p><strong>Customer Name:</strong> {Payment.customerId?.name}</p>
            {/* <p><strong>Next-FollowUp:</strong> {Payment?.nextFollowup}</p> */}
            <p><strong>Total:</strong>  {Payment?.saleId?.totalAmount}</p>
            <p><strong>Payment:</strong>  {Payment.status}</p>
            <p><strong>Create by:</strong>  {JSON.parse(localStorage.getItem("user"))?.userName}</p>


          </div>

       
        </div>
      </div>
    </div>
  );
}
