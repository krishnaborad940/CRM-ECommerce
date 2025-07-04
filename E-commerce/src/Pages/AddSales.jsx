import React, { useEffect, useState } from "react";
import "../App.css";
import SideBar from '../Pages/SideBar'

export default function AddSales() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [productItems, setProductItems] = useState([
    { productId: "", quantity: 1, Price: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  let user=JSON.parse(localStorage.getItem("user"))?.userId
  let userId=user?.userId
      useEffect(() => {
        fetch("http://localhost:8007/api/AllCustomer")
          .then((res) => res.json())
          .then((data) => setCustomers(data.data));

        fetch("http://localhost:8007/api/showProduct")
          .then((res) => res.json())
          .then((data) => setProducts(data.data));
      }, []);

      useEffect(() => {
          const total = productItems.reduce(
            (acc, item) => acc + item.quantity * item.Price,
            0
          );
          setTotalAmount(total);
      }, [productItems]);

      const handleProductChange = (index, field, value) => {
            const newItems = [...productItems];
            if (field === "productId") {
              const selectedProduct = products.find((p) => p._id === value);
              newItems[index].productId = value;
              newItems[index].Price = selectedProduct ? selectedProduct.Price : 0;
            } else {
              newItems[index][field] = Number(value);
            }
            setProductItems(newItems);
      };

      const addProductItem = () => {
        setProductItems([
          ...productItems,
          { productId: "", quantity: 1, Price: 0 },
        ]);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          customerId: selectedCustomer,
          products: productItems,
          totalAmount,
          createBy:userId
        };
        const res = await fetch("http://localhost:8007/api/AddSales", {
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
   <div className="viewleads-container">
         <SideBar/>
         <div className="main-container">
              <div className="add-sales-container">
                  <h2>Add Sale</h2>
                  <form className="add-sales-form" onSubmit={handleSubmit}>
                        <label>Customer:</label>
                        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required >
                              <option value="">-- Select Customer --</option>
                                {customers.map((c) => (
                                  <option key={c._id} value={c._id}>
                                    {c.name}
                                  </option>
                                ))}
                        </select>

                        <h4>Products</h4>
                          {productItems.map((item, index) => (
                            <div className="product-item" key={index}>
                              <select
                                value={item.productId}
                                onChange={(e) =>
                                  handleProductChange(index, "productId", e.target.value)
                                }
                                required
                              >
                                <option value="">Select Product</option>
                                {products.map((p) => (
                                  <option key={p._id} value={p._id}>
                                    {p.title} - ₹{p.Price}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                  handleProductChange(index, "quantity", e.target.value)
                                }
                                placeholder="Qty"
                                required
                              />

                              <input
                                type="number"
                                value={item.Price}
                                min="0"
                                onChange={(e) =>
                                  handleProductChange(index, "Price", e.target.value)
                                }
                                placeholder="Price"
                                required
                              />
                            </div>
                          ))}
                          <button type="button" onClick={addProductItem} className="add-btn">+ Add Product </button>
                          <div className="total-amount">Total: ₹{totalAmount}</div>
                            <button type="submit" className="submit-btn">  Submit Sale</button>
                  </form>
              </div>
         </div>
   </div>
  );
}
