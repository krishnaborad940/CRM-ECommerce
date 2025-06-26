const express=require('express');

const routes=express.Router()
const AuthCtl=require('../Controller/AuthController');
const Auth = require('../Model/AuthModel');
const Product=require("../Model/ProductModel");
const Customer = require('../Model/CustomerModel');

routes.post("/",Auth.uploadImageFile,AuthCtl.Register)
routes.post("/Login",AuthCtl.Login)
routes.get("/AllUser",AuthCtl.AllUser)


routes.post("/Product",Product.uploadImageFile,AuthCtl.Product)
routes.get("/showProduct",AuthCtl.showProduct)


routes.post("/AddLead",AuthCtl.AddLead)
routes.get("/ViewLead",AuthCtl.ViewLead)
routes.delete("/DeleteLead/:id",AuthCtl.DeleteLead)
routes.get("/editLead/:id",AuthCtl.editLead)
routes.put("/UpdateLead/:id",AuthCtl.UpdateLead)


// FollowUp
routes.post("/AddFollowup/:id",AuthCtl.AddFollowup)
// lead=>customer
routes.post("/AddConvert/:id",AuthCtl.AddConvert)

// totalCount
routes.get("/dashCount",AuthCtl.dashCount)
// allCustomer
routes.get("/AllCustomer",AuthCtl.AllCustomer)
routes.get("/editCustomer/:id",AuthCtl.editCustomer)
routes.put("/UpdateCustomer/:id",AuthCtl.UpdateCustomer)

// Ticket
routes.post("/AddTicket/:id",AuthCtl.AddTicket)
routes.get("/ShowTicket",AuthCtl.ShowTicket)
routes.delete("/DeleteTicket/:id",AuthCtl.DeleteTicket)
routes.post("/CloseTicket/:id",AuthCtl.CloseTicket)
// foolowup-->closed
routes.get("/AllFollowUp",AuthCtl.AllFollowUp)
routes.post("/AddClosed/:id",AuthCtl.AddClosed)

// ticket-assigne
routes.get("/MyTickets/:id",AuthCtl.MyTickets);
routes.post("/AddNewFollowUp/:id",AuthCtl.AddNewFollowUp)
routes.get("/EditLead/:id",AuthCtl.EditLead)
// assigner
routes.patch("/UpdateTicketStatus:id",AuthCtl.UpdateTicketStatus)

module.exports=routes