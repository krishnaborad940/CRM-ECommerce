import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function CompaniesDetails() {
  const [Companies, setCompanies] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8007/api/CompaneyDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setCompanies(data.data)
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Companies) return <p>Loading...</p>;

  const imageUrl = Companies.Image?.startsWith("http")
    ? Companies.Image
    : `http://localhost:8007${Companies.Image || ""}`;

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
                <h4 className="fw-bold m-0">Product Details</h4>
                <Link to="/view-companies" className="btn btn-outline-primary btn-sm" style={{ marginLeft: 'auto' }}>⬅ Back</Link>
              </div>

              <div className="row">
                {/* LEFT TEXT SIDE */}
                <div className="col-lg-8">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover" style={{ textAlign: 'left' }}>
                      <tbody>
                        <tr>
                          <th style={{ width: "180px" }}>Companey Name:</th>
                          <td style={{textAlign:'left'}}>{Companies.name}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td style={{textAlign:'left'}}>{Companies.email}</td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td style={{ textAlign: 'left' }}> {Companies.Phone} </td>
                        </tr>
                         <tr>
                          <th>Address:</th>
                          <td style={{ textAlign: 'left' }}> {Companies.address} </td>
                        </tr>
                        <tr>
                          <th>Plan:</th>
                          <td style={{textAlign:'left'}}>{Companies.Plan}</td>
                        </tr>
                        <tr>
                            <th>Plan Type:</th>
                            <td style={{ textAlign: 'left' }}>{Companies.PlanType}</td>
                        </tr>
                        <tr>
                          <th>Account Url:</th>
                          <td style={{textAlign:'left'}}> {Companies.AccountUrl}</td>
                        </tr>
                         <tr>
                          <th>Website:</th>
                          <td style={{textAlign:'left'}}> {Companies.website}</td>
                        </tr>
                         <tr>
                          <th>Status:</th>
                          <td style={{textAlign:'left',color:Companies.status==='Active'?'green':'red'}}>{Companies.status} </td>
                        </tr>
                        
                      </tbody>
                    </table>
                  </div>
                 
                </div>

                {/* RIGHT IMAGE SIDE */}
                <div className="col-lg-4 d-flex justify-content-center align-items-start mt-3 mt-lg-0">
                  <img
                    src={imageUrl}
                    alt={Companies.title}
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
