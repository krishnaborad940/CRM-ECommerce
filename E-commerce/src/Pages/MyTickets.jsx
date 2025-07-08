import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
const [open,setOpen]=useState(null)
  // ✅ Get userId from localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8007/api/MyTickets/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setTickets(data.data);
      });
  }, [userId]);

  const handleStatusUpdate = (_id) => {
    fetch(`http://localhost:8007/api/CloseTicket/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Converted Successfully");
        setTickets((pre) =>
          pre.map((ticket) =>
            ticket._id === _id ? { ...ticket, status: "Closed" } : ticket
          )
        );
      });
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideMenu = e.target.closest(".menu-wrapper");
      if (!isInsideMenu) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        <div className="mytickets-container">
          <h2>🎟️ My Assigned Tickets</h2>
          <table >
            <thead>
              <tr>
                <th>Subject</th>
                <th>Message</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((v) => {
                 const ImageUrl=v.customer?.lead?.Image.startsWith('http')
              ?v.customer?.lead?.Image
              :`http://localhost:8007${v.customer?.lead?.Image}`;
               const ImageUrl2=v.assigner?.Image.startsWith('http')
              ?v.assigner?.Image
              :`http://localhost:8007${v.assigner?.Image}`
              return (
              <tr key={v._id}>
                <td>{v.subject}</td>
                <td>{v.message}</td>
                <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={ImageUrl} style={{width:'35px',height:'35px',borderRadius:'50%',marginRight:'10px'}} alt="" />{v.customer?.name} </span></td>
                <td>{v.category}</td>
                <td>  <span className={`status-badge status-${v.status?.toLowerCase().replace("-", "")}`}>
                    {v.status}
                  </span></td>
                <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={ImageUrl2} style={{width:'35px',height:'35px',borderRadius:'50%',marginRight:'10px'}} alt="" />{v.assigner?.name} </span></td>
               
                  {/* <td>
                    {v.status === "Closed" ? (
                      <span className="Closed">✔️</span>
                    ) : (
                      <button
                        className="btn btn-convert"
                        onClick={() => handleStatusUpdate(v._id)}
                      >
                        Closed
                      </button>
                    )}

                    <Link
                      to={`/NewFollowUp/${v.customer?.lead}`}
                      style={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        textDecoration: "none",
                        marginLeft: "5px",
                      }}
                    >
                      Follow Up
                    </Link>
                  </td> */}
                    <td style={{ position: "relative" }} className="menu-wrapper">
                                    <i
                                      className="ri-more-2-line"
                                      onClick={() => toggleMenu(v._id)}
                                      style={{ cursor: "pointer" }}
                                    ></i>
                  
                                    {open === v._id && (
                                      <div className="Menu">
                                        <div className="menuBtn">
                                          <Link to={`/NewFollowUp/${v.customer?.lead}`}>
                                            <span><i class="ri-chat-follow-up-fill"></i> FollowUp</span>
                                          </Link>
                                        </div>
                                        <div className="menuBtn">
                                            {v.status === "Closed" ? (
                                           <span className="Closed">✔️</span>
                                               ) : (
                                            <button className="btn btn-convert" onClick={() => handleStatusUpdate(v._id)}>
                                                Closed
                                              </button>
                                            )}
                                            </div>
                                      </div>
                                    )}
                                  </td>
                </tr> )
})}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No tickets assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
