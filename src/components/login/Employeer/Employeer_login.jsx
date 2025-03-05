// EmployeerLogin.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import './Employeer_login.css';
import EPFO from '../../Home/Image_Logo/EPFO.png';
import G2bharat from '../Employee/G2bharat1.png';
import Business from './Business.png';
import G2BEmployeer from './G2BEmployeer.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Employeer_login() {
    const [values, setValues] = useState({
        OffID: '',
        OffPassword: '',
    });

    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const navigate = useNavigate();

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
        setCaptchaInput('');
    };

    const handleReset = () => {
        setValues({ OffID: '', OffPassword: '' });
        refreshCaptcha();
    };

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check captcha validity
        if (captcha !== captchaInput) {
            alert("Captcha does not match!");
            return;
        }
        axios.post('http://localhost:8081/api/employer', {
            Employer_ID: values.OffID,
            Password: values.OffPassword
        })
            .then(res => {
                if (res.status === 200) {
                    navigate('/page/EmrDashboard', {
                        state: {
                            Employer_Id: values.OffID, // Pass employer ID
                            Password: values.OffPassword // Pass password
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
        <div className="Emr_App">
            <Header />
            <div className="Emr_login-container">
                <div className="Emr_G2BEmployeer">
                    <img src={G2BEmployeer} alt="EPFO Logo" />
                </div>
                <div className='Emr_EPF_Member'>
                    <h5>Instruction !!</h5>
                    <ul>
                        <li><p>Please create your permanent login id and password of your choice after the first login.</p></li>
                        <br />
                        <li><p>In case you have forgotten the password/login id, use Forgot Password link to get the same through SMS on your registered mobile number.</p></li>
                        <br />
                        <li><p>In case your account is locked due to repeated use of wrong password, use Unlock account link.</p></li>
                    </ul>
                </div>

                <div style={styles.container}>
                    <div style={styles.login}>
                        <img src={Business} alt="login Logo" style={styles.img} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <input
                                type="number"
                                name='OffID'
                                onChange={handleInput}
                                placeholder="Enter Employer ID"
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type="password"
                                name='OffPassword'
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
                            <button type='button' onClick={handleReset} style={styles.button}>
                                Reset
                            </button>
                        </div>
                    </form>
                    <div style={styles.forgotPassword}>
                        <a href="#forgot-password">Forgot Password?</a>
                    </div>
                    <div style={styles.forgotPassword}>
                        <Link to='/ragister'>Register</Link>
                        <h6>If you do not have an account?</h6>
                    </div>
                </div>
            </div>

            <div className="Emr_container">
                <div className="Emr_benefits-box">
                    <h5>Welcome Employers !!</h5>
                    <ul>
                        <li>Download/Print your Updated Passbook anytime.</li>
                        <li>Download/ Print your UAN Card.</li>
                        <li>Update your KYC information.</li>
                    </ul>
                </div>

                <div className="Emr_links-box">
                    <h5>Important Links</h5>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faHandPointRight} className="Emr_icon" />
                            Common Registration Under (CPFO & SIC).
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHandPointRight} className="Emr_icon" />
                            Common ECR (EPFO & ESIC)
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHandPointRight} className="Emr_icon" />
                            Employees' Provident Fund Organisation, India
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHandPointRight} className="Emr_icon" />
                            Pradhan Mantri Rojgar Protsahan Yojana (PMRPY)
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHandPointRight} className="Emr_icon" />
                            Employer Registration for Pre-olre Establishments
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHandPointRight} className="Emr_icon" />
                            Uncovered Principal Employer Registration NEW!
                        </li>
                    </ul>
                </div>
            </div>
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
        <div className="Emr_header">
            <div className="Emr_font-resizer">
                <div className='Emr_Read-size'>Screen Reader Access </div>
                <button onClick={decreaseFontSize}>A-</button>
                <button onClick={resetFontSize}>A</button>
                <button onClick={increaseFontSize}>A+</button>
            </div>

            <div className='Emr_leftHeader'>
                <div className="Emr_header-logo">
                    <img src={EPFO} alt="EPFO Logo" />
                </div>
                <div className="Emr_header-text">
                    <h4>EMPLOYEES' PROVIDENT FUND ORGANISATION, INDIA</h4>
                    <h6>MINISTRY OF LABOUR & EMPLOYMENT, GOVERNMENT OF INDIA</h6>
                </div>
            </div>
            <div className='Emr_rightHeader'>
                <div className="Emr_header-text">
                    <h4>Welcome Employers! <br /> On </h4>
                    <h4>EPFO</h4>
                </div>
                <div className="Emr_header-logo">
                    <img src={G2bharat} alt="G2bharat Logo" />
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <div className="Emr_footer">
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
        margin: "5px",
    },
    login: {
        display: 'flex',
        justifyContent: 'center',
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


export default Employeer_login;
