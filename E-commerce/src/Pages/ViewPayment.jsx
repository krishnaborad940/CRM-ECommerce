import { useEffect, useState } from "react";
import SideBar from "./SideBar";


export default function ViewPayment(){
  const [payments,setPayments]=useState([])
  useEffect(()=>{
    fetch("http://localhost:8007/api/ViewPayments")
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.data)
      setPayments(data.data)
    })
  },[])
  return <>
 <div className="viewleads-container">
  <SideBar/>
  <div className="main-content">
         <table className="quotation-table">
            <thead>
              <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Amount (₹)</th>
              <th>Method</th>
              <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{new Date(payment.receivedDate).toLocaleDateString()}</td>
                  <td>{payment.customerId?.name }</td>
                  <td>{payment.amount}
                  </td>
                  <td>{payment.method}</td>
                   <td>{payment.saleId?.PaymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
  </div>
 </div>
  </>
}