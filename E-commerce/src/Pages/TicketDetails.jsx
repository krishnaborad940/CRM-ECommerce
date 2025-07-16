import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function TicketDetails() {
  const [Ticket, setTicket] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8007/api/ViewTicketDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setTicket(data.data);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!Ticket) return <p>Loading...</p>;

  const customer = Ticket.customer;
  const assigner = Ticket.assigner;

  const assignerImage = assigner?.Image?.startsWith("http")
    ? assigner.Image
    : `http://localhost:8007${assigner?.Image || ""}`;
      const customerImage = customer?.lead?.Image.startsWith("http")
    ? customer?.lead?.Image
    : `http://localhost:8007${customer?.lead?.Image || ""}`;

  return (
    <div className="container-scroller" style={{ display: "flex" }}>
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div
          className="main-panel"
          style={{ marginLeft: "250px", marginTop: "40px" }}
        >
          <div className="content-wrapper d-flex justify-content-center">
            <div
              className="card shadow-sm p-4 w-100"
              style={{ maxWidth: "1000px", borderRadius: "16px" }}
            >
              <div className="d-flex align-items-center mb-3">
                <h4 className="fw-bold m-0">Ticket Details</h4>
                <Link
                  to="/view-ticket"
                  className="btn btn-outline-primary btn-sm"
                  style={{ marginLeft: "auto" }}
                >
                  ⬅ Back
                </Link>
              </div>

              <div className="row">
                {/* LEFT Table */}
                <div className="col-lg-8">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover"
                      style={{ textAlign: "left" }}
                    >
                      <tbody>
                        <tr>
                          <th>Ticket Subject</th>
                          <td>{Ticket?.subject}</td>
                        </tr>
                        <tr>
                          <th>Message</th>
                          <td>{Ticket?.message}</td>
                        </tr>
                        <tr>
                          <th>Customer Name</th>
                          <td> {customer?.name}</td>
                        </tr>
                        <tr>
                          <th>Customer Email</th>
                          <td>{customer?.email}</td>
                        </tr>
                        <tr>
                          <th>Customer Phone</th>
                          <td>{customer?.phone}</td>
                        </tr>
                        <tr>
                          <th>Category</th>
                          <td>{Ticket?.category}</td>
                        </tr>
                        <tr>
                          <th>Priority</th>
                          <td> <span className={`priority-${Ticket.priority.toLowerCase()}`}>
    {Ticket.priority}
  </span></td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td ><span style={{ color: Ticket.status !== 'Closed' ? '#155724' : '#a71d2a',backgroundColor:Ticket.status!=='Closed'?'#d4edda':'#f5c6cb',padding:'5px',borderRadius:'10px' }}>{Ticket.status}</span></td>
                        </tr>
                        <tr>
                          <th>Assigner</th>
                          <td><img src={assignerImage} alt="" className="me-2"/> {assigner?.name} ({assigner?.role})</td>
                        </tr>
                        <tr>
                          <th>Assigner Email</th>
                          <td>{assigner?.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* RIGHT: Assigner Image */}
                <div className="col-lg-4 d-flex justify-content-center align-items-start mt-3 mt-lg-0">
                  {assigner?.Image && (
                    <img
                      src={customerImage}
                      alt="Assigner"
                      className="img-fluid"
                      style={{
                        borderRadius: "12px",
                        width: "100%",
                        maxWidth: "280px",
                        objectFit: "cover",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
