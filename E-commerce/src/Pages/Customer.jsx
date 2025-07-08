import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import "../App.css"; 
import "../Style/Lead.css"; 
import SideBar from "./SideBar";

export default function Customer() {
  const [showCustomer, setShowCustomer] = useState([]);
  const navigate = useNavigate();
  const [open,setOpen]=useState(null)

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
    fetch("http://localhost:8007/api/AllCustomer")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setShowCustomer(data.data);
      });
  }, []);

    const handleDelete = (_id) => {
    fetch(`http://localhost:8007/api/DeleteCustomer/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowCustomer((prev) => prev.filter((lead) => lead._id !== _id));
      });
  };

  return (
    <div className="viewleads-container">
         <SideBar/>
      {/* Main Content */}
          <main className="main-content">
                <div className="header">
                    <h1 style={{ margin: 0 }}>All Products</h1>
                    <Link to="/AddSales"  className="addLeadBtn">➕ Add sale</Link>
                </div>
            <table >
              <thead>
                <tr>
                  <th>Name</th>
                  {/* <th>Email</th> */}
                  <th>Phone</th>
                  <th>Product</th>
                  {/* <th>Next Follow-up</th> */}
                  {/* <th>Remark</th> */}
                  <th>Status</th>
                  <th>Assigner</th>
                  <th colSpan={4}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {showCustomer.map((v) => {
                  const imgUrl=v.lead?.Image.startsWith('http')
                  ?v.lead?.Image
                  :`http://localhost:8007${v.lead?.Image}`;
                     const imgUrl2=v.assigner?.Image.startsWith('http')
                  ?v.assigner?.Image
                  :`http://localhost:8007${v.assigner?.Image}`
                  return (
                  <tr key={v._id}>
                    <td ><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={imgUrl} style={{width:'35px',height:'35px',borderRadius:'50%',marginRight:'10px'}} alt="" />{v.name}</span></td>
                    {/* <td>{v.email}</td> */}
                    <td>{v.phone}</td>
                    <td>{v.product?.title} - ₹{v.product?.Price}</td>
                    <td><span className={`status-badge status-${v.status?.toLowerCase()}`}>{v.status}</span></td>
                    <td ><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={imgUrl2} style={{width:'35px',height:'35px',borderRadius:'50%',marginRight:'10px'}} alt="" />{v.assigner?.name}</span></td>
                    {/* <td><button className="btn btn-edit" onClick={() => navigate(`/EditCustomer/${v._id}`)}>✏️</button></td> */}
                    {/* <td><button className="btn btn-delete" onClick={() => handleDelete(v._id)}>🗑️</button></td> */}
                    
                    {/* <td><Link to={`/CustomerDetails/${v._id}`}  ><button className="btn btn-edit" style={{color:"green",fontSize:"18px"}}><i class="ri-eye-fill"></i></button></Link><Link/></td> */}
                    <td style={{ position: "relative" }} className="menu-wrapper">
                  <i
                    className="ri-more-2-line"
                    onClick={() => toggleMenu(v._id)}
                    style={{ cursor: "pointer" }}
                  ></i>

                  {open === v._id && (
                    <div className="Menu">
                      <div className="menuBtn">
                        <Link to={`/CustomerDetails/${v._id}`}>
                          <span><i className="ri-eye-fill"></i> View</span>
                        </Link>
                      </div>
                      <div className="menuBtn">
                        <span  onClick={() => navigate(`/EditCustomer/${v._id}`)}>
                          <i className="ri-edit-line"></i> Edit
                        </span>
                      </div>
                      <div className="menuBtn">
                        <span onClick={() => handleDelete(v._id)}>
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
          </main>
    </div>
  );
}
