import React, { useEffect, useState } from "react";
import "../App.css";
import SideBar from '../Pages/SideBar'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function AddSales() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productItems, setProductItems] = useState([
    { productId: "", quantity: 1, price: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    customerId: yup.string().required("Please Select Customer"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user?.userId;

  useEffect(() => {
    fetch("http://localhost:8007/api/AllCustomer")
      .then((res) => res.json())
      .then((data) => setCustomers(data.data));

    fetch("http://localhost:8007/api/showProduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

 useEffect(() => {
  const subtotal = productItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = subtotal * 0.10; // 10% tax
  const totalWithTax = subtotal + tax;
  setTotalAmount(Number(totalWithTax.toFixed(2))); // optional rounding
}, [productItems]);


  const handleProductChange = (index, field, value) => {
    const newItems = [...productItems];
    if (field === "productId") {
      const selectedProduct = products.find((p) => p._id === value);
      newItems[index].productId = value;
      newItems[index].price = selectedProduct ? selectedProduct.Price : 0;
    } else {
      newItems[index][field] = Number(value);
    }
    setProductItems(newItems);
  };

  const addProductItem = () => {
    setProductItems([
      ...productItems,
      { productId: "", quantity: 1, price: 0 },
    ]);
  };

  const onsubmit = async (data) => {
    const payload = {
      customerId: data.customerId,
      product: productItems,
      totalAmount,
      createBy: userId,
    };

    const res = await fetch("http://localhost:8007/api/AddSales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      navigate("/view-sale");
    } else {
      alert("Error: " + result.error || result.msg || "Something went wrong");
    }
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginLeft: '250px',marginTop:'40px' }}>
          <div className="content-wrapper">
            <div className="">
              <h2>Add Sale</h2>
              <form className="lead-form" onSubmit={handleSubmit(onsubmit)}>
                {/* Customer Dropdown */}
                <label>Customer:</label>
                <select name="customerId" {...register("customerId")}>
                  <option value="">-- Select Customer --</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.customerId && (
                  <p style={{ color: "red" }}>{errors.customerId.message}</p>
                )}

                <h4>Products</h4>
                {productItems.map((item, index) => (
                  <div className="product-item" key={index}>
                    {/* Product Dropdown */}
                    <select
                      value={item.productId}
                      onChange={(e) =>
                        handleProductChange(index, "productId", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Product</option>
                    {products.map((p) => (
  <option
    key={p._id}
    value={p._id}
    disabled={p.stock === 0}
  >
    {p.title} - ₹{p.Price} {p.stock === 0 ? "(Out of Stock)" : ""}
  </option>
))}
                    </select>

                    {/* Quantity Input */}
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

                    {/* Price Input */}
                    <input
                      type="number"
                      value={item.price}
                      min="0"
                      onChange={(e) =>
                        handleProductChange(index, "price", e.target.value)
                      }
                      placeholder="Price"
                      required
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addProductItem}
                  className="add-btn"
                >
                  + Add Product
                </button>

               <div className="total-amount">
  Subtotal: ₹{productItems.reduce((acc, item) => acc + item.quantity * item.price, 0)} <br />
  Tax (10%): ₹{(totalAmount * 0.10).toFixed(2)} <br />
  <strong>Total with Tax: ₹{totalAmount}</strong>
</div>


                <button type="submit" className="btn-gradient-primary w-25">
                  Submit Sale
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
