import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";
import Header from "./Header";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function DashPage() {
  const [count, setCount] = useState({
    leadCount: 0,
    CustomerCount: 0,
    TicketCount: 0,
    FollowupCount: 0,
    todayFollowups: 0,
    SalesCount: 0,
    TotalSalesAmount: 0,
    QuotationCount: 0,
  });

  const [allNotifications, setAllNotifications] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const COLORS = ["#0d6efd", "#6610f2", "#6f42c1", "#d63384", "#dc3545"];

  const pieChartData = [
    { name: "Leads", count: count.leadCount },
    { name: "Customers", count: count.CustomerCount },
    { name: "Tickets", count: count.TicketCount },
    { name: "FollowUps", count: count.FollowupCount },
    { name: "Sales", count: count.SalesCount },
  ];

  //  Fetch Notifications
  useEffect(() => {
    fetch("http://localhost:8007/api/notification")
      .then((res) => res.json())
      .then((data) => {
        let notify = [];
        if (data.followups && data.followups.length > 0) {
          notify.push(`You have ${data.followups.length} follow-up(s) today`);
        }
        if (data.expiring && data.expiring.length > 0) {
          notify.push(`${data.expiring.length} quotation(s) expiring today`);
        }
        if (data.lowStock && data.lowStock.length > 0) {
          data.lowStock.forEach((product) => {
            notify.push(` ${product.title} stock is low (only ${product.stock} left)`);
          });
        }
        if (data.outStock && data.outStock.length > 0) {
          data.outStock.forEach((product) => {
            notify.push(` ${product.title} (Out Of Stock)`);
          });
        }
        if (notify.length > 0) {
          setAllNotifications(notify);
        }
      })
      .catch((err) => console.error("Notification Fetch Error:", err));
  }, []);

  useEffect(() => {
    if (allNotifications.length > 0) {
      const interval = setInterval(() => {
        setAllNotifications((prev) => prev.slice(1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [allNotifications]);

  // Monthly Leads (Doughnut Data)
  useEffect(() => {
    fetch("http://localhost:8007/api/MonthlyLeadData")
      .then((res) => res.json())
      .then((data) =>{
        console.log(data)
         setLineChartData(data)
      });
  }, []);

  //  Monthly Sales
  useEffect(() => {
    fetch("http://localhost:8007/api/MonthlySaleData")
      .then((res) => res.json())
      .then((data) => setBarChartData(data));
  }, []);

  // ✅ Dashboard Count
  useEffect(() => {
    fetch("http://localhost:8007/api/dashCount")
      .then((res) => res.json())
      .then((data) => {
        setCount({
          leadCount: data.leadCount,
          CustomerCount: data.CustomerCount,
          TicketCount: data.TicketCount,
          FollowupCount: data.FollowupCount,
          SalesCount: data.SalesCount,
          todayFollowups: data.todayFollowups,
          TotalSalesAmount: data.TotalSalesAmount,
          QuotationCount: data.QuotationCount,
        });
      });
  }, []);

  // ✅ Recent Activities
  useEffect(() => {
    fetch("http://localhost:8007/api/ResentActivities")
      .then((res) => res.json())
      .then((data) => setRecentActivities(data.data));
  }, []);

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel" style={{ marginTop: "40px", marginLeft: "260px" }}>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title ms-5 fs-5">
                <i className="mdi mdi-home bg-gradient-primary text-white me-2"></i> Dashboard
              </h3>
            </div>

            {/* ✅ Notification Popup */}
            <div className="row" style={{ marginTop: "-30px" }}>
              <div className="notification-container">
                {allNotifications.slice(0, 2).map((msg, index) => (
                  <div key={index} className={`notification-popup ${index === 0 ? "first" : "second"}`}>
                    {msg}
                  </div>
                ))}
              </div>

              {/* Cards */}
               {/* Total Lead */}
           <div className="col-md-3 stretch-card grid-margin">
  <div className="card bg-gradient-danger card-img-holder text-white " style={{height:"160px"}}>
    <div className="card-body">
      <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
      <h2 className="">{count.leadCount}</h2>
      <h6 className="card-text">Total Lead</h6>
    </div>
  </div>
</div>
  {/* Total Customer */}
  <div className="col-md-3 stretch-card grid-margin">
    <div className="card bg-gradient-success card-img-holder text-white" style={{ height: "160px" }}>
      <div className="card-body">
        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
        <h2 className=" fw-bold fs-2">{count.CustomerCount}</h2>
        <h5 className="card-text fw-semibold">Total Customer</h5>
      </div>
    </div>
  </div>

  {/* Total Ticket */}
  <div className="col-md-3 stretch-card grid-margin">
    <div className="card bg-gradient-info card-img-holder text-white" style={{ height: "160px" }}>
      <div className="card-body">
        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
        <h2 className=" fw-bold fs-2">{count.TicketCount}</h2>
        <h5 className="card-text fw-semibold">Total Ticket</h5>
      </div>
    </div>
  </div>

  {/* Total FollowUp */}
  <div className="col-md-3 stretch-card grid-margin">
    <div className="card bg-gradient-primary card-img-holder text-dark" style={{ height: "160px" }}>
      <div className="card-body">
        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
        <h2 className=" fw-bold fs-2">{count.FollowupCount}</h2>
        <h5 className="card-text fw-semibold">Total FollowUp</h5>
      </div>
    </div>
  </div>

  {/* Total Sales */}
  <div className="col-md-3 stretch-card grid-margin">
    <div className="card bg-gradient-primary card-img-holder text-white" style={{ height: "160px" }}>
      <div className="card-body">
        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
        <h2 className=" fw-bold fs-2">{count.SalesCount}</h2>
        <h5 className="card-text fw-semibold">Total Sales</h5>
      </div>
    </div>
  </div>

  {/* Today's FollowUp */}
  <div className="col-md-3 stretch-card grid-margin">
    <div className="card bg-gradient-info card-img-holder text-white" style={{ height: "160px" }}>
      <div className="card-body">
        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
        <h2 className=" fw-bold fs-2">{count.todayFollowups}</h2>
        <h5 className="card-text fw-semibold">Today's FollowUp</h5>
      </div>
    </div>
  </div>

  {/* Total Sales Amount */}
  <div className="col-md-3 stretch-card grid-margin">
    <div className="card bg-gradient-dark card-img-holder text-white" style={{ height: "160px" }}>
      <div className="card-body">
        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
        <h2 className=" fw-bold fs-2">₹{count.TotalSalesAmount}</h2>
        <h5 className="card-text fw-semibold">Total Sales Amount</h5>
      </div>
    </div>
  </div>

  {/* Total Quotation */}
  <div className="col-md-3 stretch-card grid-margin">
    <div className="card bg-gradient-danger card-img-holder text-dark" style={{ height: "160px" }}>
      <div className="card-body">
        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
        <h2 className=" fw-bold fs-2">{count.QuotationCount}</h2>
        <h5 className="card-text fw-semibold">Total Quotation</h5>
      </div>
    </div>
  </div>
              {/* Repeat your existing card layout here for counts */}
            </div>

            {/* ✅ Charts Section */}
            <div className="row">
              {/* Pie Chart */}
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Visit And Sales Statistics</h4>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Monthly Leads Doughnut Chart */}
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Monthly Leads (Doughnut)</h4>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={lineChartData}
                            dataKey="leads"
                            nameKey="date"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            label
                          >
                            {lineChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Bar Chart */}
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Monthly Sales</h4>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <BarChart data={barChartData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="sales" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Recent Activities */}
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card shadow-sm border-0 w-100">
                  <div className="card-body">
                    <div style={{ background: "#f9f9f9", borderRadius: "12px" }}>
                      <h5 style={{ marginBottom: "20px", color: "#007bff", fontWeight: "600" }}>
                        📝 Recent Activities
                      </h5>
                      {recentActivities.length > 0 ? (
                        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                          {recentActivities.map((activity, index) => (
                            <li key={index} style={{ marginBottom: "12px", padding: "12px" }}>
                              <i className="mdi mdi-check-circle-outline text-success me-2"></i>
                              <span>{activity.text}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ color: "#888" }}>No recent activity.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
                        {/* --reminder-- */}
                           <div className="row">
                                          {/* Reminders */}
                                                    <div className="col-md-6 grid-margin stretch-card">
                                                        <div className="card">
                                           <div className="card2 shadow-sm">
                          <div className="card-body2 shadow-sm p-4 rounded" style={{ backgroundColor: "#f9f9f9" }}>
                          <h5 className="fw-bold mb-4 text-dark">📅 Today's Reminders</h5>
                        
                          <div className="table-responsive">
                            <table className="table align-middle table-hover">
                              <thead className="table-light">
                                <tr className="text-secondary">
                                  <th>Reminder</th>
                                  <th className="text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="d-flex align-items-center">
                                    <i className="mdi mdi-bell-ring-outline me-2 text-warning fs-5"></i>
                                    <span className="fw-semibold">Follow-Ups Due Today</span>
                                  </td>
                                  <td className="text-center">
                                    <span className="badge rounded-pill bg-success px-3 py-2 fs-6">
                                      {count.todayFollowups || 0}
                                    </span>
                                  </td>
                                </tr>
                        
                                <tr className="bg-white">
                                  <td className="d-flex align-items-center">
                                    <i className="mdi mdi-file-document-outline me-2 text-primary fs-5"></i>
                                    <span className="fw-semibold">Quotations Expiring Today</span>
                                  </td>
                                  <td className="text-center">
                                    <span className="badge rounded-pill bg-danger px-3 py-2 fs-6">
                                      {count.QuotationCount || 0}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        </div>
                        
                                                        </div>
                                                      </div>
                        {/* button */}
                                                        <div className="col-md-6 grid-margin stretch-card">
                                                        <div className="card">
                                                          <div className="card-body2">
                                                            {/* <h4 className="card-title">Monthly Sales</h4> */}
                                                      {/* ✅ Quick Actions */}
                                                          <div style={{
                                                            flex: 1,
                                                            // minWidth: 300,
                                                            background: "#fff",
                                                            padding: "20px",
                                                            borderRadius: "12px",
                                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                                          }}>
                                                            <h3 style={{ marginBottom: "5px", color: "#dc3545" }}>✅ Quick Actions</h3>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                                              <Link to="/add-lead">
                                                                <button >➕ Add Lead</button>
                                                              </Link>
                                                              <Link to="/add-sale">
                                                                <button >➕ Add Sale</button>
                                                              </Link>
                                                              <Link to="/show-followup">
                                                                <button >➕ Add FollowUp</button>
                                                              </Link>
                                                            </div>
                                                          </div>
                                                          </div>
                                                        </div>
                                                      </div>   
                                        </div>
          </div>


          {/* ✅ Footer */}
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted">Copyright © 2023 BootstrapDash</span>
              <span className="float-none float-sm-right">Hand-crafted & made with ❤️</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
