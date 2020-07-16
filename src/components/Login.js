import React, { Component } from "react";

import { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './../Utils/Common';

import React, { Component } from 'react'

export default class Login extends Component {


    constructor(props) {

        super(props);
        
        this.state={
        
        email: '',
        
        password:'',
        
        errors: {}
        
        }
        
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        
        this.handleChangePassword = this.handleChangePassword.bind(this);
        
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
        
        }
        
        handleChangeEmail(e) {
        
        this.setState({email:e.target.value});
        
        }
        
        handleChangePassword(e) {
        
        this.setState({password:e.target.value});
        
        }
        
        submituserRegistrationForm(e) {
        
        e.preventDefault();
        
        if (this.validateForm()) {
        
        console.log(this.state);
        
        var apiBaseUrl = "http://localhost:1288/api/";
        
        var data={
        
        "email":this.state.email,
        
        "password":this.state.password
        
        }
        
        var headers = {
        
        'Content-Type': 'application/json',
        
        }
        
        console.log(data);
        
        axios.post(apiBaseUrl+'authenticate', data, {headers: headers}).then(function (response) {
        
        console.log(response);
        
        if(response.data.success){
        
        localStorage.setItem("u_code", encodeURIComponent(JSON.stringify(response.data.data)));
        
        localStorage.setItem('is_done', true);
        
        window.location.href = "/";
        
        console.log("Login successfull");
        
        }else{
        
        alert(response.data.message);
        
        }
        
        }).catch(function (error) {
        
        console.log(error);
        
        });
        
        }
        
        }
        
        validateForm() {
        
        let errors = {};
        
        let formIsValid = true;
        
        if (!this.state.email) {
        
        formIsValid = false;
        
        errors["email"] = "*Please enter your email-ID.";
        
        }
        
        if (typeof this.state.email !== "undefined") {
        
        //regular expression for email validation
        
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
        if (!pattern.test(this.state.email)) {
        
        formIsValid = false;
        
        errors["email"] = "*Please enter valid email-ID.";
        
        }
        
        }
        
        if (!this.state.password) {
        
        formIsValid = false;
        
        errors["password"] = "*Please enter your password.";
        
        }
        
        if (typeof this.state.password !== "undefined") {
        
        if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        
        formIsValid = false;
        
        errors["password"] = "*Please enter secure and strong password.";
        
        }
        
        }
        
        this.setState({
        
        errors: errors
        
        });
        
        return formIsValid;
        
        }
        

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
