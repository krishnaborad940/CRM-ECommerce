import React, { useEffect, useState } from "react";
import "../App.css"; 
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
// import QuotationPDF from "./QuotationPDF";
import html2pdf from "html2pdf.js";
// import QuotationDetails from "./QuotationDetails";
import QuotationPdf from "./QyotationPdf";

export default function ViewQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [planFilter,setPlanFilter]=useState("")
  const [searchTerm,setSearchTerm]=useState("")
const navigate=useNavigate()

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewQuotation")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setQuotations(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  const handleSales = (quote) => {
    fetch(`http://localhost:8007/api/convertSlaes/${quote._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        QuotationId: quote._id,
        totalAmount: quote.totalAmount,
        customerId: quote.customerId?._id,
        createBy: quote.createdBy?._id,
        PaymentStatus: "Pending",
        saleDate: new Date(),
        products: quote.items.map((item) => ({
          productId: item.product?._id || item.productId,
          quantity: item.quantity,
          Price: item.price,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // alert("Sale Added Successfully");
        navigate('/view-quotation')
        setQuotations((prev) =>
          prev.map((q) =>
            q._id === quote._id ? { ...q, status: "Approved" } : q
          )
        );
      })
      .catch((err) => {
        console.error("Sale Add Error:", err);
        alert("Failed to add sale");
      });
  };

 const filterQuotation=quotations.filter((quotation)=>{
    const matchCategory= planFilter ?quotation.status===planFilter :true;
    const Name=quotation?.lead?.name?.toLowerCase() || '';
    const search=searchTerm?.toLowerCase() || '';
    const matchesSearch=Name.includes(search)
    return matchCategory && matchesSearch
  })

  const handleDownload = async (id) => {
    const element = document.getElementById(`quotation-pdf-${id}`);
    if (!element) return;

    await new Promise((res) => setTimeout(res, 300));

    html2pdf()
      .set({
        margin: 0.3,
        filename: `Quotation-${id.slice(-4)}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="container-fluid page-body-wrapper">
      <SideBar />
      <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
      <div className="content-wrapper">
        <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
          <div style={{marginRight:'700px',fontSize:'18px'}}>All Quotation</div>
          <Link to="/quotation" className="btn btn-primary" style={{padding:'10px 12px'}}>
            ➕ Add Quotation
          </Link>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="form-select text-dark p-2"
            style={{ width: "180px" }}
          >
            <option value="">⏳Filter</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card2 p-2 w-100">
              <div className="card-body2 mb-2">
                <div>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Lead</th>
                        <th>Products</th>
                        <th>Total (₹)</th>
                        <th>Status</th>
                        <th>view</th>
                        <th>Sale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterQuotation.length ===0 ?(
                        <tr>
                          <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                            Data Not Found
                          </td>
                        </tr>
                      ):(filterQuotation.map((quote) => (
                        <tr key={quote._id}>
                          <td>{new Date(quote.quotationDate).toLocaleDateString()}</td>
                          <td>
                            <span>
                              {quote.lead?.Image && (
                                <img
                                  src={quote.lead.Image.startsWith("http") ? quote.lead.Image : `http://localhost:8007${quote.lead.Image}`}
                                  alt="Lead"
                                  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "6px" }}
                                />
                              )}
                              {quote.lead?.name || "N/A"}
                            </span>
                          </td>
                          <td>
                            {quote.items.map((item, i) => (
                              <div key={i}>{item.product?.title || item.title} × {item.quantity}</div>
                            ))}
                          </td>
                          <td>₹{quote.totalAmount}</td>
                          <td><span className={`status-badge ${quote.status?.toLowerCase()}`}>{quote.status}</span></td>
                          {/* <td>
                            <Link to={`/quotation-details/${quote._id}`}>
                              <button className="btn btn-edit" style={{ fontSize: "18px", color: "green" }}>
                                <i className="ri-eye-fill"></i>
                              </button>
                            </Link>
                          </td> */}
                          <td>
                            <a onClick={() => handleDownload(quote._id)} className="btn btn-outline-danger btn-sm" style={{textAlign:'center'}}>
                             <i className="ri-eye-fill"></i>
                            </a>
                            <div style={{ visibility: "hidden", position: "absolute", zIndex: -1 }}>
                              <QuotationPdf quotation={quote} />
                            </div>
                          </td>
                          <td>
                            {quote.status === "Approved" ? (
                              <span className="converted">✔️</span>
                            ) : (
                              <button className="btn btn-outline-success btn-sm" onClick={() => handleSales(quote)}>
                                ➕ Add to Sales
                              </button>
                            )}
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
