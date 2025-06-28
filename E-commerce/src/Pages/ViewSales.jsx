import React, { useEffect, useState } from "react";
import "../App.css";
import SideBar from "./SideBar";

export default function ViewSales() {
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewSales")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setSalesList(data.data)
  })
      .catch((err) => console.log("Error:", err));
  }, []);

  const handlePaid=(id)=>{
    fetch(`http://localhost:8007/api/ConvertPaid/${id}`,{
        method:'POST'
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        setSalesList((pre)=>
        pre.map((item)=>(
            item._id=== id ?{...item,PaymentStatus:'Paid'}:item
        )))
    })
  }

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="header">
          <h2 className="heading">All Sales</h2>
        </div>

        <div className="quotation-container">
          <table className="quotation-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                {/* <th>Quotation ID</th> */}
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
                  <td>{sale.QuotationId?.lead?.name || "N/A"}</td>
                  {/* <td>{sale.QuotationId?._id || "N/A"}</td> */}
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
                        {
                            sale.PaymentStatus === "Paid" ? (
                            <span className="status-badge-Paid">Paid</span>
                            ) : (
                            <span className="status-badge-Pending">Pending</span>
                            )
                        }
                </td>
                  <td>{sale.createBy?.name || "N/A"}</td>
                  <td>   {sale.PaymentStatus === "Paid" ? (
                      <span className="converted">✔️</span>
                    ) : (
                      <button  className="add-sale-btn"  onClick={()=>handlePaid(sale._id)}>➕ Paid</button>
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
