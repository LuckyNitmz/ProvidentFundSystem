import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Footer1 } from '../components/Footer/Footer1';
import { Header1 } from '../components/Header/Header1';
import './WithDrawal.css';

export const WithDrawalP = () => {
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const location = useLocation();
    const { Employee_ID } = location.state || {};
    const [showNewWithdrawalFields, setShowNewWithdrawalFields] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const [newReason, setNewReason] = useState('');// State for showing fields

    // Toggle form fields visibility
    const handleNewWithdrawalClick = () => {
        setShowNewWithdrawalFields(!showNewWithdrawalFields);
    };

    useEffect(() => {
        if (Employee_ID) fetchWithdrawalHistory(Employee_ID);
    }, [Employee_ID]);

    const fetchWithdrawalHistory = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8081/withdrawalHistory/${id}`);
            setWithdrawalHistory(response.data);
        } catch (error) {
            console.error("Error fetching withdrawal history:", error);
            alert("Could not fetch withdrawal history.");
        }
    };

    const handleSubmitNewWithdrawal = async () => {
        if (!newAmount || !newReason) {
            alert('Please enter both amount and reason.');
            return;
        }

        try {
            // Send the new withdrawal data to the backend
            const response = await axios.post('http://localhost:8081/withdrawal', {
                Employee_ID,
                Amount_Requested: newAmount,
                Reason: newReason,
            });

            // Update local withdrawal history with the new entry
            setWithdrawalHistory([response.data, ...withdrawalHistory]);

            // Clear input fields and hide the form
            setNewAmount('');
            setNewReason('');
            setShowNewWithdrawalFields(false);

        } catch (error) {
            console.error("Error submitting new withdrawal:", error);
            alert("Could not submit new withdrawal.");
        }
    };

    return (
        <div>
            <Header1 />
            <div className="WithDrawalP_container">
                <div className="WithDrawalP_Header">
                    <h1 className="title">WithDrawal</h1>
                    <button
                        className="new-withdrawal-btn"
                        onClick={handleNewWithdrawalClick}
                    >
                        <span className="plus-symbol">+</span> New Withdrawal
                    </button>
                </div>
                {showNewWithdrawalFields && (
                    <div className="NWform">
                        <div className="NWform-group">
                            <label id="NWlevel">Amount :</label>
                            <input
                                id="NWinput"
                                type="number"
                                placeholder="Enter Amount"
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                            />
                        </div>
                        <div className="NWform-group">
                            <label id="NWlevel">Reason :</label>
                            <textarea
                                id="NWtextarea"
                                rows="4"
                                placeholder="Enter Reason"
                                style={{ width: '95%' }}
                                value={newReason}
                                onChange={(e) => setNewReason(e.target.value)}
                            ></textarea>
                        </div>
                        <button className="new-withdrawal-btn" onClick={handleSubmitNewWithdrawal}>
                            Submit
                        </button>
                    </div>
                )}
                <div className="WithDrawalP_Header">
                    <h3 className="history-title">WithDrawal History</h3>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Request Date</th>
                                <th>Amount Requested</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalHistory.length > 0 ? (
                                withdrawalHistory.map((record) => (
                                    <tr key={record.Request_ID}>
                                        <td>{record.Request_ID}</td>
                                        <td>{new Date(record.Request_Date).toLocaleDateString()}</td>
                                        <td>{record.Amount_Requested}</td>
                                        <td>{record.Reason}</td>
                                        <td>{record.Status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No withdrawal history available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button
                        className="new-withdrawal-btn"
                        onClick={() => fetchWithdrawalHistory(Employee_ID)}
                    >
                        Update History
                    </button></div>
            </div>
            <Footer1 />
        </div>
    );
};
