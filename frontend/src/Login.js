import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from './LoginValidation';  // Assuming you have validation logic

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');  // State for login error
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const response = await axios.post('http://localhost:8092/login', values);
        
        if (response.data.success) {
          // Navigate to the home page if login is successful
          navigate('/home');
        } else {
          // Display the error message returned by the backend
          setLoginError(response.data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setLoginError('Invalid credentials');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0"><strong>Log in</strong></button>
          
          {/* Display login error message */}
          {loginError && <p className="text-danger mt-3">{loginError}</p>}

          <p>You are agreeing to our terms and policies</p>
          <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Go to Signup
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
