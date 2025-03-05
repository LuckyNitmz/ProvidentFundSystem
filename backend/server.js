const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connection to the database using mysql2/promise
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lucky@123',
    database: 'providentfundsystem2'
});

// Employer Registration API
app.post('/EmrRegistration', async (req, res) => {
    try {
        const sql = "INSERT INTO employer(`Employer_ID`, `Company_Name`, `Official_Contact`, `Email`, `Password`, `Sector`, `Category`, `Address`) VALUES (?)";
        const values = [
            req.body.OffID,
            req.body.Company_name,
            req.body.OffContact,
            req.body.OffEmail,
            req.body.OffPassword,
            req.body.Sector,
            req.body.Category,
            req.body.OffAddress,
        ];
        const [data] = await db.query(sql, [values]);
        res.json(data);
    } catch (err) {
        console.error('Error during employer registration:', err);
        res.status(500).json({ error: 'Employer registration failed' });
    }
});

// Employer Login and Profile API
app.post('/api/employer', async (req, res) => {
    const { Employer_ID, Password } = req.body;
    try {
        const [result] = await db.query("SELECT * FROM employer WHERE Employer_ID = ? AND Password = ?", [Employer_ID, Password]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Employer not found' });
        }
        return res.json(result[0]); // Send back employer details
    } catch (err) {
        console.error('Error fetching employer data:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Employee Registration and Employer Update API
app.post('/EmRegister', async (req, res) => {
    const { Employee_ID, Name, Password, Email, Date_of_Birth, Phone_Number, Date_of_Joining, Address, Salary, Contribution_Percentage, Employer_ID } = req.body;
    const Contribution = (Salary * Contribution_Percentage) / 100;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const sqlEmployee = "INSERT INTO employee(`Employee_ID`, `Name`, `Password`, `Email`, `Date_of_Birth`, `Phone_Number`, `Date_of_Joining`, `Address`, `Salary`, `Contribution_Percentage`, `Employer_ID`) VALUES (?)";
        const employeeValues = [Employee_ID, Name, Password, Email, Date_of_Birth, Phone_Number, Date_of_Joining, Address, Salary, Contribution_Percentage, Employer_ID];
        await connection.query(sqlEmployee, [employeeValues]);

        const sqlEmployer = "UPDATE employer SET Employee_Count = Employee_Count + 1 WHERE Employer_ID = ?";
        await connection.query(sqlEmployer, [Employer_ID]);

        await connection.commit();
        res.json({ message: 'Employee registered and employer updated successfully' });
    } catch (err) {
        await connection.rollback();
        console.error('Error during employee registration:', err);
        res.status(500).json({ error: 'Employee registration failed' });
    } finally {
        connection.release();
    }
});

// Employee Login and Profile API
app.post('/employeeProfile', async (req, res) => {
    const { Employee_ID, Password } = req.body;
    try {
        const [result] = await db.query("SELECT * FROM employee WHERE Employee_ID = ? AND Password = ?", [Employee_ID, Password]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.json(result[0]); // Send back employee details
    } catch (err) {
        console.error('Error fetching employee data:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin Signup API
app.post('/admin/signup', async (req, res) => {
    const { Admin_ID, Name, Email, Phone_Number, Password } = req.body;
    try {
        const sqlInsert = 'INSERT INTO Admin (Admin_ID, Name, Email, Phone_Number, Password) VALUES (?, ?, ?, ?, ?)';
        await db.query(sqlInsert, [Admin_ID, Name, Email, Phone_Number, Password]);
        res.status(200).json({ message: 'Signup successful' });
    } catch (err) {
        console.error('Error during admin signup:', err);
        res.status(500).json({ message: 'Signup failed' });
    }
});

// Admin Login API
app.post('/admin/login', async (req, res) => {
    const { Admin_ID, Password } = req.body;
    try {
        const [result] = await db.query("SELECT * FROM Admin WHERE Admin_ID = ? AND Password = ?", [Admin_ID, Password]);
        if (result.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error during admin login:', err);
        res.status(500).json({ message: 'Login failed' });
    }
});

// Fetch admin data API
app.get('/admin/data/:adminId', async (req, res) => {
    const adminId = req.params.adminId;

    try {
        // Fetch admin details
        const [adminDetails] = await db.query('SELECT Name, Admin_ID, Email, Phone_Number FROM Admin WHERE Admin_ID = ?', [adminId]);

        // Fetch provident fund accounts
        const [providentFunds] = await db.query('SELECT Fund_ID, Employee_ID, Employer_ID, Total_Balance FROM provident_fund WHERE Admin_ID = ?', [adminId]);

        // Fetch withdrawal requests
        const [withdrawalRequests] = await db.query('SELECT * FROM withdrawal_request WHERE Admin_ID = ?', [adminId]);

        if (adminDetails.length > 0) {
            res.status(200).json({
                message: 'Data fetched successfully',
                admin: adminDetails[0],
                providentFunds,
                withdrawalRequests
            });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Contribution Submission API
// app.post('/EmrContribution', async (req, res) => {
//     const { Employee_ID, Date, Employer_Contribution, Employee_Contribution, Employer_ID } = req.body;
//     const connection = await db.getConnection();
//     try {
//         await connection.beginTransaction();

//         const sqlContribution = "INSERT INTO contribution (`Employee_ID`, `Date`, `Employer_Contribution`, `Employee_Contribution`, `Employer_ID`) VALUES (?)";
//         const contributionValues = [Employee_ID, Date, Employer_Contribution, Employee_Contribution, Employer_ID];
//         await connection.query(sqlContribution, [contributionValues]);

//         const sqlUpdateTotal = "UPDATE employer SET Total_Contribution = Total_Contribution + ? WHERE Employer_ID = ?";
//         await connection.query(sqlUpdateTotal, [Employer_Contribution, Employer_ID]);

//         await connection.commit();
//         res.json({ message: 'Contribution recorded and employer updated successfully' });
//     } catch (err) {
//         await connection.rollback();
//         console.error('Error during contribution submission:', err);
//         res.status(500).json({ error: 'Contribution submission failed' });
//     } finally {
//         connection.release();
//     }
// });

app.post('/EmrContribution', async (req, res) => {
    const { Employee_ID, Date, Employer_Contribution, Employee_Contribution, Employer_ID } = req.body;
    const Admin_ID = 765; // Fixed Admin ID
    const Interest_Rate = 0.08; // 8% interest rate
    const Monthly_Contribution = Employee_Contribution;
    const Total_Contribution = Number(Employee_Contribution) + Number(Employer_Contribution);
    const Total_Balance = Number(Total_Contribution) + (Number(Interest_Rate) * Number(Total_Contribution));

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Insert into contribution table
        const sqlContribution = "INSERT INTO contribution (`Employee_ID`, `Date`, `Employer_Contribution`, `Employee_Contribution`, `Employer_ID`) VALUES (?)";
        const contributionValues = [Employee_ID, Date, Employer_Contribution, Employee_Contribution, Employer_ID];
        await connection.query(sqlContribution, [contributionValues]);

        // Update Total_Contribution in employer table
        const sqlUpdateTotal = "UPDATE employer SET Total_Contribution = Total_Contribution + ? WHERE Employer_ID = ?";
        await connection.query(sqlUpdateTotal, [Employer_Contribution, Employer_ID]);

        // Insert into provident_fund table
        const sqlProvidentFund = `
            INSERT INTO provident_fund 
            (Employee_ID, Employer_ID, Admin_ID, Monthly_Contribution, Employer_Contribution, Total_Contribution, Interest_Rate, Total_Balance) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const providentFundValues = [Employee_ID, Employer_ID, Admin_ID, Monthly_Contribution, Employer_Contribution, Total_Contribution, Interest_Rate * 100, Total_Balance];
        await connection.query(sqlProvidentFund, providentFundValues);

        await connection.commit();
        res.json({ message: 'Contribution recorded, employer updated, and provident fund entry created successfully' });
    } catch (err) {
        await connection.rollback();
        console.error('Error during contribution submission:', err);
        res.status(500).json({ error: 'Contribution submission failed' });
    } finally {
        connection.release();
    }
});


// Withdrawal History API
app.get('/withdrawalHistory/:id', async (req, res) => {
    const employeeId = req.params.id;
    try {
        const [rows] = await db.query("SELECT * FROM withdrawal_request WHERE Employee_ID = ?", [employeeId]);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching withdrawal history:", error);
        res.status(500).send("Server error");
    }
});


app.post('/withdrawal', async (req, res) => {
  const { Employee_ID, Amount_Requested, Reason } = req.body;
  const Request_Date = new Date().toISOString().split('T')[0]; 

  try {
    const [result] = await db.query(
      "INSERT INTO withdrawal_request (Employee_ID, Amount_Requested, Reason, Request_Date, Status) VALUES (?, ?, ?, ?, 'Pending')",
      [Employee_ID, Amount_Requested, Reason, Request_Date]
    );

    const newEntry = {
      Request_ID: result.insertId,
      Employee_ID,
      Admin_ID: '15',
      Amount_Requested,
      Reason,
      Request_Date,
      Status: 'Pending'
    };

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error inserting new withdrawal:", error);
    res.status(500).json({ message: "Failed to submit withdrawal request" });
  }
});


// Api for FundAccount   
app.get('/FundAccount/:Employee_ID', async (req, res) => {
    const { Employee_ID } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT 
              Employee_ID, 
              SUM(Monthly_Contribution) AS Total_Monthly_Contribution,
              SUM(Employer_Contribution) AS Total_Employer_Contribution,
              MAX(Interest_Rate) AS Interest_Rate,  -- Assuming interest rate is the same for the employee
              SUM(Total_Balance) AS Total_Balance
            FROM provident_fund
            WHERE Employee_ID = ?
            GROUP BY Employee_ID
          `, [Employee_ID]);
  
      if (rows.length > 0) {
        res.json(rows[0]); // Send the first row if found
      } else {
        res.status(404).json({ error: 'No data found for this Employee ID' });
      }
    } catch (error) {
      console.error("Error fetching fund account data:", error);
      res.status(500).json({ error: 'Database error' });
    }
  });
  


// Fetch provident fund data by Employer_ID
app.get('/api/provident_fund/:employerId', (req, res) => {
    const employerId = req.params.employerId;
    const sql = 'SELECT Employee_ID, Employee_Contribution, Employer_Contribution FROM provident_fund WHERE Employer_ID = ?';
  
    db.query(sql, [employerId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  

// Server listening on port 8081
app.listen(8081, () => {
    console.log("Server is listening on port 8081...");
});
