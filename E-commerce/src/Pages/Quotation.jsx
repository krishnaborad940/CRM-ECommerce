import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function Quotation() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [leadId, setLeadId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([
    { product: "", title: "", quantity: 1, price: 0, total: 0, Image: "" },
  ]);
  const [quotationDate, setQuotationDate] = useState("");
  const [notes, setNotes] = useState("");
  const [applyDiscount, setApplyDiscount] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8007/api/showproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));

    fetch("http://localhost:8007/api/ViewLead")
      .then((res) => res.json())
      .then((data) => setLeads(data.data));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "product") {
      const selectedProduct = products.find((p) => p._id === value);
      if (selectedProduct) {
        updatedItems[index].title = selectedProduct.title;
        updatedItems[index].price = selectedProduct.Price;
        updatedItems[index].Image = selectedProduct.Image || "";
        updatedItems[index].total =
          updatedItems[index].quantity * selectedProduct.Price;
      }
    }

    if (field === "quantity" || field === "price") {
      const price = parseFloat(updatedItems[index].price) || 0;
      const qty = parseInt(updatedItems[index].quantity) || 1;
      updatedItems[index].total = price * qty;
    }

    setItems(updatedItems);
  };

  const addNewRow = () => {
    setItems([
      ...items,
      { product: "", title: "", quantity: 1, price: 0, total: 0, Image: "" },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const discount = applyDiscount ? (subtotal + tax) * 0.05 : 0;
    const total = subtotal + tax - discount;
    return { subtotal, tax, discount, total };
  };

  const { subtotal, tax, discount, total } = calculateTotals();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      leadId,
      quotationDate,
      items,
      totalAmount: total,
      notes,
      status,
    };

    const res = await fetch("http://localhost:8007/api/AddQuatation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Quotation created successfully!");
      navigate("/ViewQuotation");
    } else {
      alert("Failed to create quotation");
    }
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div
          className="main-panel"
          style={{ marginLeft: "250px", marginTop: "40px" }}
        >
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title" style={{ marginLeft: "60px" }}>
                ➕ Add Quotation
              </h3>
                <a className="btn-gradient-primary p-2 rounded" style={{textDecoration:'none'}}>
                  <Link to="/view-quotation" style={{ color: "white",textDecoration:'none' }}>
                    📄 View All Quotation
                  </Link>
                </a>
            </div>

            <form onSubmit={handleSubmit} className="lead-form px-4">
              <label>Select Lead</label>
              <select
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                required
              >
                <option value="">-- Select Lead --</option>
                {leads.map((lead) => (
                  <option key={lead._id} value={lead._id}>
                    {lead.name}
                  </option>
                ))}
              </select>

              <label>Quotation Date</label>
              <input
                type="date"
                value={quotationDate}
                onChange={(e) => setQuotationDate(e.target.value)}
                required
              />

              {items.map((item, index) => (
                <div className="quotation-item" key={index}>
                  <label>Product</label>
                  <select
                    value={item.product}
                    onChange={(e) =>
                      handleItemChange(index, "product", e.target.value)
                    }
                    required
                  >
                    <option value="">--Select Product--</option>
                    {products.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>

                  <label>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />

                  <label>Price (₹)</label>
                  <input type="number" value={item.price} readOnly />

                  <label>Total (₹)</label>
                  <input type="number" value={item.total} readOnly />

                  {item.Image && (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={`http://localhost:8007${item.Image}`}
                        alt="Product"
                        width="80"
                        height="80"
                        style={{ borderRadius: "6px" }}
                      />
                    </div>
                  )}

                  {items.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeRow(index)}
                    >
                      ❌ Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addNewRow}
                className="add-btn btn-gradient-info my-2"
              >
                ➕ Add Product
              </button>

              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">--select--</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>

              <label className="mt-3">
                <input
                  type="checkbox"
                  checked={applyDiscount}
                  onChange={(e) => setApplyDiscount(e.target.checked)}
                />{" "}
                Apply 5% Discount
              </label>

              <div className="summary my-4">
                <h5>Subtotal: ₹{subtotal.toFixed(2)}</h5>
                <h5>Tax (10%): ₹{tax.toFixed(2)}</h5>
                {applyDiscount && (
                  <h5 style={{ color: "green" }}>
                    Discount (5%): - ₹{discount.toFixed(2)}
                  </h5>
                )}
                <h4>Total Amount: ₹{total.toFixed(2)}</h4>
              </div>

              <button type="submit" className="submit-btn btn-gradient-primary">
                ✅ Submit Quotation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
