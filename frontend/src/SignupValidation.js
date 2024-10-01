function Validation(values) {
    let error = {};  // Initialize an object to store errors
    
    // Email validation pattern
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Password validation pattern
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    // Validate name
    if (values.name === "") {
      error.name = "Name should not be empty";
    } else {
      error.name = "";
    }
  
    // Validate email
    if (values.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Email didn't match";
    } else {
      error.email = "";
    }
  
    // Validate password
    if (values.password === "") {
      error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      error.password = "Password didn't match";
    } else {
      error.password = "";
    }
  
    return error;  // Return the error object
  }
  
  export default Validation;  // Ensure it's exported as default
  