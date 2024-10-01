// LoginValidation.js

function validation(values) {
    let errors = {};  // Initialize an object to store errors
  
    // Validation logic for email and password
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email is invalid";
    }
  
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must be at least 8 characters long, contain an uppercase letter and a number";
    }
  
    return errors;  // Return errors object
  }
  
  export default validation;  // Ensure it's exported as default
  