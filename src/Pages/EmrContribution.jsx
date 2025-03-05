import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmrContribution.css';

export const EmrContribution = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Employer_Id, Password } = location.state || {}; // Retrieve Employer ID and Password from state

  const [formData, setFormData] = useState({
    Employee_ID: '',
    Date: '',
    Employer_Contribution: '',
    Employee_Contribution: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      await axios.post('http://localhost:8081/EmrContribution', {
        ...formData,
        Employer_ID: Employer_Id // Include Employer_Id
      });
      alert('Contribution recorded successfully');
      navigate('/page/EmrDashboard', { state: { Employer_Id, Password } });
    } catch (error) {
      console.error('Error Contributing:', error);
      alert('An error occurred while Contributing.');
    }
  };
  

  return (
    <div className="EmrContribution-form-container">
      <h2>Contribution Form</h2>
      <form onSubmit={handleSubmit} className="EmrContribution-form">
        <div className="form-group">
          <label htmlFor="Employee_ID" id="EmrLevel">Employee ID:</label>
          <input
            type="number"
            id="EmrInput"
            name="Employee_ID"
            onChange={handleInputChange}
            required
            placeholder="Enter Employee ID"
          />
        </div>
        <div className="EmrCform-group">
          <label htmlFor="Date" id="EmrLevel">Date:</label>
          <input
            type="date"
            id="EmrInput"
            name="Date"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="EmrCform-group">
          <label htmlFor="Employer_Contribution" id="EmrLevel">Employer Contribution:</label>
          <input
            type="number"
            id="EmrInput"
            name="Employer_Contribution"
            onChange={handleInputChange}
            required
            placeholder="Enter amount near 8.33% of Employee's Salary"
          />
        </div>
        <div className="EmrCform-group">
          <label htmlFor="Employee_Contribution" id="EmrLevel">Employee Contribution:</label>
          <input
            type="number"
            id="EmrInput"
            name="Employee_Contribution"
            onChange={handleInputChange}
            required
            placeholder="Enter amount near 12% of Employer's Salary"
          />
        </div>
        <div className="EmrCform-group">
          <button id="EmrCBtn" type="submit">Submit Contribution</button>
        </div>
      </form>
    </div>
  );
};

export default EmrContribution;
