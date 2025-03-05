import React, { useState } from 'react';
import './AdminLogSig.css';
import { useNavigate } from 'react-router-dom';

const AdminLogSig = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    Admin_ID: '',
    Name: '',
    Email: '',
    Phone_Number: '',
    Password: ''
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ Admin_ID: '', Name: '', Email: '', Phone_Number: '', Password: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:8081/admin/login' : 'http://localhost:8081/admin/signup';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  
    const result = await response.json();
  
    if (response.ok) {
      alert(result.message);
  
      if (isLogin) {
        // Navigate to AdminP page after successful login
        navigate('/AdminP');  // Pass Admin_ID as a parameter
      } else {
        // If signup was successful, toggle back to the login form
        setIsLogin(true);
        setFormData({ Admin_ID: '', Name: '', Email: '', Phone_Number: '', Password: '' }); // Clear form data
      }
    } else {
      alert(result.message);
    }
  };
  

  return (
    <div className="Adlogin-signup-container">
      <div className="AdLform-container">
        <h2>{isLogin ? 'Adim Login' : 'Admin Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="AdLform-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="ASignInput" name="Name" onChange={handleInputChange} required />
              </div>
              <div className="AdLform-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="ASignInput" name="Email" onChange={handleInputChange} required />
              </div>
              <div className="AdLform-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="ASignInput" name="Phone_Number" onChange={handleInputChange} required />
              </div>
            </>
          )}

          <div className="AdLform-group">
            <label htmlFor="adminId">Admin ID:</label>
            <input type="text" id="adminId" name="Admin_ID" onChange={handleInputChange} required />
          </div>
          <div className="AdLform-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="Password" onChange={handleInputChange} required />
          </div>

          <button type="submit" className="AdLsubmit-btn">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p onClick={toggleForm} className="AdLtoggle-link">
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AdminLogSig;
