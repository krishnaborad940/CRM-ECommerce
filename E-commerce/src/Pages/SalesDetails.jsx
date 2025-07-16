import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function SalesDetails() {
  const [Sales, setSales] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewSalesDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setSales(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Sales) return <p>Loading...</p>;

  // Only show first product image (you can modify to show multiple if needed)
  const ProductImg = Sales.product[0]?.image?.startsWith("http")
    ? Sales.product[0]?.image
    : `http://localhost:8007${Sales.product[0]?.image || ""}`;

  const loggedUser = JSON.parse(localStorage.getItem("user"))?.userName;

  const customerImg=Sales.customerId?.lead?.Image.startsWith('http')
  ?Sales.customerId?.lead?.Image
  :`http://localhost:8007${Sales.customerId?.lead?.Image}`
   const AddignerImg=Sales.createBy?.Image.startsWith('http')
  ?Sales.createBy?.Image
  :`http://localhost:8007${Sales.createBy?.Image}`
  return (
    <div className="container-scroller" style={{ display: "flex" }}>
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div
          className="main-panel"
          style={{ marginLeft: "250px", marginTop: "40px", padding: "20px" }}
        >
          <div className="content-wrapper">
            <div
              className="card2 shadow-sm p-4"
              style={{
                maxWidth: "1000px",
                margin: "auto",
                borderRadius: "16px",
                backgroundColor: "#fff",
              }}
            >
              {/* Header */}
              <div className="d-flex align-items-center mb-4">
                <h4 className="fw-bold m-0">🧾 Sales Details</h4>
                <Link
                  to="/view-sale"
                  className="btn btn-outline-primary btn-sm ms-auto"
                >
                  ⬅ Back
                </Link>
              </div>

              <div className="row">
                {/* Left Side Details */}
                <div className="col-lg-8">
                  <table className="table table-bordered table-hover">
                    <tbody>
                      {/* Product Details */}
                      {Sales.product.map((item, i) => (
                        <tr
                          key={i}
                          style={{
                            backgroundColor: "#f9f9f9",
                            fontWeight: "500",
                          }}
                        >
                          <th style={{ width: "180px" }}>
                            Product #{i + 1}
                          </th>
                          <td colSpan={2}>
                            {item.productId?.title || item.title} &nbsp; | &nbsp;
                            Qty: {item.quantity} &nbsp; | &nbsp; Price: ₹{item.price} &nbsp; | &nbsp;
                            Subtotal: ₹{item.quantity * item.price}
                           
                          </td>
                        </tr>
                      ))}

                      {/* Other Info */}
                      <tr>
                        <th>Sale Date:</th>
                        <td colSpan={2}>
                          {new Date(Sales.saleDate || Sales.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <th>Customer Name:</th>
                        <td colSpan={2}><img src={customerImg} alt="" />{Sales.customerId?.name || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Payment Status:</th>
                        <td colSpan={2}>
                          <span  style={{ color: Sales.PaymentStatus === "Pending" ? "#721c24" : "green",backgroundColor:Sales.PaymentStatus === "Pending" ? "#f8d7da" : "#d4edda",padding:'5px 10px' }}
                          >
                          {Sales.PaymentStatus}  </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Created By:</th>
                        <td colSpan={2}><img src={AddignerImg} alt="" />{Sales.createBy?.name || loggedUser}</td>
                      </tr>

                      {/* Total Amount */}
                      <tr style={{ backgroundColor: "#f1f9ff" }}>
                        <th
                          colSpan="2"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "green",
                            textAlign: "right",
                            padding: "15px",
                          }}
                        >
                          Total Amount:
                        </th>
                        <td
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "green",
                            textAlign: "left",
                            padding: "15px",
                          }}
                        >
                          ₹{Sales.totalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Right Side Product Image */}
                <div className="col-lg-4 d-flex justify-content-center align-items-start mt-4 mt-lg-0">
                  <img
                    src={ProductImg}
                    alt="Product"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxWidth: "280px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
