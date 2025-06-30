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

export default function AllRoutes() {
  return (
    <Routes>
      {/* <Route  path=""/> */}
      <Route path="/" element={<DashPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addProduct" element={<Product />} />
      <Route path="/AddLead" element={<AddLead />} />
      <Route path="/ViewLeads" element={<ViewLeads/>}/>
      <Route path="/EditLead/:id" element={<EditLead/>}/>
    <Route path="/FollowUp/:id" element={<FollowUp/>}/>
    <Route path="/ShowFollowUp" element={<ShowFollowUp/>}/>
    <Route path="/Product" element={<AllProduct/>}/>
    <Route path="/Customer" element={<Customer/>}/>
    <Route path="/EditCustomer/:id" element={<EditCustomer/>}/>
 <Route path="/Ticket/:id" element={<Ticket/>}/>
 <Route path="/ViewTicket" element={<ViewTicket/>}/>
 <Route path="/MyTickets/:userRole" element={<MyTickets />}/>
 <Route path="/NewFollowUp/:id" element={<NewFollowUp/>}/>

 <Route path="/Quotation/:id" element={<Quotation/>}/>
 <Route path="/ViewQuotation"element={<ViewQuotation/>}/>
 <Route path="/QuotationDetails/:id"element={<QuotationDetails/>}/>

 <Route path="/AddSales" element={<AddSales/>}/>
 <Route path="/ViewSales" element={<ViewSales/>}/>
 <Route path="/ViewPayment" element={<ViewPayment/>}/>

    </Routes>
  );
}