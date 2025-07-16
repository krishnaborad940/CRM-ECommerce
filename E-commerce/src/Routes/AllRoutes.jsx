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
import AddNotes from "../Pages/AddNotes";
import ViewNote from "../Pages/ViewNote";
import NoteDetails from "../Pages/NoteDetilas";
import EditNotes from "../Pages/EditNotes";
import EditProducts from "../Pages/EditProducts";
import CompaniesDetails from "../Pages/CompaniesDetails";
import QuotationPdf from "../Pages/QyotationPdf";

export default function AllRoutes() {
  return (
    <Routes>
      {/* login-register */}
      <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      {/* dashpage */}
        <Route path="/" element={<PrivateRoute><DashPage /></PrivateRoute>} />
        <Route path="/Profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        {/* product */}
        <Route path="/add-product" element={<PrivateRoute><Product /></PrivateRoute>} />
        <Route path="/all-product" element={<PrivateRoute><AllProduct/></PrivateRoute>}/>
        <Route path="/edit-product/:id" element={<PrivateRoute><EditProducts /></PrivateRoute>} />
        <Route path="/product-details/:id" element={<PrivateRoute><ProductDetails/></PrivateRoute>}/>
    {/* leads */}
        <Route path="/add-lead" element={<PrivateRoute><AddLead /></PrivateRoute>} />
        <Route path="/view-leads" element={<PrivateRoute><ViewLeads/></PrivateRoute>}/>
        <Route path="/edit-lead/:id" element={<PrivateRoute><EditLead/></PrivateRoute>}/>
        <Route path="/lead-details/:id" element={<PrivateRoute><LeadDetails/></PrivateRoute>}/>
        {/* followup */}
        <Route path="/followup/:id" element={<PrivateRoute><FollowUp/></PrivateRoute>}/>
        <Route path="/show-followup" element={<PrivateRoute><ShowFollowUp/></PrivateRoute>}/>
        {/* customer */}
        <Route path="/view-customer" element={<PrivateRoute><Customer/></PrivateRoute>}/>
        <Route path="/edit-customer/:id" element={<PrivateRoute><EditCustomer/></PrivateRoute>}/>
        <Route path="/customer-details/:id" element={<PrivateRoute><CustomerDetails/></PrivateRoute>}/>
        {/* ticket */}
        <Route path="/ticket/:id" element={<PrivateRoute><Ticket/></PrivateRoute>}/>
        <Route path="/view-ticket" element={<PrivateRoute><ViewTicket/></PrivateRoute>}/>
        <Route path="/my-ticket/:userRole" element={<PrivateRoute><MyTickets /></PrivateRoute>}/>
        <Route path="/my-ticket" element={<PrivateRoute><MyTickets /></PrivateRoute>}/>
        <Route path="/ticket-details/:id" element={<PrivateRoute><TicketDetails/></PrivateRoute>}/>
        <Route path="/new-followup/:id" element={<PrivateRoute><NewFollowUp/></PrivateRoute>}/>
        {/* Quotatuon */}
        <Route path="/quotation" element={<PrivateRoute><Quotation/></PrivateRoute>}/>
        <Route path="/quotation/:id" element={<PrivateRoute><Quotation/></PrivateRoute>}/>
        <Route path="/quotation-pdf/:id" element={<QuotationPdf />} />
        <Route path="/view-quotation"element={<PrivateRoute><ViewQuotation/></PrivateRoute>}/>
        <Route path="/quotation-details/:id"element={<PrivateRoute><QuotationDetails/></PrivateRoute>}/>
       {/* SalesDetails */}
        <Route path="/add-sale" element={<PrivateRoute><AddSales/></PrivateRoute>}/>
        <Route path="/view-sale" element={<PrivateRoute><ViewSales/></PrivateRoute>}/>
        <Route path="/sale-details/:id" element={<PrivateRoute><SalesDetails/></PrivateRoute>} />
     {/* payment */}
        <Route path="/view-payment" element={<PrivateRoute><ViewPayment/></PrivateRoute>}/>
        <Route path="/payment-details/:id" element={<PrivateRoute><PaymentDetails/></PrivateRoute>}/>
      {/* candidate */}
        <Route path="/add-candidate" element={<PrivateRoute><Candidate/></PrivateRoute>} />
        <Route path="/view-candidate" element={<PrivateRoute><ViewCandidates/></PrivateRoute>} />
        <Route path="/candidate-details/:id" element={<PrivateRoute><CandidateDetails/></PrivateRoute>} />
        {/* companies */}
        <Route path="/add-companies" element={<PrivateRoute><AddCompanies/></PrivateRoute>} />
        <Route path="/add-companies/:id" element={<PrivateRoute><AddCompanies/></PrivateRoute>} />
        <Route path="/view-companies" element={<PrivateRoute><ViewCompanies/></PrivateRoute>}/>
        <Route path="/companies-details/:id" element={<PrivateRoute><CompaniesDetails/></PrivateRoute>}/>
{/* notes */}
        <Route path="/add-notes" element={<PrivateRoute><AddNotes/></PrivateRoute>}/>
        <Route path="/view-notes" element={<PrivateRoute><ViewNote/></PrivateRoute>}/>
        <Route path="/NoteDetails/:id" element={<PrivateRoute><NoteDetails/></PrivateRoute>}/>
       <Route path="/edit-notes/:id" element={<PrivateRoute><EditNotes/></PrivateRoute>}/>
    </Routes>
  );
}