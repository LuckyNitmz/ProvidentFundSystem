import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Em_EditP from '../assets/images/Em_EditP.png'
import Em_ProfileP from '../assets/images/Em_ProfileP.png'
import { Footer1 } from '../components/Footer/Footer1'
// import { Header1 } from '../components/Header/Header1'
import './EmployeeP.css';


export const EmployeeP = () => {
  const navigate = useNavigate();
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [employee, setEmployee] = useState(null);
  const { state } = useLocation(); // Get the entire state
  const Employee_ID = state?.Employee_ID; // Safely access Employee_ID
  const Password = state?.Password; // Safely access Password
  const [accountDetail, setAccountDetail] = useState([]);

  // console.log('Employee ID:', Employee_ID); // Debug log
  // console.log('Password:', Password); // Debug log

  useEffect(() => {
    if (Employee_ID && Password) {
      fetchEmployeeData();
    } else {
      alert('Missing Employee ID or Password.');
    }
  }, [Employee_ID, Password]);

  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/withdrawalHistory/${Employee_ID}`);
      setWithdrawalHistory(response.data);
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
      alert("Could not fetch withdrawal history.");
    }
  };
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.post('http://localhost:8081/employeeProfile', {
        Employee_ID,
        Password
      });

      if (response.data) {
        setEmployee(response.data);
      } else {
        alert("No employee data found.");
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      alert("An error occurred while fetching employee data.");
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <ul className="nav-items">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
            <Link to="/page/EmFundAccount" state={{ Employee_ID }}>PF Account</Link>
            </li>
            <li>
            <li>
                <Link to="/page/Withdrawal" state={{ Employee_ID }} onClick={() => fetchWithdrawalHistory(Employee_ID)}>WithDrawal</Link>
            </li>
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
              src={Em_ProfileP}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="employee-name">
            {employee.Name || 'Employee Name Not Available'}
            <img
              src={Em_EditP} // Replace with your image path
              alt="Edit"
              className="edit-icon"
            />
          </div>

        </div>

        <div className="profile-info">
          <div className="info-row">
            <label>Employee ID :</label>
            <input type="text" value={employee.Employee_ID} readOnly />
            <label>Password :</label>
            <input type="text" value={employee.Password} readOnly />
          </div>

          <div className="info-row">
            <label>E-mail :</label>
            <div className="info-row">
              <input type="email" value={employee.Email} readOnly />
            </div>

            <label>Personal Contact :</label>
            <div className="info-row">
              <input type="text" value={employee.Phone_Number} readOnly />
            </div>
          </div>

          <div className="info-row">
            <label>Address :</label>
            <input
              type="text"
              value={employee.Address}
              readOnly
            />
            <label>Date of Birth :</label>
            <input type="text" value={employee.Date_of_Birth.split('T')[0]} readOnly />
          </div>

          <div className="info-row">
            <label>Date of Joining :</label>
            <input type="text" value={employee.Date_of_Joining.split('T')[0]} readOnly />
            <label>Salary :</label>
            <input type="text" value={employee.Salary} readOnly />
          </div>

          <div className="Einfo-row">
            <label>Contribution % :</label>
            <input type="text" value={employee.Contribution_Percentage} readOnly />
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  )
}
