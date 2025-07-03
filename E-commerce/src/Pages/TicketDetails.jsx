import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Pages/SideBar";

export default function TicketDetails() {
  const [Ticket, setTicket] = useState(null); // Single product object
  const { id } = useParams(); // UseParams should be called like a function

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

//   const imageUrl = Ticket.customer?.product?.Image?.startsWith("http")
//     ? Ticket.customer?.product?.Image
//     : `http://localhost:8007${Ticket.customer?.product?.Image || ""}`;

  return (
    <div className="viewTickets-container" style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <div className="main-content" style={{ flex: 1, padding: "30px" }}>
        <div
          className="product-details"
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Link to="/ViewTicket" style={{ textDecoration: "none", color: "#007bff" }}>
            ⬅ Back to Ticket
          </Link>

          <h2 style={{ marginTop: "20px", marginBottom: "10px", color: "#333" }}>
            🛍️ {Ticket?.name}
          </h2>

          {/* <img
            src={imageUrl}
            alt={Ticket.customer?.product?.name}
            style={{ width: "50%", maxHeight: "300px",objectFit:'contain', borderRadius: "10px" }}
          /> */}

          <div style={{ marginTop: "20px", lineHeight: "1.8", fontSize: "16px" }}>
            <p><strong>Subject:</strong> {Ticket?.subject}</p>
            <p><strong>Message:</strong> {Ticket?.message}</p>
            <p><strong>Customer Name:</strong> {Ticket?.customer?.name}</p>
            {/* <p><strong>Next-FollowUp:</strong> {Ticket?.nextFollowup}</p> */}
            <p><strong>Category:</strong>  {Ticket?.category}</p>
            <p><strong>Status:</strong>  {Ticket?.status}</p>
            <p><strong>Assigner:</strong>  {Ticket?.role}</p>


          </div>

       
        </div>
      </div>
    </div>
  );
}
