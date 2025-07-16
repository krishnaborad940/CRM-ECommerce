import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function QuotationDetails() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewQuotationById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setQuotation(data.data)
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!quotation) return <p>Loading...</p>;

quotation.items.map((item)=>{
const ProductImg = item.Image?.startsWith("http")
    ? item.Image
    : `http://localhost:8007${item.Image }`;
})

  

  const numberToWords = (num) => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if ((num = num.toString()).length > 9) return "Overflow";
    let n = ("000000000" + num).substr(-9).match(/.{1,2}/g);
    let str = "";
    str += +n[0] !== 0 ? (a[+n[0]] || b[n[0][0]] + " " + a[n[0][1]]) + " Crore " : "";
    str += +n[1] !== 0 ? (a[+n[1]] || b[n[1][0]] + " " + a[n[1][1]]) + " Lakh " : "";
    str += +n[2] !== 0 ? (a[+n[2]] || b[n[2][0]] + " " + a[n[2][1]]) + " Thousand " : "";
    str += +n[3] !== 0 ? (a[+n[3]] || b[n[3][0]] + " " + a[n[3][1]]) + " Hundred " : "";
    str += +n[4] !== 0 ? ((str !== "") ? "and " : "") + (a[+n[4]] || b[n[4][0]] + " " + a[n[4][1]]) + " " : "";
    return str.trim() + " Rupees Only";
  };

const subTotal = quotation.items.reduce((acc, curr) => acc + curr.total, 0);
const tax = subTotal * 0.1; // 10% tax
const discount = (subTotal + tax) * 0.05; // 5% on total incl. tax
const finalAmount = subTotal + tax - discount;


// const ProductImg=quotation.items?.product?.Image.startsWith('http')
// ?quotation.items?.product?.Image
// :`http://localhost:8007${quotation.items?.product?.Image}`
  return (
    <div className="container-scroller d-flex">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginLeft: "250px", marginTop: "40px" }}>
          <div className="content-wrapper">
            <div id={`quotation-pdf-${quotation._id}`} className="p-5 shadow bg-white rounded-4 mx-auto" style={{ maxWidth: "750px" }}>
              {/* Top Section */}
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h4 className="fw-bold text-uppercase text-primary" style={{ color: "" }}>Quotation</h4>
                </div>
                <div className="text-end">
                  <p className="mb-1"><strong>Quotation#</strong> {quotation._id?.slice(-4)}</p>
                  <p><strong>Quotation Date:</strong> {new Date(quotation.quotationDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Quotation From & To */}
              <div className="row g-3 mb-4">
                <div className="col-md-6 bg-light p-3 rounded">
                  <h6 className="fw-bold">Quotation by</h6>
                  <p className="mb-1 fw-semibold">{quotation.lead?.companies?.name}</p>
                  <p className="mb-1 text-muted">{quotation.lead?.companies?.address}</p>
                  <p className="mb-1">GSTIN: 29ABCDE1234F2Z5</p>
                  <p>PAN: ABCDE1234F</p>
                </div>
                <div className="col-md-6 bg-light p-3 rounded">
                  <h6 className="fw-bold">Quotation to</h6>
                  <p className="mb-1 fw-semibold">{quotation.lead?.name}</p>
                  <p className="mb-1 text-muted">{quotation.lead?.companies?.address}</p>
                  <p className="mb-1">GSTIN: 29VGCE1234KZ6</p>
                  <p>PAN: VGCE1234K</p>
                </div>
              </div>

              {/* Product Table */}
              <table className="table table-bordered text-center table-hover">
                <thead className="text-white" >

                  <tr >
                    <th className="bg-gradient-light">#</th>
                    <th className="bg-gradient-light">Item Description</th>
                    <th className="bg-gradient-light">Qty.</th>
                    <th className="bg-gradient-light">Rate</th>
                    <th className="bg-gradient-light">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {quotation.items.map((item, index) => {
                    const proImg=item.Image.startsWith('http')
                    ?item.Image
                    :`http://localhost:8007${item.Image}`
                    return (
                       <tr key={index}>
                      <td>{index + 1}</td>
                      <td><img src={proImg}  alt="" />{item.product?.title}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.total}</td>
                    </tr>
                    )
                   
})}
                </tbody>
              </table>

              {/* Footer Info */}
              <div className="d-flex justify-content-between mt-4">
                <div style={{ flex: 1 }}>
                  <h6 className="fw-bold text-info">Terms and Conditions</h6>
                  <p className="mb-1">1. Please pay within 15 days from the date of invoice. Overdue interest @14% will be charged.</p>
                  <p className="mb-1">2. Please quote invoice number when remitting funds.</p>

                  <h6 className="fw-bold text-info mt-4">Additional Notes</h6>
                  <p className="">This is a system generated quotation. For any communication, mention the invoice number.</p>
                </div>

                <div className="text-end" style={{ minWidth: "250px" }}>
                  <p><strong>Sub Total:</strong> ₹{subTotal.toFixed(2)}</p>
                  <p className="text-danger"><strong>Tax 10%:</strong> + ₹{(tax).toFixed(2)}</p>
                  <p><strong style={{color:'green'}}>Discount (5%):</strong> <span style={{color:'green'}}>- ₹{discount.toFixed(2)}</span></p>
                  <h5 className="fw-bold">Total: ₹{finalAmount.toFixed(2)}</h5>
                  <p className="fst-italic fw-bold text-muted small">{numberToWords(Math.round(finalAmount))}</p>
                </div>
              </div>

              {/* Signature */}
         <div className="text-end mt-5">
  <p style={{
    fontFamily: "'Pacifico', cursive",  // Use a cursive-style font
    fontSize: "28px",
    color: "#2c3e50",
    marginBottom: "0"
  }}>
    {quotation.lead?.name}
  </p>
  <p className="fw-semibold">Authorized Signature</p>

</div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
