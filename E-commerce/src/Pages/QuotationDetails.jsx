import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideBar from "./SideBar";

export default function QuotationDetails() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewQuotationById/${id}`)
      .then((res) => res.json())
      .then((data) => setQuotation(data.data))
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!quotation) return <p>Loading...</p>;

  return (
    <div className="viewleads-container" style={{ display: "flex", minHeight: "100vh" }}>
  <SideBar />
  <div className="main-content" style={{ flex: 1, padding: "30px" }}>
    <div
      className="quotation-details"
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Link to="/ViewQuotation" style={{ textDecoration: "none", color: "#007bff" }}>
        ⬅ Back to Quotations
      </Link>

      <h2 style={{ marginTop: "20px", marginBottom: "10px", color: "#333" }}>
        🧾 Quotation Details
      </h2>

      <div style={{ marginBottom: "20px", lineHeight: "1.8" }}>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(quotation.quotationDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Lead:</strong> {quotation.lead?.name}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: quotation.status === "Pending" ? "#e65100" : "#2e7d32",
              fontWeight: "bold",
            }}
          >
            {quotation.status}
          </span>
        </p>
        <p>
          <strong>Created By:</strong> {quotation.createdBy?.name || "N/A"}
        </p>
        <p>
          <strong>Notes:</strong> {quotation.notes || "No notes"}
        </p>
      </div>

      <h3 style={{ marginBottom: "10px" }}>🛒 Products</h3>
      <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
        {quotation.items.map((item, i) => (
          <li key={i} style={{ marginBottom: "8px" }}>
            <strong>{item.product?.title || item.title}</strong> — Qty:{" "}
            {item.quantity}, ₹{item.price} each
            <br />
            <span style={{ color: "#888", fontSize: "14px" }}>
              Total: ₹{item.total}
            </span>
          </li>
        ))}
      </ul>

      <h3 style={{ color: "#007bff" }}>
        💰 Total Amount (incl. tax): ₹{quotation.totalAmount}
      </h3>
    </div>
  </div>
</div>

  );
}
