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
    <div className="viewleads-container">
      <SideBar/>
      <div className="main-content">
        <div className="quotation-details">
      <Link to="/ViewQuotations">⬅ Back</Link>
      <h2>Quotation Details</h2>
      <p><strong>Date:</strong> {new Date(quotation.quotationDate).toLocaleDateString()}</p>
      <p><strong>Lead:</strong> {quotation.lead?.name}</p>
      <p><strong>Status:</strong> {quotation.status}</p>
      <p><strong>Created By:</strong> {quotation.createdBy?.name || "N/A"}</p>
      <p><strong>Notes:</strong> {quotation.notes}</p>
      
      <h3>Products</h3>
      <ul>
        {quotation.items.map((item, i) => (
          <li key={i}>
            {item.product?.title || item.title} - Qty: {item.quantity} - ₹{item.price} each (Total: ₹{item.total})
          </li>
        ))}
      </ul>

      <h3>Total Amount (incl. tax): ₹{quotation.totalAmount}</h3>
    </div>
      </div>
    </div>
  );
}
