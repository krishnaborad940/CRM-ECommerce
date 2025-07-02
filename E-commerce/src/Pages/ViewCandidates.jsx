import { useEffect, useState } from 'react';
import SideBar from '../Pages/SideBar';
import '../App.css';
import { Link } from 'react-router-dom';

export default function ViewCandidates() {
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8007/api/ViewCandidate")
      .then((res) => res.json())
      .then((data) => {
        setShowData(data.data || []);
      });
  }, []);

  return (
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
            <div className="header">
                        <h1 style={{ margin: 0 }}>🤵All Candidates</h1>
                        <Link to="/Candidate" className="addLeadBtn">➕ Add Candidate</Link>
                     </div>
        {/* Candidate Table */}
        <div className="quotation-container">
          <table className="quotation-table">
            <thead>
              <tr>
                <th colSpan={6}>🧍 Basic Info</th>
                <th colSpan={5}>📍 Address</th>
              </tr>
              <tr>
                {/* Basic Info */}
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Fax</th>
                <th>Website</th>
                {/* Address */}
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Code</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {showData.map((v, i) => (
                <tr key={i}>
                  <td>{v.Fname} {v.Lname}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td>{v.password}</td>
                  <td>{v.fax}</td>
                  <td>{v.website}</td>
                  <td>{v.street}</td>
                  <td>{v.city}</td>
                  <td>{v.state}</td>
                  <td>{v.code}</td>
                  <td>{v.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Second Table */}
        <div className="quotation-container" style={{ marginTop: "30px" }}>
          <table className="quotation-table">
            <thead>
              <tr>
                <th colSpan={5}>📚 Professional</th>
                <th colSpan={3}>🌐 Other</th>
                <th colSpan={4}>📎 Attachments</th>
              </tr>
              <tr>
                {/* Professional */}
                <th>Experience</th>
                <th>Education</th>
                <th>Salary</th>
                <th>Skills</th>
                <th>Additional</th>
                {/* Other */}
                <th>Source</th>
                <th>Twitter ID</th>
                <th>Skype ID</th>
                {/* Attachments */}
                <th>Profile</th>
                <th>Resume</th>
                <th>Cover Letter</th>
                <th>Contract</th>
              </tr>
            </thead>
            <tbody>
              {showData.map((v, i) => (
                <tr key={i}>
                  <td>{v.experience}</td>
                  <td>{v.education}</td>
                  <td>{v.salary}</td>
                  <td>{v.skills}</td>
                  <td>{v.additional}</td>
                  <td>{v.source}</td>
                  <td>{v.twitterId}</td>
                  <td>{v.skypeId}</td>
                  <td>{v.profileImage && <img src={`http://localhost:8007${v.profileImage}`} alt="Profile" width="50" />}</td>
                  <td>{v.resume && <a href={`http://localhost:8007${v.resume}`} target="_blank" rel="noreferrer">View</a>}</td>
                  <td>{v.coverLetter && <a href={`http://localhost:8007${v.coverLetter}`} target="_blank" rel="noreferrer">View</a>}</td>
                  <td>{v.contract && <a href={`http://localhost:8007${v.contract}`} target="_blank" rel="noreferrer">View</a>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
