import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function PaymentDetails() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewPaymentDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setPayment(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!payment) return <p>Loading...</p>;

  const customerImg = payment.customerId?.lead?.Image?.startsWith("http")
    ? payment.customerId?.lead?.Image
    : `http://localhost:8007${payment.customerId?.lead?.Image || ""}`;

  const loggedUser = JSON.parse(localStorage.getItem("user"))?.userName;

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
                <h4 className="fw-bold m-0">💳 Payment Details</h4>
                <Link
                  to="/view-payment"
                  className="btn btn-outline-primary btn-sm ms-auto"
                >
                  ⬅ Back
                </Link>
              </div>

              <div className="row">
                {/* Left Side Table */}
                <div className="col-lg-8">
                  <table className="table table-bordered table-hover">
                    <tbody>
                      <tr>
                        <th>Customer Name:</th>
                        <td colSpan={2}>
                          <img
                            src={customerImg}
                            alt="Customer"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                          {payment.customerId?.name}
                        </td>
                      </tr>

                      <tr>
                        <th>Payment Amount:</th>
                        <td colSpan={2}>₹{payment.amount}</td>
                      </tr>

                      <tr>
                        <th>Payment Mode:</th>
                        <td colSpan={2}>{payment.method}</td>
                      </tr>

                      {/* Show UPI ID only if mode is UPI */}
                      {payment.mode === "UPI" && (
                        <tr>
                          <th>UPI ID:</th>
                          <td colSpan={2}>{payment.upiId || "N/A"}</td>
                        </tr>
                      )}

                      {/* Show Bank Account No only if mode is Bank */}
                      {payment.mode === "Bank" && (
                        <tr>
                          <th>Bank Account No:</th>
                          <td colSpan={2}>{payment.bankAccount || "N/A"}</td>
                        </tr>
                      )}

                      <tr>
                        <th>Reference No:</th>
                        <td colSpan={2}>{payment.referenceNumber || "N/A"}</td>
                      </tr>

                      <tr>
                        <th>Payment Date:</th>
                        <td colSpan={2}>
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                      </tr>

                      <tr>
                        <th>Received By:</th>
                        <td colSpan={2}>
                          {payment.receivedBy?.name || loggedUser}
                        </td>
                      </tr>

                      <tr>
                        <th>Notes:</th>
                        <td colSpan={2}>{payment.notes || "No notes added"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Right Side Customer Image */}
                <div className="col-lg-4 d-flex justify-content-center align-items-start mt-4 mt-lg-0">
                  <img
                    src={customerImg}
                    alt="Customer"
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
