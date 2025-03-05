import React, { useState, useEffect } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom'; // Added useNavigate for redirection if no state
import axios from 'axios';
import Em_EditP from '../assets/images/Em_EditP.png';
import Er_ProfileP from '../assets/images/Er_ProfileP.jpeg';
import { Footer1 } from '../components/Footer/Footer1';
// import { Header1 } from '../components/Header/Header1';
import './EmployeeP.css';

export const EmployerP = () => {
  const navigate = useNavigate();
  const [employer, setEmployer] = useState(null);
  const { Employer_Id, Password } = useLocation().state || {}; // Getting values from the router's state

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const fetchEmployerData = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/employer', {
        Employer_ID: Employer_Id,
        Password: Password
      });
      if (response.data) {
        setEmployer(response.data);
      } else {
        alert("No employer data found.");
      }
    } catch (error) {
      console.error('Error fetching employer data:', error);
      alert("An error occurred while fetching employer data.");
    }
  };

  if (!employer) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* <Header1 /> */}
      <header className="header">
      <nav className="navbar">
        <ul className="nav-items">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/Emragister" state={{ Employer_Id: employer.Employer_ID, Password: employer.Password }}>Add New Employee</Link>
          </li>
          <li>
          <Link to="/page/EmrContribution" state={{ Employer_Id: employer.Employer_ID, Password: employer.Password }}>Contribution</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
        <div className="nav-right">
          <button className="theme-toggle">🌙</button>
          <button className="login-btn" onClick={() => navigate('/')}>Logout</button>
        </div>
      </nav>
    </header>

      <div className="profile-container">
        <div className="profile-header">
          <div className="image-container">
            <img
              src={Er_ProfileP}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="employee-name">
            {employer.Company_Name || 'Company Name Not Available'}
            <img
              src={Em_EditP}
              alt="Edit"
              className="edit-icon"
            />
          </div>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <label>Employer ID :</label>
            <input type="text" value={employer.Employer_ID} readOnly />
            <label>Password :</label>
            <input type="text" value={employer.Password} readOnly />
          </div>

          <div className="info-row">
            <label>Official Mail :</label>
            <div className="info-row">
              <input type="email" value={employer.Email} readOnly />
            </div>

            <label>Contact Number:</label>
            <div className="info-row">
              <input type="text" value={employer.Official_Contact} readOnly />
            </div>
          </div>

          <div className="info-row">
            <label>Address :</label>
            <input type="text" value={employer.Address} readOnly />
            <label>Startup Date :</label>
            <input type="text" value="1/2/2024" readOnly />
          </div>

          <div className="info-row">
            <label>Registration Date :</label>
            <input type="text" value="2/3/4" readOnly />
            <label>Total Employees :</label>
            <input type="text" value={employer.Employee_Count} readOnly />
          </div>

          <div className="info-row">
            <label>Sector :</label>
            <input type="text" value={employer.Sector} readOnly />
            <label>Category :</label>
            <input type="text" value={employer.Category} readOnly />
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
};
