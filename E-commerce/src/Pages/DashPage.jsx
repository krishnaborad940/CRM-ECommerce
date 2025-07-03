import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";
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
    QuotationCount:0
  }); 
  //  const [reminders, setReminders] = useState([]);

  const [recentActivities, setRecentActivities] = useState([]);

  

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#aa00ff"];

  const pieChartData = [
    { name: "Leads", count: count.leadCount },
    { name: "Customers", count: count.CustomerCount },
    { name: "Tickets", count: count.TicketCount },
    { name: "FollowUps", count: count.FollowupCount },
    { name: "Sales", count: count.SalesCount },
  ];

  const lineChartData = [
    { month: "Jan", leads: 5 },
    { month: "Feb", leads: 12 },
    { month: "Mar", leads: 8 },
    { month: "Apr", leads: 15 },
  ];

  const barChartData = [
    { month: "Jan", sales: 2 },
    { month: "Feb", sales: 4 },
    { month: "Mar", sales: 6 },
    { month: "Apr", sales: 5 },
  ];

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

          // leadCount:data.leadCount,

        });
      });
  }, []);

  useEffect(()=>{
    fetch("http://localhost:8007/api/ResentActivities")
    .then(res=>res.json())
    .then((data)=>{
      console.log(data.data)
      setRecentActivities(data.data)
    })
  },[])


  return (
    <div className="dashboard-container" style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />

      <div className="main-content" style={{ flex: 1, padding: "20px" }}>
        <h1>📊 Dashboard</h1>

        <div className="stats-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          <CardLink count={count.leadCount} label="Total Leads" color="#007bff" link="/ViewLeads" />
          <CardLink count={count.CustomerCount} label="Total Customers" color="#28a745" link="/Customer" />
          <CardLink count={count.TicketCount} label="Total Tickets" color="#17a2b8" link="/ViewTicket" />
          <CardLink count={count.FollowupCount} label="Total FollowUps" color="#6610f2" link="/ShowFollowUp" />
          <CardLink count={count.SalesCount} label="Total Sales" color="#ffc107" link="/ViewSales" />
          <CardLink count={count.todayFollowups} label="Today's FollowUps" color="#fd7e14" link="/ShowFollowUp" />
          <CardLink count={`₹${count.TotalSalesAmount}`} label="Total Sales Amount" color="#dc3545" link="/ViewSales"/>
         <CardLink count={`${count.QuotationCount}`} label="Total Quotation" color="blue" link="/ViewQuotation"/>
        </div>

        {/* Charts */}
        <h2>📈 CRM Overview</h2>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", marginBottom: "40px" }}>
          <div style={{ flex: 1, minWidth: 300, height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieChartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ flex: 1, minWidth: 300, height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={lineChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ flex: 1, minWidth: 300, height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={barChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity + Reminders + Quick Buttons */}
       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
  {/* 📝 Recent Activities */}
  <div style={{
    flex: 1,
    minWidth: 300,
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}>
    <h3 style={{ marginBottom: "15px", color: "#007bff" }}>📝 Recent Activities</h3>
    <ul style={{ paddingLeft: "20px" }}>
      {recentActivities.map((activity, index) => (
        <li key={index} style={{ marginBottom: "10px", lineHeight: "1.4" }}>
          {activity.text}
        </li>
      ))}
    </ul>
  </div>

  {/* 📅 Reminders */}
  <div style={{
    flex: 1,
    minWidth: 300,
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}>
    <h3 style={{ marginBottom: "15px", color: "#28a745" }}>📅 Reminders</h3>
    <ul style={{ paddingLeft: "20px" }}>
      <li style={{ marginBottom: "10px" }}>
        🔔 <strong>{count.todayFollowups}</strong> Follow-Up(s) Due Today
      </li>
      <li>
        📄 <strong>{count.QuotationCount}</strong> Quotation(s) Expire Today
      </li>
    </ul>
  </div>

  {/* ✅ Quick Actions */}
  <div style={{
    flex: 1,
    minWidth: 300,
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}>
    <h3 style={{ marginBottom: "15px", color: "#dc3545" }}>✅ Quick Actions</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Link to="/AddLead">
        <button style={quickBtnStyle}>➕ Add Lead</button>
      </Link>
      <Link to="/AddSales">
        <button style={quickBtnStyle}>➕ Add Sale</button>
      </Link>
      <Link to="/ShowFollowUp">
        <button style={quickBtnStyle}>➕ Add FollowUp</button>
      </Link>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

function CardLink({ count, label, color, link }) {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color }}>{count}</h2>
        <p style={{ color: "#000", fontWeight: "500" }}>{label}</p>
      </div>
    </Link>
  );
  
}
const quickBtnStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s ease",
};
