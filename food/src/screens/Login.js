import React from 'react'
import  { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';


function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert('Enter valid credentials');
      }

      if (json.success) { 
        
        localStorage.setItem('userEmail',credentials.email );
        // Store the token in localStorage
        localStorage.setItem('token', json.token);
        navigate('/');
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
        <div className="form-group mb-4 text-white fs-5 mb-3">
            <label htmlFor="exampleInputEmail1 ">Email address</label>
             <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Your Email" />
          </div>

          <div className="form-group mb-4 text-white fs-5">
            <label htmlFor="exampleInputPassword1">Password</label>
             <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} placeholder="Enter Your Password" autoComplete="current-password" />
          </div>

          <button type="submit" className="btn btn-success fs-5"> Submit </button>

           <Link to="/createUser" className="m-3 btn btn-danger fs-5"> Sign Up</Link>

        
        </form>
      </div>
    </>
  )
}

export default Login;
