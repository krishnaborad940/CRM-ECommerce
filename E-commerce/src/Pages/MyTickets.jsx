import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";
import Header from "./Header";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
const [open,setOpen]=useState(null)
const [planFilter,setPlanFilter]=useState('')
const [searchTerm,setSearchTerm]=useState('');

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

  const filterCategory=tickets.filter((ticket)=>{
    const matchCategory= planFilter ?ticket.category===planFilter :true;
    const Name=ticket?.customer?.name?.toLowerCase() || '';
    const search=searchTerm?.toLowerCase() || '';
    const matchesSearch=Name.includes(search)
    return matchCategory && matchesSearch
  })
  return (
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="container-fluid page-body-wrapper">

      <SideBar />
      <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
        <div className="content-wrapper">
      
            <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'800px',fontSize:'18px'}}>🎟️ My Assigned Tickets</div>
             
              <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="form-select text-dark ms-2 p-2"
                    style={{ width: "180px" }}
                  >
                    <option value="">⏳Filter</option>
                    <option value="Technical">Technical</option>
                    <option value="Billing">Billing</option>
                    <option value="General">General</option>
                    <option value="Other">Other</option>
                  </select>
              
              </div>
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card2 p-2 w-100">
                <div className="card-body2 mb-2">
                  <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Message</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Status</th>
                <th>Assigner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
        {
          filterCategory.length===0 ?(
<tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                              Data Not Found
                            </td>
                          </tr>
          ):(filterCategory.map((v) => {
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
                                          <Link to={`/new-followup/${v.customer?.lead?._id}`} style={{color:'red',textDecoration:'none',textAlign:'center'}}>
                                            <span><i class="ri-chat-follow-up-fill"></i> FollowUp</span>
                                          </Link>
                                        </div>
                                        <div className="menuBtn">
                                            {v.status === "Closed" ? (
                                           <span className="Closed text-success">✔️</span>
                                               ) : (
                                            <Link className="btn" onClick={() => handleStatusUpdate(v._id)}>
                                                Closed
                                              </Link>
                                            )}
                                            </div>
                                      </div>
                                    )}
                                  </td>
                </tr> )
}))
        }
            
            </tbody>
          </table >
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
