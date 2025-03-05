import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Em_Register.css';

export const Em_Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Employer_Id, Password } = location.state || {}; // Retrieve Employer ID and Password from state

  const [formData, setFormData] = useState({
    Employee_ID: '',
    Name: '',
    Password: '',
    Email: '',
    Date_of_Birth: '',
    Phone_Number: '',
    Date_of_Joining: '',
    Address: '',
    Salary: '',
    Contribution_Percentage: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8081/EmRegister', {
        ...formData,
        Employer_ID: Employer_Id // Include Employer_Id
      });
      alert('Employee registered successfully');
  // After successful registration, navigate back to EmployeeP with updated Employer_ID and Password
  navigate('/page/EmrDashboard', { state: { Employer_Id, Password } });
    } catch (error) {
      console.error('Error registering employee:', error);
      alert('An error occurred while registering the employee.');
    }
  };
  return (
    <div className="EmR_form" style={{ display: 'flex', justifyContent: 'center' }}>
      <div id="EmR_student-signup">
        <h3>New Employee Registration</h3>
        <div className="EmR_form-group">
          <label>Employee Name:</label>
          <input
            type="text"
            name="Name" onChange={handleInputChange} 
            placeholder="Enter Establishment Name"
          />
        </div>
        <div className="EmR_form-group">
          <label>Employee ID:</label>
          <input
            type="number"
            name="Employee_ID" onChange={handleInputChange} 
            placeholder="Enter Employee ID(number)"
          />
        </div>
        <div className="EmR_form-group">
          <label>Password:</label>
          <input
            type="Password"
            name="Password" onChange={handleInputChange}
            placeholder="Enter password"
          />
        </div>
        <div className="EmR_form-group">
          <label>Email:</label>
          <input
            type="Email"
            name="Email" onChange={handleInputChange}
            placeholder="Enter Email"
          />
        </div>
        <div className="EmR_form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="Date_of_Birth" onChange={handleInputChange}
            placeholder="Select Date of Joining"
          />
        </div>
        <div className="EmR_form-group">
          <label>Personal Contact:</label>
          <input
            type="tel"
            name="Phone_Number" onChange={handleInputChange}
            placeholder="Enter Personal Contact(10 digit)"
          />
        </div>
        <div className="EmR_form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="Date_of_Joining" onChange={handleInputChange}
            placeholder="select date of joining"
          />
        </div>
        <div className="EmR_form-group">
          <label>Address:</label>
          <input
            type="text"
            name="Address" onChange={handleInputChange}
            placeholder="Enter Address"
          />
        </div>
        <div className="EmR_form-group">
          <label>Salary:</label>
          <input
            type="number"
            name="Salary" onChange={handleInputChange}
            placeholder="Enter Salary"
          />
        </div>
        <div className="EmR_form-group">
          <label>Contribution Percentage:</label>
          <input
            type="number"
            name="Contribution_Percentage" onChange={handleInputChange}
            min="0" max="100"
            placeholder="Enter Contribution % "
          />
        </div>
        <div className="EmR_form-group">
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  )
}
