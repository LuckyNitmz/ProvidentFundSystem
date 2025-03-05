import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ProvidentFund.css';

function ProvidentFund() {
  const [fundData, setFundData] = useState([]);
  const { state } = useLocation();
  const employerId = state?.Employer_Id;

  useEffect(() => {
    if (employerId) {
      fetchProvidentFundData(employerId);
    }
  }, [employerId]);

  const fetchProvidentFundData = async (employerId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/provident_fund/${employerId}`);
      if (response.data) {
        setFundData(response.data);
      } else {
        alert("No data found for this employer.");
      }
    } catch (error) {
      console.error('Error fetching provident fund data:', error);
      alert("An error occurred while fetching provident fund data.");
    }
  };

  return (
    <div className="provident-fund-table">
      <h2>Provident Fund</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Contribution</th>
            <th>Employer Contribution</th>
          </tr>
        </thead>
        <tbody>
          {fundData.map((row, index) => (
            <tr key={index}>
              <td>{row.Employee_ID}</td>
              <td>{row.Employee_Contribution}</td>
              <td>{row.Employer_Contribution}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProvidentFund;
