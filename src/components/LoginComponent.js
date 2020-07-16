import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './../Utils/Common';
import {Row} from 'react';
 
function LoginComponent(props) {
  const [loading, setLoading] = useState(false);
  // const email = useFormInput('');
  // const password = useFormInput('');
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  }
  const handleChangePassword = e => {
    setPassword(e.target.value);
  }

  const [facebookResponse,setFbResponse]=useState(null);

  const [googleResponse,setGoogleResponse]=useState(null);
 
  // handle button click of login form
  const handleLogin = (e) => {
      e.preventDefault();
    
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3000/api/login/', { email: email, password: password },{
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(response => {
      setLoading(false);
      console.log(response);
      
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
      console.log(error);
    });
  }
        return (
          <div>
            <form onSubmit={handleLogin}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" onChange={handleChangeEmail} name="email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={handleChangePassword}  name="password" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <FacebookLogin
                        appId="XXXXXXXXXX"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={setFbResponse} />
                        </div>
                        <br/>
                      
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <GoogleLogin
                        clientId="XXXXXXXXXX"
                        buttonText="Login"
                        onSuccess={setGoogleResponse}
                        onFailure={setGoogleResponse}
                    />
                    </div>
            </div>
        );
    }
    const useFormInput = initialValue => {
        const [value, setValue] = useState(initialValue);
        const handleChange = e => {
          setValue(e.target.value);
        }
        return {
          value,
          onChange: handleChange
        }
      }
       
      export default LoginComponent;