import React, { useEffect, useState } from "react";
import "../App.css";
import SideBar from "./SideBar";

export default function ViewSales() {
  const [salesList, setSalesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewSales")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setSalesList(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  const openPaymentModal = (saleId) => {
    const found = salesList.find((s) => s._id === saleId);
  setSelectedSaleId(saleId);
  setSelectedSale(found); 
  setShowModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = formData.get("amount");
    const method = formData.get("method");

    fetch("http://localhost:8007/api/AddPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saleId: selectedSaleId,
        customerId: selectedSale?.customerId?._id,
        amount,
        method,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Payment added successfully");
        setShowModal(false);
        setSalesList((pre) =>
          pre.map((item) =>
            item._id === selectedSaleId
              ? { ...item, PaymentStatus: "Paid" }
              : item
          )
        );
      })
      .catch((err) => console.log(err));
  };


  const totalPaid = salesList
  .filter((sale) => sale.PaymentStatus === "Paid")
  .reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);

const totalPending = salesList
  .filter((sale) => sale.PaymentStatus !== "Paid")
  .reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="header">
          <h2 className="heading">All Sales</h2>
        </div>

{/* PaymentForm */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Add Payment</h3>
             <form onSubmit={handlePaymentSubmit}>
  <label>
    Amount:
    <input type="number" name="amount" defaultValue={selectedSale?.totalAmount} required />
  </label>

  <label>
    Method:
    <select
      name="method"
      value={selectedMethod}
      onChange={(e) => setSelectedMethod(e.target.value)}
      required
    >
      <option value="">-- Select Method --</option>
      <option value="UPI">UPI</option>
      <option value="Cash">Cash</option>
      <option value="Bank">Bank</option>
    </select>
  </label>

  {/* Conditional fields based on method */}
  {selectedMethod === "UPI" && (
    <input type="text" name="upiId" placeholder="Enter UPI ID" required />
  )}
  {selectedMethod === "Bank" && (
    <>
      <input type="text" name="bankName" placeholder="Bank Name" required />
      <input type="text" name="txnId" placeholder="Transaction ID" required />
    </>
  )}
  {selectedMethod === "Cash" && (
    <p style={{ fontStyle: "italic" }}>Cash will be collected manually.</p>
  )}

  <div style={{ marginTop: "10px" }}>
    <button type="submit">Submit</button>
    <button type="button" onClick={() => setShowModal(false)}>
      Cancel
    </button>
  </div>
</form>
            </div>
          </div>
        )}



        <div className="quotation-container">
          <table className="quotation-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total (₹)</th>
                <th>Payment</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {salesList.map((sale) => (
                <tr key={sale._id}>
                  <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                  <td>{sale.QuotationId?.lead?.name || sale.customerId?.name}</td>
                  <td>
                    {sale.product.map((item, i) => (
                      <div key={i}>
                        {item.productId?.title || "Product"} x {item.quantity} = ₹
                        {item.price}
                      </div>
                    ))}
                  </td>
                  <td>{sale.totalAmount}</td>
                  <td>
                    {sale.PaymentStatus === "Paid" ? (
                      <span className="status-badge-Paid">Paid</span>
                    ) : (
                      <span className="status-badge-Pending">Pending</span>
                    )}
                  </td>
                  <td>{sale.createBy?.name || "N/A"}</td>
                  <td>
                    {sale.PaymentStatus === "Paid" ? (
                      <span className="converted">✔️</span>
                    ) : (
                      <button
                        className="add-sale-btn"
                        onClick={() => openPaymentModal(sale._id)}
                      >
                        ➕ Add Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

       
</div>
   <div style={{ marginBottom: "20px", display: "flex", gap: "40px" }}>
  <div style={{ background: "#e6ffed", padding: "10px 20px", borderRadius: "8px", color: "#2e7d32" }}>
    <strong>✅ Total Paid: ₹{totalPaid}</strong>
  </div>
  <div style={{ background: "#fff3e0", padding: "10px 20px", borderRadius: "8px", color: "#e65100" }}>
    <strong>⏳ Total Pending: ₹{totalPending}</strong>
  </div>
        </div>
      </div>
    </div>
  );
}
