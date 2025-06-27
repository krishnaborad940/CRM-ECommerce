import React, { useEffect, useState } from "react";

export default function AddSales() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [productItems, setProductItems] = useState([
    { productId: "", quantity: 1, price: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load customers and products
  useEffect(() => {
    fetch("http://localhost:8007/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.data));

    fetch("http://localhost:8007/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  // Calculate total amount
  useEffect(() => {
    const total = productItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  }, [productItems]);

  const handleProductChange = (index, field, value) => {
    const newItems = [...productItems];
    newItems[index][field] = field === "quantity" || field === "price" ? Number(value) : value;
    setProductItems(newItems);
  };

  const addProductItem = () => {
    setProductItems([...productItems, { productId: "", quantity: 1, price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customerId: selectedCustomer,
      products: productItems,
      totalAmount,
    };

    const res = await fetch("http://localhost:8007/api/addSale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Sale added successfully!");
    } else {
      alert("Error: " + result.msg);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Sale</h2>
      <form onSubmit={handleSubmit}>
        <label>Customer:</label>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
          <option value="">Select</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <hr />
        <h4>Products</h4>
        {productItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.productId}
              onChange={(e) => handleProductChange(index, "productId", e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>

            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
              placeholder="Qty"
              required
            />

            <input
              type="number"
              value={item.price}
              min="0"
              onChange={(e) => handleProductChange(index, "price", e.target.value)}
              placeholder="Price"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addProductItem}>+ Add Product</button>

        <h4>Total: ₹{totalAmount}</h4>
        <button type="submit">Submit Sale</button>
      </form>
    </div>
  );
}
