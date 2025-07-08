import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import "../App.css"; 
import SideBar from "./SideBar";

export default function ViewTicket() {
  const [statusCount,setStatusCount]=useState({
      Open:0,
      InProgress:0,
closed:0
  })
  const [open,setOpen]=useState(null)
  const [showLeads, setShowLeads] = useState([]);
  // const navigate = useNavigate();


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

  useEffect(() => {
    fetch("http://localhost:8007/api/ShowTicket")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        const allTickets=data.data
        setShowLeads(allTickets);
              const open = allTickets.filter(t => t.status === "Open").length;
      const inprocess = allTickets.filter(t =>t.status === "In-Progress").length;
      const closed = allTickets.filter(t => t.status === "Closed").length;

      setStatusCount({ open, inprocess, closed });

      });
      
  }, []);

const handleDelete = (_id) => {
  if (window.confirm("Are you sure you want to delete this ticket?")) {
    fetch(`http://localhost:8007/api/DeleteTicket/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setShowLeads((prev) => prev.filter((ticket) => ticket._id !== _id));
      });
  }
};


const handleClose = (_id) => {
  fetch(`http://localhost:8007/api/CloseTicket/${_id}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then(() => {
      setShowLeads((prev) =>
        prev.map((ticket) =>
          ticket._id === _id ? { ...ticket, status: "Closed" } : ticket
        )
      );
    });
};
  return (
    <div className="viewleads-container">
   <SideBar/>

      {/* Main Content */}
      <main className="main-content">
         <div className="header">
          <h1 style={{ margin: 0 }}>All Products</h1>
        </div>
        <table >
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>subject</th>
              <th>Message</th>
              <th>Category</th>
              <th>Status</th>
              <th>Assigner</th>
              {/* <th>Remark</th> */}
              <th colSpan={4}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showLeads.map((v) => {
              const ImageUrl=v.customer?.lead?.Image.startsWith('http')
              ?v.customer?.lead?.Image
              :`http://localhost:8007${v.customer?.lead?.Image}`;
               const ImageUrl2=v.assigner?.Image.startsWith('http')
              ?v.assigner?.Image
              :`http://localhost:8007${v.assigner?.Image}`
              return (
              <tr key={v._id}>
                <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={ImageUrl} style={{width:'35px',height:'35px',borderRadius:'50%',marginRight:'10px'}} alt="" />{v.customer?.name} </span></td>
                <td>{v.subject}</td>
                <td>{v.message}</td>
                <td>{v.category}</td>
                <td>  <span className={`status-badge status-${v.status?.toLowerCase().replace("-", "")}`}>
                    {v.status}
                  </span></td>
                <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={ImageUrl2} style={{width:'35px',height:'35px',borderRadius:'50%',marginRight:'10px'}} alt="" />{v.assigner?.name} </span></td>
                 <td style={{ position: "relative" }} className="menu-wrapper">
                  <i
                    className="ri-more-2-line"
                    onClick={() => toggleMenu(v._id)}
                    style={{ cursor: "pointer" }}
                  ></i>

                  {open === v._id && (
                    <div className="Menu">
                      <div className="menuBtn">
                        <Link to={`/TicketDetails/${v._id}`}>
                          <span><i className="ri-eye-fill"></i> View</span>
                        </Link>
                      </div>
                      <div className="menuBtn">
                            <span style={{ color: 'grey' }}>
                            {v.status === "Closed" ? (
                              <span style={{  fontWeight: 'bold' }}>
                                <i className="ri-checkbox-circle-fill" style={{ marginRight: '5px' }}></i>
                                Closed
                              </span>
                            ) : (
                              <span
                                onClick={() => handleClose(v._id)}
                                style={{
                                  
                                  color: '#444'
                                }}
                              >
                                <i className="ri-close-circle-line" style={{ marginRight: '5px' }}></i>
                                Close
                              </span>
                            )}
                          </span>
                      </div>
                      <div className="menuBtn">
                        <span onClick={() => handleDelete(v._id)} style={{color:"grey"}}>
                          <i className="ri-delete-bin-6-line"></i> Delete
                        </span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
              )
})}
          </tbody>
        </table>

        <div className="stats-container" style={{ marginTop: "30px" }}>
  <div className="card">
    <h2 style={{ color: "#007bff" }}>{statusCount.open}</h2>
    <p style={{ color: "black" }}>Open Tickets</p>
  </div>
  <div className="card">
    <h2 style={{ color: "#ffc107" }}>{statusCount.inprocess}</h2>
    <p style={{ color: "black" }}>In-Process Tickets</p>
  </div>
  <div className="card">
    <h2 style={{ color: "#28a745" }}>{statusCount.closed}</h2>
    <p style={{ color: "black" }}>Closed Tickets</p>
  </div>
</div>
      </main>
    </div>
  );
}
