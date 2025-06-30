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
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, text: "Krishna added new Lead: ABC Corp" },
    { id: 2, text: "You closed ticket #123" },
  ]);

  const [reminders, setReminders] = useState([
    { id: 1, text: "3 follow-ups due today" },
    { id: 2, text: "2 quotations expire tomorrow" },
  ]);

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
        });
      });
  }, []);

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
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <h3>📝 Recent Activities</h3>
            <ul>
              {recentActivities.map((activity) => (
                <li key={activity.id}>{activity.text}</li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 1, minWidth: 300 }}>
            <h3>📅 Reminders</h3>
            <ul>
              {reminders.map((reminder) => (
                <li key={reminder.id}>{reminder.text}</li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 1, minWidth: 300 }}>
            <h3>✅ Quick Actions</h3>
            <Link to="/AddLead"><button style={{ marginBottom: 10 }}>+ Add Lead</button></Link><br />
            <Link to="/AddSales"><button style={{ marginBottom: 10 }}>+ Add Sale</button></Link><br />
            <Link to="/ShowFollowUp"><button>+ Add FollowUp</button></Link>
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