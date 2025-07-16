import { useEffect, useState } from "react";
import SideBar from "../Pages/SideBar";
import Header from "./Header";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Image: null,
    role: "",
  });

  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    console.log(storeUser)
    if (storeUser) {
      const parsedUser = JSON.parse(storeUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.userName,
        email: parsedUser.userEmail,
        password: parsedUser.userPassword,
        Image: parsedUser.userImage,
        role: parsedUser.userRole,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Image" ? files[0] : value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("ConfirmPassword", formData.ConfirmPassword);
    data.append("role", formData.role);
   data.append("Image", formData.Image);

    fetch(`http://localhost:8007/api/UpdateProfile/${user.userId}`, {
      method: "PUT",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const updatedUser = {
          ...user,
          userName: formData.name,
          userEmail: formData.email,
          userRole: formData.role,
          userImage: data?.data?.Image || user.userImage,
          userPassword:formData.password
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // console.log(updatedUser)
        setUser(updatedUser);
        setEditMode(false);
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Update failed");
      });
  };

  return (
    <div className="container-scroller">
      <Header/>
    <div className="container-fluid page-body-wrapper">
      <SideBar />
      <div className="main-panel" style={{marginLeft:'250px'}}>
        <div className="content-wrapper">
          <div className="main-container" style={{ marginTop: "30px" }}>
        <div style={styles.wrapper}>
          <h2 style={styles.title}>👤 User Profile</h2>
          {user ? (
            <div style={styles.profileCard}>
              <img
                src={`http://localhost:8007${user.userImage}`}
                alt="User"
                style={styles.image}
              />
              <div style={styles.details}>
                <p><strong>Name:</strong> {user.userName}</p>
                <p><strong>Email:</strong> {user.userEmail}</p>
                <p><strong>Role:</strong> {user.userRole}</p>
                {/* <p><strong>Password:</strong> {user.userPassword}</p> */}
                <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
                <a href="/" className="btn btn-gradient-primary" style={{padding:'10px 12px'}}>Back</a>
              </div>
            </div>
          ) : (
            <p style={styles.loading}>Loading user info...</p>
          )}
        </div>

        {/* Modal for Edit */}
        {editMode && (
          <div style={styles.modalBackdrop}>
            <div style={styles.modal}>
              <h3>Edit Profile</h3>
              <form onSubmit={handleUpdate}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                {/* <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" /> */}
                <input type="file" name="Image" accept="image/*" onChange={handleChange} />
            
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="">--select--</option>
                  <option value="Admin">Admin</option>
                  <option value="teleCaller">TeleCaller</option>
                  <option value="sales">Sales</option>
                  <option value="Supporter">Supporter</option>
                </select>
                <div style={{ marginTop: "10px" }}>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
        </div>
      </div>
    </div>
      
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop:"50px"
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  profileCard: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    maxWidth: "700px",
    width: "100%",
  },
  image: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #007bff",
    textAlign:"center"
  },
  details: {
    lineHeight: "1.8",
    fontSize: "16px",
    color: "#444",
  },
  loading: {
    fontSize: "18px",
    color: "#888",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
};
