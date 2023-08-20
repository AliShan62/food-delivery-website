

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', location: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', credentials);
    try {
      const response = await fetch("http://localhost:5000/api/v1/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert('Enter valid credentials');
      } else {
        alert('Registration successful. Welcome to our website!');
        // Handle the successful response from the API as needed
        // For example, you can redirect to another page or show a success message
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle the error here, e.g., display an error message to the user
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container mt-5 p-5">
        <form onSubmit={handleSubmit} style={{ "width": "50%", "margin-left":"350px" }}>
          <div className="form-group mb-4 fs-5 mb-5">
            <label htmlFor="Name" className="text-white">Name</label>
            <input type="text" className="form-control p-2 " name='name' value={credentials.name} onChange={onChange} placeholder="Enter Your Name" />
          </div>
          <div className="form-group mb-4 fs-5 mb-5">
            <label htmlFor="exampleInputEmail1" className="text-white">Email address</label>
            <input type="email" className="form-control p-2" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Your Email" />
          </div>

          <div className="form-group mb-4 fs-5 mb-5">
            <label htmlFor="exampleInputPassword1" className="text-white">Password</label>
            <input type="password" className="form-control p-2" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} placeholder="Enter Your Password" autoComplete="current-password" />
          </div>

          <div className="form-group mb-4 fs-5 mb-5">
            <label htmlFor="exampleInputPassword1" className="text-white">Address</label>
            <input type="text" className="form-control p-2" name="location" value={credentials.location} onChange={onChange} placeholder="Enter Your Address" />
          </div>


        
          <button type="submit" className="btn btn-success fs-5">Submit</button>

          <Link to="/Login" className="m-3 btn btn-danger fs-5">
            LogIn
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
