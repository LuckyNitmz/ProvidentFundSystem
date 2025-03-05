import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <p>Please enter your UAN and registered mobile number to recover your password.</p>
      <form>
        <label>
          UAN:
          <input type="text" name="uan" placeholder="Enter UAN" />
        </label>
        <label>
          Mobile Number:
          <input type="text" name="mobile" placeholder="Enter Mobile Number" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;
