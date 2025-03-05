import React from 'react';
import './AdminP.css';

const AdminP = () => {
  const providentFundAccounts = [
    { fundID: '2', employeeID: '2334', employerID: '1224', account: 594.00 },
    { fundID: '3', employeeID: '2334', employerID: '1224', account: 5346.00 },
    { fundID: '4', employeeID: '9', employerID: '1223', account: 3564.00 },
    { fundID: '5', employeeID: '10', employerID: '1223', account: 4158.00 },
  ];

  const withdrawalRequests = [
    { date: '2024-10-27', requestID: '7', employeeID: '10', amount: '7674', reason: 'ghgjsgdvg' },
    { date: '2024-10-27', requestID: '8', employeeID: '10', amount: '7000', reason: 'nothing' },
    { date: '2024-10-28', requestID: '9', employeeID: '151', amount: '150', reason: 'Medical' },
  ];

//   const handleEdit = (id) => {
//     alert(Edit Fund ID: ${id});
//   };

//   const handleRemove = (id) => {
//     alert(Remove Fund ID: ${id});
//   };

//   const handleReject = (id) => {
//     alert(Reject Request ID: ${id});
//   };

//   const handleApprove = (id) => {
//     alert(Approve Request ID: ${id});
//   };

  return (
    <div className="adminP-page">
      <h1 id="AdPhead">ADMIN</h1>
      <div className="adminP-details">
        <div className="adminP-info">
          <label>Admin Name:</label>
          <input type="text" value="Raviranjan" readOnly />
          <label>Admin ID:</label>
          <input type="text" value="765" readOnly />
        </div>
        <div className="adminP-info">
          <label>Admin Email:</label>
          <input type="text" value="Tatabye@gmail.com" readOnly />
          <label>Personal No.:</label>
          <input type="text" value="9087694567" readOnly />
        </div>
      </div>

      <h2 id="AdPhead">Provident Fund Account</h2>
      <table className="AdPpf-table">
        <thead>
          <tr>
            <th id="AdPth" >Fund ID</th>
            <th id="AdPth">Employee ID</th>
            <th id="AdPth">Employer ID</th>
            <th id="AdPth">Account</th>
            {/* <th id="AdPth">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {providentFundAccounts.map((account) => (
            <tr key={account.fundID}>
              <td id="AdPtd">{account.fundID}</td>
              <td id="AdPtd">{account.employeeID}</td>
              <td id="AdPtd">{account.employerID}</td>
              <td id="AdPtd">{account.account}</td>
              {/* <td id="AdPtd">
                <button id="AdPbtn" onClick={() => handleEdit(account.fundID)}>Edit</button>
                <button id="AdPbtn" onClick={() => handleRemove(account.fundID)}>Remove</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="AdPhead">Withdrawal Request</h2>
      <table className="AdPwithdrawal-table">
        <thead>
          <tr>
            <th id="AdPth">Date</th>
            <th id="AdPth">Request ID</th>
            <th id="AdPth">Employee ID</th>
            <th id="AdPth">Amount</th>
            <th id="AdPth">Reason</th>
            {/* <th id="AdPth">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {withdrawalRequests.map((request) => (
            <tr key={request.requestID}>
              <td id="AdPtd">{request.date}</td>
              <td id="AdPtd">{request.requestID}</td>
              <td id="AdPtd">{request.employeeID}</td>
              <td id="AdPtd">{request.amount}</td>
              <td id="AdPtd">{request.reason}</td>
              {/* <td id="AdPtd">
                <button id="AdPbtn" onClick={() => handleReject(request.requestID)}>Rejected</button>
                <button id="AdPbtn" onClick={() => handleApprove(request.requestID)}>Approved</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminP;    