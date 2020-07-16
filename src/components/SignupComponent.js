import React, { Component } from "react";
import axios from 'axios';
import { setUserSession } from './../Utils/Common';


export default class SignUpComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            password_repeat:""
        }
        this.updateState=this.updateState.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    };
    updateState(e){
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
    
        axios.post('http://localhost:3000/api/sign-up/', { email: this.state.email, password: this.state.password,password_repeat:this.state.password_repeat },{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(response => {
            console.log(response); 
           // setUserSession(response.data.token, response.data.user);
            
            if(response.status==201){
                this.props.history.push('/sign-in');  
            }
          }).catch(error => {
           // setLoading(false);
         //   if (error.response.status === 401) //setError(error.response.data.message);
           // else setError("Something went wrong. Please try again later.");
            console.log(error);
          });

    }
 render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={this.updateState} placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" name="password" className="form-control" onChange={this.updateState} placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="text" name="password_repeat" className="form-control" onChange={this.updateState} placeholder="Enter email" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}