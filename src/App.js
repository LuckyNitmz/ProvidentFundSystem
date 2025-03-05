import React from 'react';
import Home from './components/Home/Home';
import './App.css';
import EmployeeLogin from './components/login/Employee/Employee_login';
import EmployeerLogin from './components/login/Employeer/Employeer_login';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Ragister } from './components/login/Employeer/Ragister';
import { Em_Register} from './components/login/Employeer/Em_Register'
import { EmployeeP } from './Pages/EmployeeP';
import { EmployerP } from './Pages/EmployerP';
import { EmrContribution } from './Pages/EmrContribution'
import { WithDrawalP } from './Pages/WithDrawalP';
import  NewWithDrawal  from './Pages/NewWithDrawal';
import  FundAccount from './Pages/FundAccount';
import AdminP  from './Pages/AdminP';
import AdminLogSig from './Pages/AdminLogSig'
import ProvidentFund from './Pages/ProvidentFund';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/employee' element={<EmployeeLogin/>}></Route>
        <Route path='/employeer' element={<EmployeerLogin/>}></Route>
        <Route path='/Admin' element={<AdminLogSig/>}></Route>
        <Route path="/AdminP" element={<AdminP />} />
        <Route path='/ragister' element={<Ragister/>} ></Route>
        <Route path='/Emragister' element={<Em_Register/>} ></Route>
        <Route path='/page/EmrDashboard' element={<EmployerP/>}></Route>
        <Route path='/page/EmDashboard' element={<EmployeeP/>}></Route>
        <Route path='/page/EmrContribution' element={<EmrContribution/>}></Route>
        <Route path='/page/EmFundAccount' element={<FundAccount/>}></Route>
        <Route path='/page/Withdrawal' element={<WithDrawalP/>}></Route>
        <Route path='/page/Withdrawal/NewW' element={<NewWithDrawal/>}></Route>
        <Route path='/page/EmrProvidentFund' element={<ProvidentFund/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
