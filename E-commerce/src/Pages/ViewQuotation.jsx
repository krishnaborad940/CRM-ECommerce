import React, { useEffect, useState } from "react";
import "../App.css"; 
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

export default function ViewQuotations() {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewQuotation")
      .then((res) => res.json())
      .then((data) => {
        setQuotations(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  const handleSales = (quote) => {
    fetch(`http://localhost:8007/api/convertSlaes/${quote._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        QuotationId: quote._id,
        totalAmount: quote.totalAmount,
        customerId: quote.customerId?._id, // Optional, if available
        createBy: quote.createdBy?._id,
        PaymentStatus: "Pending",
        saleDate: new Date(),
        products: quote.items.map((item) => ({
          productId: item.product?._id || item.productId,
          quantity: item.quantity,
          Price: item.price,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Sale Added Successfully");
        console.log(data);
        setQuotations((prev) =>
          prev.map((q) =>
            q._id === quote._id ? { ...q, status: "Approved" } : q
          )
        );
      })
      .catch((err) => {
        console.error("Sale Add Error:", err);
        alert("Failed to add sale");
      });
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="header">
          <h2 className="heading">All Quotations</h2>
          <Link to="/Quotation" className="addQuotationBtn">
            ➕ Add Quotation
          </Link>
        </div>

        <div >
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Lead</th>
                <th>Products</th>
                <th>Total (₹)</th>
                <th>Status</th>
                <th>Details</th>
                <th>Sale</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((quote) => (
                <tr key={quote._id}>
                  <td>
                    {new Date(quote.quotationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span>
                      {quote.lead?.Image && (
                        <img
                          src={
                            quote.lead.Image.startsWith("http")
                              ? quote.lead.Image
                              : `http://localhost:8007${quote.lead.Image}`
                          }
                          alt="Lead"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "6px",
                          }}
                        />
                      )}
                      {quote.lead?.name || "N/A"}
                    </span>
                  </td>
                  <td>
                    {quote.items.map((item, i) => (
                      <div key={i}>
                        {item.product?.title || item.title} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{quote.totalAmount}</td>
                  <td>
                    <span
                      className={`status-badge ${quote.status?.toLowerCase()}`}
                    >
                      {quote.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/QuotationDetails/${quote._id}`}>
                      <button
                        className="btn btn-edit"
                        style={{ fontSize: "18px", color: "green" }}
                      >
                        <i className="ri-eye-fill"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    {quote.status === "Approved" ? (
                      <span className="converted">✔️</span>
                    ) : (
                      <button
                        className="add-sale-btn"
                        onClick={() => handleSales(quote)}
                      >
                        ➕ Add to Sales
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
