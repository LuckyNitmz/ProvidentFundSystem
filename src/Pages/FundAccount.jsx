import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './FundAccount.css';

function FundAccount() {
  const location = useLocation();
  const { Employee_ID } = location.state || {};
  const [accountDetail, setAccountDetail] = useState({});

  useEffect(() => {
    if (Employee_ID) {
      fetchAccountDetail(Employee_ID);
    }
  }, [Employee_ID]);

  const fetchAccountDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/FundAccount/${id}`);
      setAccountDetail(response.data);
    } catch (error) {
      console.error("Error fetching provident fund data:", error);
      alert("Could not fetch provident fund data.");
    }
  };

  return (
    <div className="provident-fund-account">
      <h2>Provident Fund Account</h2>
      <div className="PFAinput-group">
        <label>Employee Contribution</label>
        <input type="text" value={accountDetail.Total_Monthly_Contribution || ''} readOnly />
      </div>
      <div className="PFAinput-group">
        <label>Employer Contribution</label>
        <input type="text" value={accountDetail.Total_Employer_Contribution || ''} readOnly />
      </div>
      <div className="PFAinput-group">
        <label>Interest Rate :</label>
        <input type="text" value={accountDetail.Interest_Rate || ''} readOnly />
      </div>
      <div className="PFAinput-group">
        <label>Total Balance :</label>
        <input type="text" value={accountDetail.Total_Balance || ''} readOnly />
      </div>
    </div>
  );
}

export default FundAccount;
