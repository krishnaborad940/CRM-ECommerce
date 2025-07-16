const express=require('express');

const routes=express.Router()
const AuthCtl=require('../Controller/AuthController');
const Auth = require('../Model/AuthModel');
const Product=require("../Model/ProductModel");
const Candidate=require("../Model/CandidateModel")
const Companies=require("../Model/CompaniesModel");
const Lead = require('../Model/LeadModel');
const Note = require('../Model/NoteModule');

// register & Login & profile
routes.post("/",Auth.uploadImageFile,AuthCtl.Register)
routes.post("/Login",AuthCtl.Login)
routes.get("/AllUser",AuthCtl.AllUser)
routes.put("/UpdateProfile/:id",Auth.uploadImageFile,AuthCtl.UpdateProfile)
// totalCount & dashpage
routes.get("/dashCount",AuthCtl.dashCount)
routes.get("/ResentActivities",AuthCtl.ResentActivities)
routes.get("/MonthlyLeadData",AuthCtl.MonthlyLeadData)
routes.get("/MonthlySaleData",AuthCtl.MonthlySaleData)
routes.get("/notification",AuthCtl.notification)
// product add & view & delete & update
routes.post("/Product",Product.uploadImageFile,AuthCtl.Product)
routes.get("/showProduct",AuthCtl.showProduct)
routes.get("/ProductDetails/:id",AuthCtl.ProductDetails)
routes.delete("/DeleteProduct/:id",AuthCtl.DeleteProduct)
routes.get("/EditProduct/:id",AuthCtl.EditProduct)
routes.put("/UpdateProduct/:id",Product.uploadImageFile,AuthCtl.UpdateProduct)
// lead add & view & edit & delete
routes.post("/AddLead",Lead.uploadImageFile,AuthCtl.AddLead)
routes.get("/ViewLead",AuthCtl.ViewLead)
routes.delete("/DeleteLead/:id",AuthCtl.DeleteLead)
routes.get("/editLead/:id",AuthCtl.editLead)
routes.put("/UpdateLead/:id",Lead.uploadImageFile,AuthCtl.UpdateLead)
routes.get("/LeadDetails/:id",AuthCtl.LeadDetails)
// FollowUp
routes.post("/AddFollowup/:id",AuthCtl.AddFollowup)
routes.get("/EditLead/:id",AuthCtl.EditLead)
routes.get("/AllFollowUp",AuthCtl.AllFollowUp)
routes.post("/AddNewFollowUp/:id",AuthCtl.AddNewFollowUp)
// lead=>customer & view & delete & allcustomer &update
routes.post("/AddConvert/:id",AuthCtl.AddConvert)
routes.get("/ViewCustomerDetails/:id",AuthCtl.ViewCustomerDetails)
routes.delete("/DeleteCustomer/:id", AuthCtl.DeleteCustomer);
routes.get("/AllCustomer",AuthCtl.AllCustomer)
routes.get("/editCustomer/:id",AuthCtl.editCustomer)
routes.put("/UpdateCustomer/:id",AuthCtl.UpdateCustomer)
// Ticket
routes.post("/AddTicket/:id",AuthCtl.AddTicket)
routes.get("/ShowTicket",AuthCtl.ShowTicket)
routes.delete("/DeleteTicket/:id",AuthCtl.DeleteTicket)
routes.post("/CloseTicket/:id",AuthCtl.CloseTicket)
routes.get("/ViewTicketDetails/:id",AuthCtl.ViewTicketDetails)
routes.get("/MyTickets/:id",AuthCtl.MyTickets);
// foolowup-->closed
routes.post("/AddClosed/:id",AuthCtl.AddClosed)
// Quatation add & view & 
routes.post("/AddQuatation", AuthCtl.AddQuatation);
routes.get("/ViewQuotation",AuthCtl.ViewQuotation)
routes.get("/ViewQuotationById/:id",AuthCtl.ViewQuotationById)
// Sales =>add & view,convet
routes.post("/AddSales",AuthCtl.AddSales)
routes.get("/ViewSales",AuthCtl.ViewSales)
routes.get("/ViewSalesDetails/:id",AuthCtl.ViewSalesDetails)
routes.post("/convertSlaes/:id",AuthCtl.convertSlaes)
// payment
routes.post("/AddPayment",AuthCtl.AddPayment)
routes.get("/ViewPayments",AuthCtl.ViewPayments)
routes.get("/ViewPaymentDetails/:id",AuthCtl.ViewPaymentDetails)
// Candidate
routes.post("/AddCandidate",Candidate.uploadeImageFile,AuthCtl.AddCandidate)
routes.get("/ViewCandidate",AuthCtl.ViewCandidate)
routes.get("/CandidateDetails/:id",AuthCtl.CandidateDetails)
// Companies->add,delete,view,edit,details
routes.post("/AddCompanies",Companies.uploadImageFile,AuthCtl.AddCompanies)
routes.get("/ViewCompanies",AuthCtl.ViewCompanies)
routes.delete("/DeleteCompanies/:id",AuthCtl.DeleteCompanies)
routes.get("/EditCompanies/:id",AuthCtl.EditCompanies)
routes.put("/UpdateCompanies/:id",Companies.uploadImageFile,AuthCtl.UpdateCompanies)
routes.get("/CompaneyDetails/:id",AuthCtl.CompaneyDetails)
// note->add,view,edit.delete
routes.post("/AddNote",Note.uploadImageFile,AuthCtl.AddNote)
routes.get("/ViewNote",AuthCtl.ViewNote)
routes.get("/NoteDetails/:id",AuthCtl.NoteDetails)
routes.get("/editNote/:id",AuthCtl.editNote)
routes.put("/UpdateNote/:id",Note.uploadImageFile,AuthCtl.UpdateNote)
routes.delete("/DeleteNote/:id",AuthCtl.DeleteNote)

module.exports=routes
