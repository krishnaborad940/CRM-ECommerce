import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../public/assets/css/style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Header({ searchTerm, setSearchTerm }) {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Notifications
  useEffect(() => {
    fetch("http://localhost:8007/api/notification")
      .then((res) => res.json())
      .then((data) => {
        let notify = [];
        if (data.followups && data.followups.length > 0) {
          notify.push(`You have ${data.followups.length} follow-up(s) today`);
        }
        if (data.expiring && data.expiring.length > 0) {
          notify.push(`${data.expiring.length} quotation(s) have expired`);
        }
         if (data.lowStock && data.lowStock.length > 0) {
            data.lowStock.forEach(product => {
              notify.push(` ${product.title} stock is only ${product.stock} left`);
            });
        }
         if (data.outStock && data.outStock.length > 0) {
            data.outStock.forEach(product => {
              notify.push(` ${product.title} (Out Of Stock)`);
            });
        }
          const uniqueNotify = [...new Set(notify)];
        setNotifications(notify);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Notification Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light bg-white shadow-sm px-4"
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 999,
      }}
    >
      {/* Left: Logo */}
      <div className="d-flex align-items-center">
        <Link className="navbar-brand me-3" to="/">
          <img src="/assets/images/logo.svg" alt="Logo" style={{ height: "35px" }} />
        </Link>
      </div>

      {/* Center: Search */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="position-relative" style={{ maxWidth: "260px", width: "100%" }}>
          <i
            className="ri-search-line position-absolute"
            style={{
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#777",
              fontSize: "16px"
            }}
          ></i>
          <input
            type="text"
            placeholder="Search here..."
            className="form-control ps-4"
            style={{
              height: "36px",
              borderRadius: "6px",
              background: "#f9f9f9",
              border: "1px solid #ccc",
              paddingLeft: "32px"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Right: Notification Bell & User */}
      <ul className="navbar-nav d-flex align-items-center" style={{ marginTop: '10px' }}>
        {/* Notification Bell */}
        <li className="nav-item dropdown me-3 mt-1">
          <a
            className="nav-link dropdown-toggle position-relative"
            href="#"
            data-bs-toggle="dropdown"
          >
            <i className="mdi mdi-bell-outline" style={{ fontSize: "22px" }}></i>
            {notifications.length > 0 && (
              <span
                className="badge bg-danger rounded-pill position-absolute"
                style={{
                  top: "2px",
                  right: "2px",
                  fontSize: "10px",
                  padding: "3px 6px"
                }}
              >
                {notifications.length}
              </span>
            )}
          </a>
          <ul className="dropdown-menu dropdown-menu-end shadow" style={{ width: "300px",marginRight:'-100px' }}>
            <li></li>

            {/* ✅ Notifications List */}
            {loading ? (
              <li className="dropdown-item text-center text-muted">Loading...</li>
            ) : notifications.length > 0 ? (
              notifications.map((msg, index) => (
               <li
  key={index}
  className="dropdown-item d-flex align-items-start text-dark"
  style={{ cursor: "pointer" }}
>
  <i className="mdi mdi-bell-ring-outline text-warning me-2"></i>
  <span>{msg}</span>
</li>

              ))
            ) : (
              <li className="dropdown-item text-center text-muted">No new notifications</li>
            )}
          </ul>
        </li>

        {/* ✅ User Profile */}
        <li className="nav-item dropdown " style={{marginTop:'1px'}}>
          <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" data-bs-toggle="dropdown">
            <img
              src={
                parsedUser?.userImage
                  ? `http://localhost:8007${parsedUser.userImage}`
                  : "/assets/images/faces/face1.jpg"
              }
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "35px", height: "35px" }}
            />
            <span className="d-none d-md-inline fw-semibold text-dark">
              {parsedUser?.userName || "User"}
            </span>
          </a>
          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li>
              <Link className="dropdown-item" to="/profile">
                <i className="mdi mdi-account me-2 text-primary"></i> My Profile
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                <i className="mdi mdi-logout me-2"></i> Sign out
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
