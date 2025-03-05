import React, { useState } from 'react';
import './ragister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Ragister = () => {
    
    const navigate = useNavigate();

    const [values, setValues] = useState({
        OffID: '',
        Company_name: '',
        OffContact: '',
        OffEmail: '',
        OffPassword: '',
        Sector: '',
        Category: '',
        OffAddress: '',
    });

    const handleChange = (event) => {
        // Correctly update the state
        setValues({ ...values, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Sending the data to the backend
        axios.post('http://localhost:8081/EmrRegistration', values)
            .then(res => {
                console.log("Registered Successfully!!");
                navigate('/employeer'); // Navigate after successful registration
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="form1" style={{ display: 'flex', justifyContent: 'center' }}>
            <div id="student-signup">
                <h3>Employer Registration</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name:</label>
                        <input
                            type="text"
                            name="Company_name"
                            onChange={handleChange}
                            placeholder="Enter Establishment Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Official Email:</label>
                        <input
                            type="email"
                            name="OffEmail"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Official Contact:</label>
                        <input
                            type="tel"
                            name="OffContact"
                            onChange={handleChange}
                            placeholder="Enter your Official Contact"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Sector:</label>
                        <select
                            name="Sector"
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Sector</option>
                            <option value="Private">Private Ltd</option>
                            <option value="Public">Public Ltd</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Establishment Category:</label>
                        <select
                            name="Category"
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="CE">Commercial Establishment</option>
                            <option value="Eh">Eating-house</option>
                            <option value="f">Factory</option>
                            <option value="RH">Residential Hotel</option>
                            <option value="R">Restaurant</option>
                            <option value="Shop">Shop</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="OffAddress"
                            onChange={handleChange}
                            placeholder="Enter your Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Employer ID:</label>
                        <input
                            type="number"
                            name="OffID"
                            onChange={handleChange}
                            placeholder="Set Employer ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Set Password:</label>
                        <input
                            type="password"
                            name="OffPassword"
                            onChange={handleChange}
                            placeholder="Set password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Register as Employer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Ragister;
