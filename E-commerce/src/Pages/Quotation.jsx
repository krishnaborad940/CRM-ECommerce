import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "../App.css";

export default function Quotation() {
  const { id } = useParams(); // Lead ID from URL
  const navigate = useNavigate();

  const [status, setStatus] = useState("Pending");
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([
    { product: "", title: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [quotationDate, setQuotationDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("http://localhost:8007/api/showproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "product") {
      const selectedProduct = products.find((p) => p._id === value);
      if (selectedProduct) {
        updatedItems[index].title = selectedProduct.title;
        updatedItems[index].price = selectedProduct.Price;
        updatedItems[index].total = updatedItems[index].quantity * selectedProduct.Price;
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
      { product: "", title: "", quantity: 1, price: 0, total: 0 },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const calculateTotalAmount = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    return subtotal + tax;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalAmount();

    const payload = {
      quotationDate,
      items,
      totalAmount,
      notes,
      status,
    };

    const res = await fetch(`http://localhost:8007/api/AddQuatation/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Quotation created successfully!");
      navigate("/ViewQuotations");
    } else {
      alert("Failed to create quotation");
    }
  };

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="quotation-form">
          <h2 className="form-heading">📄 Create Quotation</h2>
          <form onSubmit={handleSubmit}>
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

            <button type="button" onClick={addNewRow} className="add-btn">
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

            <h4>Total Amount: ₹{calculateTotalAmount()}</h4>

            <button type="submit" className="submit-btn">
              ✅ Submit Quotation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
