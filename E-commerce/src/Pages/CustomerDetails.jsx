import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function CustomerDetails() {
  const [Customer, setCustomer] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewCustomerDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCustomer(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Customer) return <p>Loading...</p>;

  const imageUrl = Customer.product?.Image?.startsWith("http")
    ? Customer.product?.Image
    : `http://localhost:8007${Customer.product?.Image || ""}`;

  return (
    <div className="container-scroller" style={{ display: "flex" }}>
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginLeft: '250px', marginTop: '40px' }}>
          <div className="content-wrapper d-flex justify-content-center">
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "1000px", borderRadius: "16px" }}>
              {/* Header Row */}
              <div className="d-flex align-items-center mb-3">
                <h4 className="fw-bold m-0">Customer Details</h4>
                <Link to="/view-customer" className="btn btn-outline-primary btn-sm" style={{ marginLeft: 'auto' }}>
                  ⬅ Back
                </Link>
              </div>

              <div className="row">
                {/* LEFT TEXT SIDE */}
                <div className="col-lg-8">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover" style={{ textAlign: 'left' }}>
                      <tbody>
                        <tr>
                          <th style={{ width: "180px" }}>Customer Name:</th>
                          <td>{Customer?.name}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>{Customer?.email}</td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td>{Customer?.phone}</td>
                        </tr>
                        <tr>
                          <th>Product:</th>
                          <td>{Customer?.product?.title} — ₹{Customer.product?.Price}</td>
                        </tr>
                        <tr>
                          <th>Remark:</th>
                          <td>{Customer?.remark}</td>
                        </tr>
                        <tr>
                          <th>Status:</th>
                          <td ><span style={{ color: Customer.status === 'Active' ? '#155724' : '#a71d2a',backgroundColor:Customer.status==='Active'?'#d4edda':'#f5c6cb',padding:'5px',borderRadius:'10px' }}>{Customer?.status}</span></td>
                        </tr>
                        <tr>
                          <th>Assigner:</th>
                          <td>{Customer?.role}</td>
                        </tr>
                        <tr>
                          <th></th>
                          <td>
                            <button className="btn p-2 bg-danger" onClick={() => navigate(`/Ticket/${Customer._id}`)}>
                              🎟️ 
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* RIGHT IMAGE SIDE */}
                <div className="col-lg-4 d-flex justify-content-center align-items-start mt-3 mt-lg-0">
                  <img
                    src={imageUrl}
                    alt={Customer.product?.name}
                    className="img-fluid"
                    style={{
                      borderRadius: "12px",
                      width: "100%",
                      maxWidth: "280px",
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
