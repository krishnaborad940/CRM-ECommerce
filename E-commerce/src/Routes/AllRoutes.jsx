import { Routes, Route } from "react-router-dom";
import DashPage from "../Pages/DashPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Product from "../Pages/Product";
import AddLead from "../Pages/AddLead";
import ViewLeads from "../Pages/ViewLeads";
import EditLead from "../Pages/EditLead";
import FollowUp from "../Pages/FollowUp";
import AllProduct from "../Pages/AllProduct";
import Customer from "../Pages/Customer";
import EditCustomer from "../Pages/EditCustomer";
import Ticket from "../Pages/Ticket";
import ViewTicket from "../Pages/ViewTicket";
import ShowFollowUp from "../Pages/ShowFollowUp";
import MyTickets from "../Pages/MyTickets";
import NewFollowUp from "../Pages/NewFollowUp";
import Quotation from "../Pages/Quotation";
import ViewQuotation from "../Pages/ViewQuotation";
import QuotationDetails from "../Pages/QuotationDetails";
import AddSales from "../Pages/AddSales";
import ViewSales from "../Pages/ViewSales";
import ViewPayment from "../Pages/ViewPayment";
import Profile from "../Pages/Profile";
import Candidate from "../Pages/Candidate";
import ViewCandidates from "../Pages/ViewCandidates";
import ProductDetails  from "../Pages/ProductDetails";
import LeadDetails from "../Pages/LeadDetails";
import CustomerDetails from "../Pages/CustomerDetails";
import TicketDetails from "../Pages/TicketDetails";
import SalesDetails from "../Pages/SalesDetails";
import PrivateRoute from "./PrivateRoute";
import PaymentDetails from "../Pages/PaymentDetails";
import AddCompanies from "../Pages/AddCompaines";
import ViewCompanies from "../Pages/ViewCompanies";
import CandidateDetails from "../Pages/CandidateDetails";

export default function AllRoutes() {
  return (
    <Routes>
      {/* <Route  path=""/> */}
        <Route path="/" element={<PrivateRoute><DashPage /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addProduct" element={<PrivateRoute><Product /></PrivateRoute>} />
        <Route path="/AddLead" element={<PrivateRoute><AddLead /></PrivateRoute>} />
        <Route path="/ViewLeads" element={<PrivateRoute><ViewLeads/></PrivateRoute>}/>
        <Route path="/EditLead/:id" element={<PrivateRoute><EditLead/></PrivateRoute>}/>
        <Route path="/LeadDetails/:id" element={<PrivateRoute><LeadDetails/></PrivateRoute>}/>
        <Route path="/FollowUp/:id" element={<PrivateRoute><FollowUp/></PrivateRoute>}/>
        <Route path="/ShowFollowUp" element={<PrivateRoute><ShowFollowUp/></PrivateRoute>}/>
        <Route path="/Product" element={<PrivateRoute><AllProduct/></PrivateRoute>}/>
        <Route path="/ProductDetails/:id" element={<PrivateRoute><ProductDetails/></PrivateRoute>}/>
        <Route path="/Customer" element={<PrivateRoute><Customer/></PrivateRoute>}/>
        <Route path="/EditCustomer/:id" element={<PrivateRoute><EditCustomer/></PrivateRoute>}/>
        <Route path="/CustomerDetails/:id" element={<PrivateRoute><CustomerDetails/></PrivateRoute>}/>
        <Route path="/Ticket/:id" element={<PrivateRoute><Ticket/></PrivateRoute>}/>
        <Route path="/ViewTicket" element={<PrivateRoute><ViewTicket/></PrivateRoute>}/>
        <Route path="/MyTickets/:userRole" element={<PrivateRoute><MyTickets /></PrivateRoute>}/>
        <Route path="/MyTickets" element={<PrivateRoute><MyTickets /></PrivateRoute>}/>

        <Route path="/TicketDetails/:id" element={<PrivateRoute><TicketDetails/></PrivateRoute>}/>
        <Route path="/NewFollowUp/:id" element={<PrivateRoute><NewFollowUp/></PrivateRoute>}/>
        {/* <Route path="/Quotation" element={<PrivateRoute><Quotation/></PrivateRoute>}/> */}
        <Route path="/Quotation" element={<PrivateRoute><Quotation/></PrivateRoute>}/>

        <Route path="/ViewQuotation"element={<PrivateRoute><ViewQuotation/></PrivateRoute>}/>
        <Route path="/QuotationDetails/:id"element={<PrivateRoute><QuotationDetails/></PrivateRoute>}/>
        <Route path="/AddSales" element={<PrivateRoute><AddSales/></PrivateRoute>}/>
        <Route path="/ViewSales" element={<PrivateRoute><ViewSales/></PrivateRoute>}/>
        <Route path="/SalesDetails/:id" element={<PrivateRoute><SalesDetails/></PrivateRoute>} />
        <Route path="/ViewPayment" element={<PrivateRoute><ViewPayment/></PrivateRoute>}/>
        <Route path="/PaymentDetails/:id" element={<PrivateRoute><PaymentDetails/></PrivateRoute>}/>
        <Route path="/Profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/Candidate" element={<PrivateRoute><Candidate/></PrivateRoute>} />
        <Route path="/ViewCandidates" element={<PrivateRoute><ViewCandidates/></PrivateRoute>} />
        <Route path="/candidate-details/:id" element={<PrivateRoute><CandidateDetails/></PrivateRoute>} />
        <Route path="/add-companies" element={<PrivateRoute><AddCompanies/></PrivateRoute>} />
        <Route path="/add-companies/:id" element={<PrivateRoute><AddCompanies/></PrivateRoute>} />
        <Route path="/view-Companies" element={<PrivateRoute><ViewCompanies/></PrivateRoute>}/>
    </Routes>
  );
}