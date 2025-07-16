// CandidateFormStyled.jsx
import SideBar from '../Pages/SideBar';
import Header from "../Pages/Header";
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import './CandidateFormStyled.css';

export default function CandidateFormStyled() {
  const [formData, setFormData] = useState({
    Fname: '', Lname: '', email: '', password: '', ConfirmPassword: '', phone: '', fax: '', website: '',
    street: '', city: '', state: '', code: '', country: '',
    experience: '', education: '', salary: '', skills: '', additional: '',
    source: '', twitterId: '', skypeId: '',
    educationInfo: [{ degree: '', institute: '', year: '' }],
    workExperience: [{ company: '', role: '', duration: '' }],
    resume: null, coverLetter: null, contract: null, profileImage: null
  });

const handleChange = (e, sectionIndex = null, fieldName = null, type = null) => {
  const { name, value, files } = e.target;

  if (type === 'educationInfo') {
    const updated = [...formData.educationInfo];
    updated[sectionIndex][fieldName] = value;
    setFormData({ ...formData, educationInfo: updated });
  } else if (type === 'workExperience') {
    const updated = [...formData.workExperience];
    updated[sectionIndex][fieldName] = value;
    setFormData({ ...formData, workExperience: updated });
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value
    }));
  }
};


  const addEducation = () => {
    setFormData({
      ...formData,
      educationInfo: [...formData.educationInfo, { degree: '', institute: '', year: '' }]
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, { company: '', role: '', duration: '' }]
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  for (let key in formData) {
    if (Array.isArray(formData[key])) {
      data.append(key, JSON.stringify(formData[key]));
    } else if (formData[key] instanceof File) {
      data.append(key, formData[key], formData[key].name); // ✅ append file properly
    } else if (formData[key] !== null && formData[key] !== '') {
      data.append(key, formData[key]);
    }
  }

  try {
    const res = await fetch("http://localhost:8007/api/AddCandidate", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log("Server response:", result);
    alert("Candidate created successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong");
  }
};



  return (
    <div className="container-scroller">
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <SideBar />
        <div className="main-panel" style={{marginLeft:'250px',marginTop:'40px'}}>
          <div className="content-wrapper">
            {/* header */}
              <div className="page-header">
              <h3 className="page-title" style={{ marginLeft: '60px' }}>🏢 Add New candidate</h3>
              <nav aria-label="breadcrumb">
                <Link to="/view-candidate" className="btn btn-outline-primary text-dark  rounded " style={{ color: "white",padding:'10px 15px',fontSize:'15px' }}>
                  Back
                </Link>
              </nav>
            </div>
            <div className="card-form">
              <form onSubmit={handleSubmit} encType="multipart/form-data" className='lead-form'>
{/* Basic Infomation */}
                <section>
                  <h2 className="section-title">Basic Information</h2>
                  <div className="form-row">
                    <div className="form-field"><label>First Name *</label><input type="text" name="Fname" value={formData.Fname} onChange={handleChange} placeholder="Candidate First Name" required /></div>
                    <div className="form-field"><label>Last Name *</label><input type="text" name="Lname" value={formData.Lname} onChange={handleChange} placeholder="Candidate Last Name" required /></div>
                    <div className="form-field"><label>Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Candidate Email" required /></div>
                    <div className="form-field"><label>Phone Number *</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Candidate Number" /></div>
                    <div className="form-field"><label>Password *</label><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Candidate Password" required /></div>
                    <div className="form-field"><label>Confirm Password *</label><input type="password" name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleChange} placeholder="Confirm Candidate Password" required /></div>
                    <div className="form-field"><label>Fax</label><input type="text" name="fax" value={formData.fax} onChange={handleChange} placeholder="Fax" /></div>
                    <div className="form-field"><label>Website</label><input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" /></div>
                  </div>
                </section>
{/* address Information */}
                <section>
                  <h2 className="section-title">Address Information</h2>
                  <div className="form-row">
                    <div className="form-field"><label>Street</label><input type="text" name="street" value={formData.street} onChange={handleChange} /></div>
                    <div className="form-field"><label>City</label><input type="text" name="city" value={formData.city} onChange={handleChange} /></div>
                    <div className="form-field"><label>State</label><input type="text" name="state" value={formData.state} onChange={handleChange} /></div>
                    <div className="form-field"><label>Code</label><input type="text" name="code" value={formData.code} onChange={handleChange} /></div>
                    <div className="form-field"><label>Country</label>
                    <select name="country" value={formData.country} onChange={handleChange}>
                          <option value="">-- Select Country --</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                        </select>
                      </div>
                  </div>
                </section>
{/* Professional */}
                <section>
                  <h2 className="section-title">Professional Details</h2>
                  <div className="form-row">
                    <div className="form-field"><label>Experience</label>
                     <select
        id="experience"
        name='experience'
        value={formData.experience}
        onChange={handleChange}
        style={{ padding: "6px", borderRadius: "6px", marginLeft: "10px" }}
      >
        <option value="">-- Select Experience --</option>
        <option value="Fresher">Fresher</option>
        <option value="0-1">0-1 Years</option>
        <option value="1-3">1-3 Years</option>
        <option value="3-5">3-5 Years</option>
        <option value="5+">5+ Years</option>
      </select></div>
                    <div className="form-field"><label>Education</label>
                       <select
        id="education"
        name='education'
        value={formData.education}
        onChange={handleChange}
        style={{ padding: "6px", borderRadius: "6px", marginLeft: "10px" }}
      >
         <option value="">-- Select Education --</option>
  <option value="BCA">BCA</option>
  <option value="MCA">MCA</option>
  <option value="B.Tech">B.Tech</option>
  <option value="M.Tech">M.Tech</option>
  <option value="B.Sc IT">B.Sc IT</option>
  <option value="M.Sc IT">M.Sc IT</option>
  <option value="Diploma in Computer">Diploma in Computer</option>
  <option value="Other">Other</option>
      </select>
                    </div>
                    <div className="form-field"><label>Salary</label><input type="text" name="salary" value={formData.salary} onChange={handleChange} /></div>
                    <div className="form-field"><label>Skills</label>  <select
        id="skill"
        name='skills'
        value={formData.skills}
        onChange={handleChange}
        style={{ padding: "6px", borderRadius: "6px", marginLeft: "10px" }}
      >
        <option value="">-- Select Skill --</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
        <option value="MERN">MERN</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
      </select></div>
                    <div className="form-field"><label>Additional Info</label><textarea name="additional" value={formData.additional} onChange={handleChange}></textarea></div>
                  </div>
                </section>
{/* education */}
              <section>
                  <h2 className="section-title">Education Information <button type="button" onClick={addEducation}>➕</button></h2>
                  {formData.educationInfo.map((edu, index) => (
                    <div className="form-row" key={index}>
                      <div className="form-field"><label>Degree</label>
                        <select value={edu.degree} onChange={(e) => handleChange(e, index, 'degree', 'educationInfo')}>
                          <option value="">-- Select Degree --</option>
                          <option value="BCA">BCA</option>
                          <option value="MCA">MCA</option>
                          <option value="B.Tech">B.Tech</option>
                          <option value="M.Tech">M.Tech</option>
                          <option value="MBA">MBA</option>
                          <option value="B.Com">B.Com</option>
                        </select>
                      </div>
                      <div className="form-field"><label>Institute</label>
                        <select value={edu.institute} onChange={(e) => handleChange(e, index, 'institute', 'educationInfo')}>
                          <option value="">-- Select Institute --</option>
                          <option value="Nirma University">Nirma University</option>
                          <option value="GTU">GTU</option>
                          <option value="SP University">SP University</option>
                          <option value="Amity University">Amity University</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-field"><label>Year</label>
                        <select value={edu.year} onChange={(e) => handleChange(e, index, 'year', 'educationInfo')}>
                          <option value="">-- Select Year --</option>
                          {[...Array(25)].map((_, i) => {
                            const year = 2025 - i;
                            return <option key={year} value={year}>{year}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  ))}
                </section>
{/* work-experience */}
                <section>
                  <h2 className="section-title">Work Experiences <button type="button" onClick={addExperience}>➕</button></h2>
                  {formData.workExperience.map((exp, index) => (
                    <div className="form-row" key={index}>
                      <div className="form-field"><label>Company</label><input type="text" value={exp.company} onChange={(e) => handleChange(e, index, 'company', 'workExperience')} /></div>
                      <div className="form-field"><label>Role</label>
                        <select value={exp.role} onChange={(e) => handleChange(e, index, 'role', 'workExperience')}>
                          <option value="">-- Select Role --</option>
                          <option value="Frontend Developer">Frontend Developer</option>
                          <option value="Backend Developer">Backend Developer</option>
                          <option value="Full Stack Developer">Full Stack Developer</option>
                          <option value="UI/UX Designer">UI/UX Designer</option>
                          <option value="QA Engineer">QA Engineer</option>
                          <option value="DevOps Engineer">DevOps Engineer</option>
                          <option value="Project Manager">Project Manager</option>
                        </select>
                      </div>
                      <div className="form-field"><label>Duration</label>
                        <select value={exp.duration} onChange={(e) => handleChange(e, index, 'duration', 'workExperience')}>
                          <option value="">-- Select Duration --</option>
                          <option value="6 months">6 months</option>
                          <option value="1 year">1 year</option>
                          <option value="2 years">2 years</option>
                          <option value="3+ years">3+ years</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  </section>
{/* other-information */}
                <section>
                  <h2 className="section-title">Other Information</h2>
                  <div className="form-row">
                    <div className="form-field"><label>Source</label><select name="source" value={formData.source} onChange={handleChange}><option>Select Source</option><option value="Website">Website</option><option value="Referral">Referral</option><option value="LinkedIn">LinkedIn</option><option value="Naukri">Naukri</option><option value="Indeed">Indeed</option><option value="Social Media">Social Media</option><option value="Walk-In">Walk-In</option><option value="Consultancy">Consultancy</option><option value="Job Fair">Job Fair</option><option value="Other">Other</option></select></div>
                    <div className="form-field"><label>Twitter ID</label><input type="text" name="twitterId" value={formData.twitterId} onChange={handleChange} /></div>
                    <div className="form-field"><label>Skype ID</label><input type="text" name="skypeId" value={formData.skypeId} onChange={handleChange} /></div>
                  </div>
                </section>
{/* images */}
                <section>
                  <h2 className="section-title">Attachments</h2>
                  <div className="form-row">
                  <input type="file" name="profileImage" onChange={handleChange} pl />
<input type="file" name="resume" onChange={handleChange} />
<input type="file" name="coverLetter" onChange={handleChange} />
<input type="file" name="contract" onChange={handleChange} /></div>
                </section>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">Submit</button>
                 </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
