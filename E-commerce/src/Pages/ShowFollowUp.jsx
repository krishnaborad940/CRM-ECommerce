import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; 
import SideBar from "./SideBar";
import Header from "./Header";

export default function ShowFollowUp() {
  const [showLeads, setShowLeads] = useState([]);
  const navigate = useNavigate();
  const [planFilter,setPlanFilter]=useState('')
    const [searchTerm, setSearchTerm] = useState("");

      // ✅ Filtering by search & plan
  const filterFoloowup = showLeads.filter((followup) => {
    const matchesPlan = planFilter ? followup.status === planFilter : true;
    const name = followup?.lead?.name?.toLowerCase() || "";
    // const email = followup?.email?.toLowerCase() || "";
    const search = searchTerm?.toLowerCase() || "";

    const matchesSearch = name.includes(search) 
    return matchesPlan && matchesSearch;
  });

  useEffect(() => {
    fetch("http://localhost:8007/api/AllFollowUp")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setShowLeads(data.data);
      });
  }, []);
//     useEffect(() => {
//     fetch("http://localhost:8007/api/AllCustomer")
//       .then((res) => res.json())
//       .then((data) => {
//         setShowLeads(data.data);
//       });
//   }, []);

  // const handleDelete = (_id) => {
  //   fetch(`http://localhost:8007/api/DeleteLead/${_id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setShowLeads((pre) => pre.filter((lead) => lead._id !== _id));
  //     });
  // };

  const handleConvert = (_id) => {
    fetch(`http://localhost:8007/api/AddClosed/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Converted Successfully");
        setShowLeads((pre) =>
          pre.map((lead) =>
            lead._id === _id ? { ...lead, status: "Closed" } : lead
          )
        );
      });
  };
  // const filterFoloowup=showLeads.filter((followup)=>{
  //   return planFilter?followup.status===planFilter:true
  // })
  return (
    <div className="container-scroller">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="container-fluid page-body-wrapper">
      <SideBar/>
<div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
    {/* Main Content */}
      <div className="content-wrapper">
  <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
                {/* Add Product Button */}
               <div style={{marginRight:'700px',fontSize:'18px'}}>  All FollowUp</div>
               <Link to="/view-leads" className="btn btn-primary" style={{padding:'10px 12px'}}>
                                <i className="fa fa-mail-reply me-2"  ></i>
                                 Back To Lead
                              </Link>
              <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="form-select text-dark ms-2 p-2"
                    style={{ width: "180px" }}
                  >
                    <option value="">⏳Filter</option>
                    <option value="Intrested">Intrested</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
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
              <th>Product</th>
              <th>Next Follow-up</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Assigner</th>
              <th colSpan={4}>Actions</th>
            </tr>
          </thead>
          <tbody>
           {filterFoloowup.length===0?(
<tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                              Data Not Found
                            </td>
                          </tr>
           ):(filterFoloowup.map((v) => {
               const imageUrls=v.lead?.Image.startsWith('http')
              ?v.lead?.Image
              :`http://localhost:8007${v.lead?.Image}`
              const imageUrls2= v.lead?.assigner?.Image.startsWith('http')
              ?v.lead?.assigner?.Image
              :`http://localhost:8007${ v.lead?.assigner?.Image}`
              return (
              <tr key={v._id}>
                 <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={imageUrls} style={{width:'35px',height:'35px',borderRadius:'35px',marginRight:'10px'}} alt="" />{v.lead?.name}</span></td>
                {/* <td>{v.lead?.email}</td> */}
                <td>{v.product?.title} - ₹{v.product?.Price}</td>
                <td>{new Date(v.nextFollowup).toLocaleDateString()}</td>
                <td>{v.remark}</td>
                <td> <span className={`status-badge status-${v.status}`}>
    {v.status}
  </span></td>
                  <td><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={imageUrls2} style={{width:'35px',height:'35px',borderRadius:'35px',marginRight:'10px'}} alt="" />{v.lead?.assigner?.name || v.assigner?.Image}</span></td>
              
                <td><button className="btn btn-follow bg-danger text-danger p-2 me-2" onClick={() => navigate(`/followup/${v?.lead._id}`)}>📞</button>
                
                  {v.status === "Closed" ? (
                    <span className="converted btn btn-inverse-success   text-light " style={{padding:'7px 24px'}}>✔️</span>
                  ) : (
                    <button className="btn btn-convert  text-info btn-inverse-info p-2" onClick={() => handleConvert(v._id)}>Closed</button>
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
