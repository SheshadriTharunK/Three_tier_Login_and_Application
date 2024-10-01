import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';  // Correct default import
import axios from 'axios';

function Signup() {
  console.log('In Sign Up');
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    // Ensure no validation errors before making the API request
    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      try {
        const response = await axios.post('http://localhost:8092/register', values);
        if (response.status === 201) {
          // Redirect to login page after successful sign-up
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              name='name'
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              name='email'
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              name='password'
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0"><strong>Create Account</strong></button>
          <p>You are agreeing to our terms and policies</p>

          <Link to='/login' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Go to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
