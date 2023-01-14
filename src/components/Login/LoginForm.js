import React from 'react';
import FeedbackValid from '../../components/Feedback/FeedbackValid';
import FeedbackInvalid from '../../components/Feedback/FeedbackInvalid';
import { useForm } from "react-hook-form";


/* 
* Account Sign Up form with validation.
* Validation is not active until "Submit" button is pressed.
* All fields are required. 
* Definitions of valid entries:
* Email: [Any String with length > 0][@][Any String with length > 0][.][Any String of letters with length > 1]. Length must be < 51.
* Password: Any String with length > 1.
*/ 
function LoginForm(props) {
    /*
    * Any valid Email and Password entry directs user to HomePage.
    */ 
    function postLoginInfo(data){
        props.grandParentCallback("home");
    }
    /* 
    * Modifies submit button to indicate form is being processed
    */
    function onSubmit(data){
        let element = document.getElementById("submitButton");
        element.innerText = "Loading...";
        const span = document.createElement("span");
        span.role = "status";
        span.className="spinner-border spinner-border-sm";
        element.appendChild(span);
        postLoginInfo(data);
    }

    const { register, handleSubmit } = useForm();
        return(
             <form id="loginForm" className="needs-validation mx-auto" align="center" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="has-validation text-start position-relative">
                    <label className="pt-3 form-label" id="inputEmail">Email</label>
                    <input type="email" maxLength="50" className="form-control transparent-input text-white" id="loginEmail"
                    aria-describedby="inputGroupPrepend" required {...register("email")} pattern="^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$"></input>
                    <FeedbackInvalid error="email"/>
                    <FeedbackValid feedbackType="email"/>
                </div>
                <div className="has-validation text-start position-relative">
                    <label className="pt-3 form-label" id="inputPass1">Password</label>
                    <input type="password" minLength="1" maxLength="40" className="form-control transparent-input text-white" id="loginPW" 
                    required></input>
                    <FeedbackInvalid error="password"/>
                    <FeedbackValid/>
                </div>                        
                <div id="submitDiv" className="pt-5 mx-auto d-grid">
                    <button id="submitButton" className="btn myBtn text-white btn-outline-light btn-block" type="submit">Sign In</button>
                </div>
                <div className="pt-5 row" align="center">
                    <button type="button"  className="btn btn-link my-link text-white text-nowrap" onClick={() => props.grandParentCallback("signUp")}>No Account Yet? Sign Up.</button>
                    <span className="text-center"> or </span>
                    <button type="button" className=" btn btn-link my-link text-white text-center text-nowrap" onClick={() => props.grandParentCallback("home")}>Continue as a Guest.</button>
                </div>        
            </form>
        )
   }
export default LoginForm;