import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import './Employee_login.css';
import EPFO from '../../Home/Image_Logo/EPFO.png';
import G2bharat from './G2bharat1.png';
import login from './login.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeLogin() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="App">
      <Header />
      {showForgotPassword ? <ForgotPassword setShowForgotPassword={setShowForgotPassword} /> : <Login setShowForgotPassword={setShowForgotPassword} />}
      <Footer />
    </div>
  );
}

function Header() {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => setFontSize(fontSize + 2);
  const decreaseFontSize = () => setFontSize(fontSize - 2);
  const resetFontSize = () => setFontSize(16);

  return (
    <div className="Em_header">
      <div className="Em_font-resizer">
        <div className='Em_Read-size'>Screen Reader Access </div>
        <button onClick={decreaseFontSize}>A-</button>
        <button onClick={resetFontSize}>A</button>
        <button onClick={increaseFontSize}>A+</button>
      </div>
      <div className='Em_leftHeader'>
        <div className="Em_header-logo">
          <img src={EPFO} alt="EPFO Logo" />
        </div>
        <div className="Em_header-text">
          <h4>EMPLOYEES' PROVIDENT FUND ORGANISATION, INDIA</h4>
          <h6>MINISTRY OF LABOUR & EMPLOYMENT, GOVERNMENT OF INDIA</h6>
        </div>
      </div>
      <div className='Em_rightHeader'>
        <div className="Em_header-text">
          <h4>Universal Account <br /> Number (UAN) </h4>
          <h5>MEMBER e-SEWA</h5>
        </div>
        <div className="Em_header-logo">
          <img src={G2bharat} alt="G2bharat Logo" />
        </div>
      </div>
    </div>
  );
}

function Login({ setShowForgotPassword }) {

  const [uan, setUan] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  }

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaVerified(false);
  };
  const handleReset = () => {
    setUan("");
    setPassword("");
    setCaptcha("");
  };
  const [values, setValues] = useState({
    Employee_ID: '',
    Password: '',
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/employeeProfile', {
      Employee_ID: values.Employee_ID,
      Password: values.Password
    })
      .then(res => {
        if (res.status === 200) {
          navigate('/page/EmDashboard', {
            state: {
              Employee_ID: values.Employee_ID, // Pass Employee ID
              Password: values.Password // Pass Password
            }
          });
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while logging in.");
      });
  };

  return (
    <>
      <div className="Em_login-container">
        <div className='Em_EPF_Member'>
          <h5>Dear EPF Members !!</h5>
          <ul>
            <li>For all news and updates on EPF, please subscribe to our YouTube channel <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@socialepfo"> (youtube.com/socialepfo)</a>, Instagram <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/social_epfo/">(instagram.com/social_epfo)</a>, Twitter <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/socialepfo">(twitter.com/socialepfo)</a> and Facebook <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/socialepfo">(facebook.com/socialepfo)</a>.</li>
            <li>Important notice about Aadhaar linking. Click here.</li>
            <li>Benefits for Unorganised workers registering on e-SHRAM portal. Click here</li>
            <li>Kind attention Members. Now Aadhaar is mandatory for filing ECR</li>
            <li>Important notice about EDLI. Click here to read.</li>
            <li>EPFO NEVER ASKS YOU TO SHARE YOUR PERSONAL DETAILS LIKE AADHAAR, PAN, BANK DETAILS ETC OVER PHONE</li>
            <li>EPFO NEVER CALLS ANY MEMBER TO DEPOSIT ANY AMOUNT IN ANY BANK.</li>
            <li>PLEASE DO NOT RESPOND TO SUCH CALLS.</li>
          </ul>
        </div>
        <div style={styles.container}>
          <div style={styles.login}>
            <img src={login} alt="login Logo" style={styles.img} />
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>EmployeeID/UAN</label>
              <input
                type="number"
                name='Employee_ID'
                onChange={handleInput}
                placeholder="Enter EmployeeID/UAN"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name='Password'
                onChange={handleInput}
                placeholder="Password"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="captcha">Captcha</label>
              <div className="captcha-field" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="captcha-image" style={{ margin: '10px', backgroundColor: 'gray' }}>{captcha}</div>
                <i className="fa-solid fa-arrows-rotate" style={{ marginTop: '13px' }} onClick={refreshCaptcha}></i>
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={handleCaptchaChange}
                placeholder="Enter Captcha"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type='submit' style={styles.button}>
                Sign in
              </button>
              <button onClick={handleReset} style={styles.button}>
                Reset
              </button>
            </div>
          </form>
          <div style={styles.forgotPassword}>
            <button onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>
          </div>
        </div>
      </div>
      <div className="Em_container">
        <div className="Em_benefits-box">
          <h5>Benefits of Registration</h5>
          <ul>
            <li>Download/Print your Updated Passbook anytime.</li>
            <li>Download/ Print your UAN Card.</li>
            <li>Update your KYC information.</li>
          </ul>
        </div>
        <div className="Em_links-box">
          <h5>Important Links</h5>
          <ul>
            <li>
              <FontAwesomeIcon icon={faHandPointRight} className="Em_icon" />
              Track Application Status for Pension on Higher Wages
            </li>
            <li>
              <FontAwesomeIcon icon={faHandPointRight} className="Em_icon" />
              Activate UAN
            </li>
            <li>
              <FontAwesomeIcon icon={faHandPointRight} className="Em_icon" />
              Know your UAN
            </li>
            <li>
              <FontAwesomeIcon icon={faHandPointRight} className="Em_icon" />
              Direct UAN Allotment by Employees
            </li>
            <li>
              <FontAwesomeIcon icon={faHandPointRight} className="Em_icon" />
              Death claim filing by beneficiary
            </li>
            <li>
              <FontAwesomeIcon icon={faHandPointRight} className="Em_icon" />
              UAN Allotment for Existing PF
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ForgotPassword({ setShowForgotPassword }) {
  return (
    <div className="Em_forgot-password-container">
      <h2>Forgot Password</h2>
      <form>
        <label>
          UAN:
          <input type="text" placeholder="Enter UAN" />
        </label>
        <label>
          Registered Mobile Number:
          <input type="text" placeholder="Mobile Number" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setShowForgotPassword(false)}>Back to Login</button>
    </div>
  );
}

function Footer() {
  return (
    <div className="Em_footer">
      <p>©2015. Powered by EPFO</p>
    </div>
  );
}

const styles = {
  container: {
    width: "28%",
    margin: "0",
    padding: "0 20px 10px 20px",
    border: "1px solid rgb(150 151 151)",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#635f5f0a",
  },
  img: {
    width: "60px",
  },
  login: {
    display: "flex",
    justifyContent: "center",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  captcha: {
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
  },
  forgotPassword: {
    marginTop: "10px",
  },
};

export default EmployeeLogin;
