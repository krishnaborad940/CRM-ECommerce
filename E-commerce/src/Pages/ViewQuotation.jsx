import React, { useEffect, useState } from "react";
import "../App.css"; 
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

export default function ViewQuotations() {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewQuotation")
      .then((res) => res.json())
      .then((data) => setQuotations(data.data))
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div className="viewleads-container">
     <SideBar/>
        <div className="main-content">
             <div className="header">
                         <h2 className="heading">All Quotations</h2>
                        {/* <Link to="/Quotation" className="addLeadBtn">➕ Add Quotation</Link> */}
                      </div>
                 <div className="quotation-container">
     
      <table className="quotation-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Lead</th>
            <th>Products</th>
            <th>Total (₹)</th>
            <th>Status</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quote) => (
            <tr key={quote._id}>
              <td>{new Date(quote.quotationDate).toLocaleDateString()}</td>
              <td>{quote.lead?.name || "N/A"}</td>
              <td>
                {quote.items.map((item, i) => (
                  <div key={i}>
                    {item.product?.title || item.title} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>{quote.totalAmount}</td>
              <td>
                <span className={`status-badge ${quote.status?.toLowerCase()}`}>
                  {quote.status}
                </span>
              </td>
              <td>{quote.createdBy?.name || "N/A"}</td>
              <td><Link to={`/QuotationDetails/${quote._id}`}>View</Link></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    </div>
   
  );
}
