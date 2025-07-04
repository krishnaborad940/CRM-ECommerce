import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";


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
                   <td style={{color:"green"}}>{payment.saleId?.PaymentStatus}</td>
                   <td><Link to={`/PaymentDetails/${payment._id}`}><button className="btn btn-edit"><i class="ri-eye-fill"></i></button></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
  </div>
 </div>
  </>
}