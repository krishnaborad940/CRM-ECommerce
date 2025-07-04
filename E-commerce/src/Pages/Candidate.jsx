import SideBar from '../Pages/SideBar';
import '../App.css';
import { useState } from 'react';

export default function Candidate() {
  const [formData, setFormData] = useState({
    Fname: '', Lname: '', email: '', password: '', ConfirmPassword: '', phone: '', fax: '', website: '',
    street: '', city: '', state: '', code: '', country: '',
    experience: '', education: '', salary: '', skills: '', additional: '',
    source: '', twitterId: '', skypeId: '',
    educationInfo: '', workExperience: '',
    resume: null, coverLetter: null, contract: null, profileImage: null
  });

      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: files ? files[0] : value
        }));
      };

      const handleSubmit = async (e) => {
          e.preventDefault();
        const data = new FormData();
          for (let key in formData) {
            if (formData[key]) {
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
    <div className="viewleads-container">
      <SideBar />
      <div className="main-content">
        <div className="candidate-form-container">
          <h1 className="form-title">Create Candidate</h1>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <section>
              <h2 className="section-title">Basic Information</h2>
              <div className="form-row">
                <div className="form-field"><label>First Name</label><input type="text" name="Fname" value={formData.Fname} onChange={handleChange} /></div>
                <div className="form-field"><label>Last Name</label><input type="text" name="Lname" value={formData.Lname} onChange={handleChange} /></div>
                <div className="form-field"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} /></div>
                <div className="form-field"><label>Phone</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} /></div>
                <div className="form-field"><label>Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} /></div>
                <div className="form-field"><label>Confirm Password</label><input type="password" name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleChange} /></div>
                <div className="form-field"><label>Fax</label><input type="text" name="fax" value={formData.fax} onChange={handleChange} /></div>
                <div className="form-field"><label>Website</label><input type="text" name="website" value={formData.website} onChange={handleChange} /></div>
              </div>
            </section>

            <section>
              <h2 className="section-title">Address Information</h2>
              <div className="form-row">
                <div className="form-field"><label>Street</label><input type="text" name="street" value={formData.street} onChange={handleChange} /></div>
                <div className="form-field"><label>City</label><input type="text" name="city" value={formData.city} onChange={handleChange} /></div>
                <div className="form-field"><label>State</label><input type="text" name="state" value={formData.state} onChange={handleChange} /></div>
                <div className="form-field"><label>Code</label><input type="text" name="code" value={formData.code} onChange={handleChange} /></div>
                <div className="form-field">
                  <label>Country</label>
                  <select name="country" value={formData.country} onChange={handleChange}>
                    <option>Select Country</option>
                    <option value="Surat">Surat</option>
                    <option value="Ahemdabad">Ahemdabad</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Navsari">Navsari</option>
                    <option value="Div">Div</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h2 className="section-title">Professional Details</h2>
              <div className="form-row">
                <div className="form-field"><label>Experience</label><input type="text" name="experience" value={formData.experience} onChange={handleChange} /></div>
                <div className="form-field"><label>Education</label><input type="text" name="education" value={formData.education} onChange={handleChange} /></div>
                <div className="form-field"><label>Salary</label><input type="text" name="salary" value={formData.salary} onChange={handleChange} /></div>
                <div className="form-field"><label>Skills</label><textarea name="skills" value={formData.skills} onChange={handleChange}></textarea></div>
                <div className="form-field"><label>Additional Info</label><textarea name="additional" value={formData.additional} onChange={handleChange}></textarea></div>
              </div>
            </section>

            <section>
              <h2 className="section-title">Other Information</h2>
              <div className="form-row">
                <div className="form-field">
                  <label>Source</label>
                  <select name="source" value={formData.source} onChange={handleChange}>
                    <option>Select Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Walk-In">Walk-In</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Job Fair">Job Fair</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-field"><label>Twitter ID</label><input type="text" name="twitterId" value={formData.twitterId} onChange={handleChange} /></div>
                <div className="form-field"><label>Skype ID</label><input type="text" name="skypeId" value={formData.skypeId} onChange={handleChange} /></div>
              </div>
            </section>

            <section>
              <h2 className="section-title">Attachments</h2>
              <div className="form-row">
                <div className="form-field"><label>Profile Image</label><input type="file" name="profileImage" onChange={handleChange} /></div>
                <div className="form-field"><label>Resume</label><input type="file" name="resume" onChange={handleChange} /></div>
                <div className="form-field"><label>Cover Letter</label><input type="file" name="coverLetter" onChange={handleChange} /></div>
                <div className="form-field"><label>Contract</label><input type="file" name="contract" onChange={handleChange} /></div>
              </div>
            </section>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="reset" className="reset-btn">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
