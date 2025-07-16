import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import Header from "./Header";


export default function ViewPayment(){
  const [payments,setPayments]=useState([])
  const paidCount = payments.filter(p => p.status === "Paid").length;
const pendingCount = payments.filter(p => p.status === "Partial" || p.status === "Pending").length;
const [planFilter,setPlanFilter]=useState("")
const [searchTerm,setSearchTerm]=useState('');

const filterPayment=payments.filter((payment)=>{
  const matchesPlan= planFilter ?payment.method === planFilter :true;
  const name=payment.customerId?.lead?.name?.toLowerCase()|| '';
  const search=searchTerm?.toLowerCase() || '';
  const matchesSearch=name.includes(search);
  return matchesPlan && matchesSearch
})
const totalPaidAmount = payments
  .filter((p) => p.status === "Paid")
  .reduce((sum, p) => sum + (p.amount || 0), 0);

const totalPendingAmount = payments
  .filter((p) => p.status === "Partial" || p.status === "Pending")
  .reduce((sum, p) => sum + (p.amount || 0), 0);
  useEffect(()=>{
    fetch("http://localhost:8007/api/ViewPayments")
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.data)
      setPayments(data.data)
    })
  },[])
    if (!payments) return <p>Loading...</p>;
  return <>
 <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="container-fluid page-body-wrapper">
  <SideBar/>
<div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
   <div className="content-wrapper">
      <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'700px',fontSize:'18px'}}>  All Payment</div>
               <Link to="/view-sale" className="btn btn-primary">
                                  View Sale
                                </Link>  
              <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="form-select text-dark ms-2 p-2"
                    style={{ width: "180px" }}
                  >
                    <option value="">⏳Filter</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                  </select>
              
              </div>

     <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card2 p-2 w-100">
           <div className="card-body2 mb-2">
        
           <table  className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Amount (₹)</th>
              <th>Method</th>
              <th>Status</th>
              <th>Action</th>
              </tr>
            </thead>
           <tbody>
  {filterPayment.length === 0 ? (
    <tr>
      <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
        Data Not Found
      </td>
    </tr>
  ) : (
    filterPayment.map((payment, index) => {
      const imageurl = payment.customerId?.lead?.Image?.startsWith('http')
        ? payment.customerId?.lead?.Image
        : `http://localhost:8007${payment.customerId?.lead?.Image}`;
      return (
        <tr key={payment._id}>
          <td>{index + 1}</td>
          <td>{new Date(payment.receivedDate).toLocaleDateString()}</td>
          <td>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={imageurl}
                style={{ width: '35px', height: '35px', borderRadius: '50%', marginRight: '10px' }}
                alt=""
              />
              {payment.customerId?.lead?.name || 'N/A'}
            </span>
          </td>
          <td>{payment.amount}</td>
          <td>{payment.method}</td>
          <td>
            <span
              className={
                payment.status === "Paid"
                  ? "status-badge-paid"
                  : "status-badge-pending"
              }
              style={{ color: payment.status === "Paid" ? "green" : "orange" }}
            >
              {payment.status || "N/A"}
            </span>
          </td>
          <td>
            <Link to={`/payment-details/${payment._id}`}>
              <i className="ri-eye-fill" style={{ color: '#4f5ece', fontSize: '20px' }}></i>
            </Link>
          </td>
        </tr>
      );
    })
  )}
</tbody>

          </table>
      </div>
        </div>
      </div>
     </div>
      <div style={{
  marginTop: "20px",
  display: "flex",
  gap: "20px",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  marginLeft:"300px"
}}>
  {/* Total Paid Box */}
  <div style={{
    width: "250px",
    background: "#d4edda",
    padding: "20px",
    borderRadius: "12px",
    color: "#155724",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }}>
    <h3 style={{ margin: "0", fontSize: "22px" }}>✅ Paid</h3>
    <p style={{ margin: "8px 0" }}>Count: {paidCount}</p>
    <p>Total Amount: ₹{totalPaidAmount.toFixed(2)}</p>
  </div>

  {/* Total Pending Box */}
  <div style={{
    width: "250px",
    background: "#fff3cd",
    padding: "20px",
    borderRadius: "12px",
    color: "#856404",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }}>
    <h3 style={{ margin: "0", fontSize: "22px" }}>⏳ Pending</h3>
    <p style={{ margin: "8px 0" }}>Count: {pendingCount}</p>
    <p>Total Amount: ₹{totalPendingAmount.toFixed(2)}</p>
  </div>
</div>

  </div>
</div>
      </div>
 
 </div>
  </>
}