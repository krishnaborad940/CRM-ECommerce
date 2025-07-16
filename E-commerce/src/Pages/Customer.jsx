import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import "../App.css"; 
import "../Style/Lead.css"; 
import SideBar from "./SideBar";
import Header from "./Header";

export default function Customer() {
  const [showCustomer, setShowCustomer] = useState([]);
  const navigate = useNavigate();
  const [planFilter,setPlanFilter]=useState("")
  const [open,setOpen]=useState(null)
  const [searchTerm,setSearchTerm]=useState('');

  const filterCustomer=showCustomer.filter((customer)=>{
    const matchStatus=planFilter?customer.status === planFilter :true;
    const name=customer?.name?.toLowerCase()  || ''
    const search=searchTerm?.toLowerCase() || '';
    const matchesSearch=name.includes(search);
    return matchStatus && matchesSearch
  })

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

  // const filterCustomer=showCustomer.filter((customer)=>{
  //   return planFilter ?customer.status===planFilter:true
  // })

  return (
    <div className="container-scroller">
         <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
         <div className="container-fluid page-body-wrapper">
          <SideBar/>
          <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
            <div className="content-wrapper">
  {/* Main Content */}
  <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                  {/* Add Product Button */}
                 <div style={{marginRight:'700px',fontSize:'18px'}}>  All Customer</div>
                  <Link to="/add-sale" className="btn btn-primary" style={{padding:'10px 12px'}}>
                        ➕ Add Sale
                      </Link>
                <select
                      value={planFilter}
                      onChange={(e) => setPlanFilter(e.target.value)}
                      className="form-select text-dark ms-2 p-2"
                      style={{ width: "180px" }}
                    >
                      <option value="">⏳Filter</option>
                      <option value="InActive">InActive</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Active">Active</option>
                      <option value="Converted">Converted</option>
                    </select>
                
                </div>

                <div className="row">
                  <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card2 p-2 w-100">
                        <div className="card-body2 mb-2">
                                    <table className="table table-bordered table-hover" >
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
                                        {
                                          filterCustomer.lenght===0 ? (
                                                <tr>
                                                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                                                      Data Not Found
                                                    </td>
                                                  </tr>
                                          ):
                                          (filterCustomer.map((v) => {
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
                                                <Link to={`/customer-details/${v._id}`} style={{textDecoration:'none'}}>
                                                  <span style={{color:'grey'}}><i className="ri-eye-fill"></i> View</span>
                                                </Link>
                                              </div>
                                              <div className="menuBtn">
                                                <span  onClick={() => navigate(`/edit-customer/${v._id}`)} style={{color:'grey'}}>
                                                  <i className="ri-edit-line"></i> Edit
                                                </span>
                                              </div>
                                              <div className="menuBtn">
                                                <span onClick={() => handleDelete(v._id)} style={{color:'red'}}>
                                                  <i className="ri-delete-bin-6-line"></i> Delete
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                          </tr>
                                        )
                                          })
                                        )}
                                        
                                      </tbody>
                                    </table>
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
