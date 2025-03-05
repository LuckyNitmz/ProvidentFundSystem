import React from 'react'
import './NewWithDrawal.css';

export const NewWithDrawal = () => {
  return (
    <div className="withdrawal-form">
      <h2>New Withdrawal</h2>
      <form>
        <div className="NWform-group">
          <label id='NWlevel' >Employee ID :</label>
          <input id="NWinput" type="text" placeholder="Enter Employee ID" />
        </div>
        <div className="NWform-group">
          <label id='NWlevel' >Date :</label>
          <input id="NWinput" type="date" />
        </div>
        <div className="NWform-group">
          <label id='NWlevel' >Amount :</label>
          <input id="NWinput" type="number" placeholder="Enter Amount" />
        </div>
        <div className="NWform-group">
          <label id='NWlevel' >Reason :</label>
          <textarea id='NWtextarea' rows="4" placeholder="Enter Reason" style={{width : '95%'}}></textarea>
        </div>
        <div className='NWSub_Cancel_Btn'>
           <button className='NWSub_btn' style={{ backgroundColor: 'green' }}>Submit</button>
           <button className='NWSub_btn' style={{ backgroundColor: 'red' }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
 
export default NewWithDrawal;
