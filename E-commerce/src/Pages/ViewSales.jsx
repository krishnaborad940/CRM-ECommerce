import React, { useEffect, useState } from "react";
import "../App.css";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function ViewSales() {
  const [salesList, setSalesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [planFilter,setPlanFilter]=useState("");
  const [searchTerm,setSearchTerm]=useState('')

  const filterSales=salesList.filter((sales)=>{
    const matchStatus= planFilter?sales.PaymentStatus===planFilter:true
    const name=sales?.customerId?.name?.toLowerCase()|| '';
    const search=searchTerm?.toLowerCase() || '';
    const matchSearch=name.includes(search)
    return matchStatus && matchSearch
  })

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
          saleId: selectedSale?._id,                // string (required)
    amount: Number(amount),        // number (required)
    method: method,                // string (e.g. UPI, Cash, etc.)
    receivedDate: new Date(),      // current or selected date
    customerId:selectedSale?.customerId?._id || selectedSale?.QuotationId?.lead?._id,        // ✅ required
    status: "Paid"              
      }),
    })
      .then((res) => res.json())
.then((data) => {
  alert("Payment added successfully");
  setShowModal(false);

  const newStatus = data.updatedSale?.PaymentStatus || "Pending";

  setSalesList((prev) =>
    prev.map((item) =>
      item._id === selectedSaleId
        ? { ...item, PaymentStatus: newStatus }
        : item
    )
  );
});
  };


  const totalPaid = salesList
  .filter((sale) => sale.PaymentStatus === "Paid")
  .reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);

const totalPending = salesList
  .filter((sale) => sale.PaymentStatus !== "Paid")
  .reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
  // if (!salesList) return <p>Loading...</p>;
  return (
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="container-fluid page-body-wrapper">
      <SideBar />
    <div className="main-panel" style={{marginTop:'40px',marginLeft:'250px'}}>
         <div className="content-wrapper">
            <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'700px',fontSize:'18px'}}>  All Sales</div>
              <Link to="/add-sale" className="btn btn-primary" style={{padding:'10px 12px'}}>
                              ➕ Add Sale
                            </Link>
                      
              <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="form-select text-dark  p-2"
                    style={{ width: "180px" }}
                  >
                    <option value="">⏳Filter</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
              
              </div>
    
        {showModal && (
          <>
            <div className="modal-backdrop-light" onClick={() => setShowModal(false)}></div>
            <div className="right-side-modal">
              <h3>Add Payment</h3>
              <form onSubmit={handlePaymentSubmit} className="lead-form">
                <input type="hidden" name="status" value="Paid" />

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

                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card2 p-2 w-100">
              <div className="card-body2 mb-2">
                {/* PaymentForm */}
              



                <div >
                  <table  className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Total (₹)</th>
                        <th>Payment</th>
                        {/* <th>Created By</th> */}
                        <th>Payment</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                       {filterSales.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                              Data Not Found
                            </td>
                          </tr>
                        ) : (
                      filterSales.map((sale) => {
                        const imageUrl=sale.customerId?.lead?.Image.startsWith('http')
                        ?sale.customerId?.lead?.Image
                        :`http://localhost:8007${sale.customerId?.lead?.Image}`
                        return (
                        <tr key={sale._id}>
                          <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                          <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={imageUrl} alt="" style={{width:'35px',height:'35px',borderRadius:'50%',marginRight:'10px'}} />{sale.QuotationId?.lead?.name || sale.customerId?.name}</span></td>
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
                              <span className="status-badge-Paid1">Paid</span>
                            ) : (
                              <span className="status-badge-Pending">Pending</span>
                            )}
                          </td>
                          {/* <td>{sale.createBy?.name || "N/A"}</td> */}
                          <td style={{alignItems:"center",marginRight:"5px"}}>
                            {sale.PaymentStatus === "Paid" ? (
                              <span className="converted"><i className="ri-wechat-pay-fill" style={{fontSize:"20px"}}></i></span>
                            ) : (
                              <button
                                className="add-sale-btn"
                                onClick={() => openPaymentModal(sale._id)}
                              >
                              <i className="ri-money-rupee-circle-fill" style={{marginRight:'10px'}}></i>Pay
                              </button>
                            )}
                        </td>
                        <td> <Link to={`/sale-details/${sale._id}`}><button className="btn btn-edit" style={{fontSize:"18px",color:"green"}}><i className="ri-eye-fill"></i></button></Link></td>
                        
                        </tr>
                      )
                    })
                  )}
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>

              
        </div>
          <div style={{
          margin: "20px 0",
          display: "flex",
          gap: "20px",
          justifyContent: "flex-start",
          flexWrap: "wrap"
        }}>
          {/* Total Paid Box */}
          <div style={{
            width: "250px",
            background: "#c8e6c9",  // ✅ slightly darker green
            padding: "20px",
            borderRadius: "12px",
            color: "#1b5e20",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",marginLeft:'300px'
          }}>
            <h3 style={{ margin: "0", fontSize: "26px", textAlign: "center" }}>₹{totalPaid}</h3>
            <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>✅ Total Paid</p>
          </div>

          {/* Total Pending Box */}
          <div style={{
            width: "250px",
            background: "#ffe0b2",  // ✅ slightly darker orange
            padding: "20px",
            borderRadius: "12px",
            color: "#e65100",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: "0", fontSize: "26px", textAlign: "center" }}>₹{totalPending}</h3>
            <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>⏳ Total Pending</p>
          </div>
        </div>

      </div>
    </div>
      </div>
   
    </div>
  );
}