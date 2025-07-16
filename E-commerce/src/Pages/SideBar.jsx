import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
// import "../../public/assets/css/style.css";
import "../Style/Lead.css"


export default function SideBar() {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
const isActive = (path) => location.pathname === path;
  const toggleDropdown = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar1  text-dark position-fixed h-100 " style={{marginTop:'70px', width: '250px' }}>


      <ul className="nav flex-column">
        <li className="nav-item  " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/') ? 'active' : ''}`} to="/">
            <i className="mdi mdi-view-dashboard-outline me-2 " style={{fontSize:'18px'}}></i> Dashboard
          </Link>
        </li>
      
        <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/all-product') ? 'active' : ''}`} to="/all-product">
             <i className="fa fa-cubes menu-icon me-2" style={{fontSize:'18px'}}></i> product
          </Link>
        </li>
         <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/view-companies') ? 'active' : ''}`} to="/view-companies">
           <i className="ri-community-line menu-icon me-2" style={{fontSize:'18px'}}></i> companies
          </Link>
        </li>
         <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/viewleads') ? 'active' : ''}`} to="/view-leads">
                 <i className="mdi mdi-account-multiple menu-icon me-2" style={{fontSize:'18px'}}></i> Lead
          </Link>
        </li>
         <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/view-customer') ? 'active' : ''}`} to="/view-customer">
               <i className="mdi mdi-account-check menu-icon me-2" style={{fontSize:'18px'}}></i> Customer
          </Link>
        </li>
       

        <li className="nav-item  "style={{fontSize:'16px',marginTop:'0px'}}>
          <button
            className="nav-link text-dark bg-transparent border-0 w-100 text-start"
            onClick={() => toggleDropdown("leads")}
          >
               <i className="menu-icon mdi mdi-ticket me-2" style={{fontSize:'18px'}}></i>
            Ticket
            <i className={`mdi ${openMenu === "leads" ? "mdi-chevron-up" : "mdi-chevron-down"} float-end`}></i>
          </button>
          {openMenu === "leads" && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item" style={{marginTop:'-5px'}}>
                <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/view-ticket') ? 'active' : ''}`} to="/view-ticket">➤ All Ticket</Link>
              </li>
              <li className="nav-item"  style={{marginTop:'10px'}}>
                <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/my-ticket') ? 'active' : ''}`} to={`/my-ticket/${JSON.parse(localStorage.getItem("user"))?.userId}`}>➤ My Tickets</Link>
              </li>
            </ul>
          )}
        </li>
           <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/view-quotation') ? 'active' : ''}`} to="/view-quotation">
            <i className="fa fa-file-text menu-icon me-2" style={{fontSize:'18px'}}></i>Quotation
          </Link>
        </li>
            <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/show-followUp') ? 'active' : ''}`} to="/show-followUp">
             <i className="mdi mdi-calendar-clock menu-icon me-2" style={{fontSize:'18px'}}></i> FollowUp
          </Link>
        </li>
            <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/view-sale') ? 'active' : ''}`} to="/view-sale">
             <i className="mdi mdi-cash menu-icon me-2" style={{fontSize:'18px'}}></i> Sales
          </Link>
        </li>
           <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/view-payment') ? 'active' : ''}`} to="/view-payment">
                <i className="ri-money-dollar-circle-line menu-icon me-2" style={{fontSize:'18px'}}></i> Payment
          </Link>
        </li>
            <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/view-candidate') ? 'active' : ''}`} to="/view-candidate">
             <i className="ri-group-fill menu-icon me-2" style={{fontSize:'18px'}}></i> Candidate
          </Link>
        </li>
           <li className="nav-item " style={{fontSize:'16px',marginTop:'0px'}}>
          <Link className={`nav-link text-dark d-flex align-items-center ${isActive('/viw-notes') ? 'active' : ''}`} to="/view-notes">
             <i className="ri-sticky-note-2-fill menu-icon me-2" style={{fontSize:'18px'}}></i> Notes
          </Link>
        </li>

       

        
      </ul>
    </div>
  );
}
