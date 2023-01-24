import React from 'react';
import Feedback from './Feedback';
import { useForm } from "react-hook-form";

/* 
* Account Sign Up / Login form with validation.
* Validation is not active until "Submit" button is pressed.
* All fields are required. 
*
* Definitions of valid Create Account entries:
* Name: Any String with length > 0 and < 51
* Email: [Any String with length > 0][@][Any String with length > 0][.][Any String of letters with length > 1]. Length must be < 51.
* Password: Any String with length > 3 and < 41, password fields must match.
* State: Any of the select options.
* Occupation: Any of the select options.
*
* Definitions of valid Login entries:
* Email: [Any String with length > 0][@][Any String with length > 0][.][Any String of letters with length > 1]. Length must be < 51.
* Password: Any String with length > 1.
*
*/ 
function Form(props) {
  /*
  * POSTs valid info to 'https://frontend-take-home.fetchrewards.com/form'
  * Redirects user to Welcome or FormError page depending on POST response status.
  */ 
    function postFormInfo(data){
        var status = -1;
        fetch('https://frontend-take-home.fetchrewards.com/form', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => { 
          status = response.status;
          if (status === 201){
            let email = document.getElementById("validationEmail").value;
            let name = document.getElementById("validationName").value;
            props.setEmail(email); // Pass email info back to SignUp to be used by Welcome
            props.setName(name); // Pass name info back to SignUp to be used by Welcome
            props.setView("welcome") // Switch to welcome page
          }
          else {
            props.setView("error")
          }
          return response; })
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data)))
        .catch(err => { 
          console.log('Request Failed', err)
          props.setView("error")
        });
        
      }
      /*
      * check name validity
      */
      function checkName(name){
        if(name.length > 50 || name.length === 0){
          return false;
        }
        else{
          return true;
        }
      }
      /*
      * check email validity
      * future use: verify email is not yet taken
      */
      function checkEmail(email){
        if(email.length > 50) 
          return false;
        if(/^[A-Za-z0-9](([a-zA-Z0-9,=.!\-#|$%^&*+/?_`{}~]+)*)@(?:[0-9a-zA-Z-]+.)+[a-zA-Z]{2,9}$/.test(email)){
          return true;
        }
        else{
          return false;
        }
      }
      /*
      * return true if password is valid
      */
      function checkPassword(password){
        if(password.length > 3 && password.length < 41){
          return true;
        }
        else{
          return false;
        }
      }
      /*
      * return true if Sign up form data is valid
      */
      function checkFormData(data){
        if(checkName(data.name) && checkEmail(data.email) && checkPassword(data.password)){
          return true;
        }
        else{
          return false;
        }
      }
      /*
      * Handles form submission for Sign Up
      * Modifies 'submit form' button to indicate form is being processed
      */
      function onSignUp(data){
        // prepare loading symbol
        let element = document.getElementById("signUpButton");
        element.innerText = "Loading...";
        const span = document.createElement("span");
        span.role = "status";
        span.className="spinner-border spinner-border-sm";
        element.appendChild(span);
        // prepare data
        data.state = data.state.split(" ")[0]; // eliminate abbreviation from state string, only pass name of the State
        console.log(data);
        if(checkFormData(data)){ // final data check
          postFormInfo(data);
        }
        else{
          props.setView("error");
        }
      }
      /*
      * Any valid Email and Password entry directs user to HomePage.
      */ 
      function postLoginInfo(data){
       if(checkEmail(data.email) && checkPassword(data.password)){
          props.setView("home");
        }
        else{
          props.setView("error");
        }
      }
      /* 
      * Modifies log in button to indicate form is being processed
      */
      function onLogin(data){
        console.log("onLogin(data)");
          let element = document.getElementById("loginButton");
          element.innerText = "Loading...";
          const span = document.createElement("span");
          span.role = "status";
          span.className="spinner-border spinner-border-sm";
          element.appendChild(span);
          postLoginInfo(data);
      }
    // define shared variables
    const { register, handleSubmit} = useForm();
    const inputClassName = ["form-control transparent-input text-white"];
    const selectClassName = ["form-control form-select transparent-input text-white"];
    const linkClassName = ["btn btn-link my-link mx-auto pt-3 text-white text-nowrap"];
    const buttonClassName = ["btn myBtn text-white btn-outline-light btn-block"];
    const validationClassName = ["has-validation text-start position-relative"];
    const labelClassName1 = ["pt-1 form-label"];
    const labelClassName3 = ["pt-3 form-label"];
    var formClass = ["needs-validation"];
    var formId = "";
    var submitFunction = "";
    var passwordError = "";
    var submit = "";
    var links = "";
    var signUpForm = false;
    var passwordLength = "";
    // define variables unique to each form type (SignUp or Login)
    if(props.type === "signUp"){
      signUpForm = true;
      formId = "signUpForm";
      submitFunction = onSignUp;
      passwordError = "length";
      passwordLength = "4";
      submit = 
        <div id="submitDiv" className="pt-5 d-grid">
          <button id="signUpButton" className={buttonClassName} type="submit"> Submit form </button>
          <button type="button" className={linkClassName} onClick={() => props.setView("login")}>Already Have an Account? Sign In.</button>
        </div>
    }
    else if(props.type === "login"){
      signUpForm = false;
      formId = "loginForm";
      submitFunction = onLogin;
      passwordError = "password";
      passwordLength = "1";
      submit =               
          <div id="submitDiv" className="pt-5 mx-auto d-grid">
              <button id="loginButton" className={buttonClassName} type="submit">Sign In</button>
          </div>
      links = 
        <div className="pt-5 row" align="center">
          <button type="button"  className={linkClassName} onClick={() => props.setView("signUp")}>No Account Yet? Sign Up.</button>
          <span className="text-center"> or </span>
          <button type="button" className={linkClassName} onClick={() => props.setView("home")}>Continue as a Guest.</button>
        </div>   
    }
    // define each possible form element
    var inputName =                         
        <div className={validationClassName}>
          <label className={labelClassName1} id="inputName">Full Name</label>
          <input type="text" className={inputClassName} id="validationName"
          required {...register("name")} pattern="^.*$"></input>
          <Feedback error = "tryAgain"/>
          <Feedback valid="looksGood"/>
        </div>;
    var inputEmail =                         
        <div className={validationClassName}>
          <label className={labelClassName3} id="inputEmail">Email</label>
          <input type="email" className={inputClassName} maxLength="50" id="validationEmail" 
            aria-describedby="inputGroupPrepend" required {...register("email")} 
            pattern="^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$"></input>
          <Feedback error="email"/>
          <Feedback valid="email"/>
        </div>;
    var inputPassword1 =
        <div className={validationClassName}>
          <label className={labelClassName3} id="inputPass1">Password</label>
          <input type="password" className={inputClassName} minLength={passwordLength} maxLength="40" id="validationPassword1"
            required {...register("password")}></input>
          <Feedback error={passwordError}/>
          <Feedback valid="looksGood"/>
        </div>
    var inputPassword2 = 
        <div className={validationClassName}>
          <label className={labelClassName3} id="inputPass2">Repeat Password</label>
          <input type="password" className={inputClassName} minLength="4" maxLength="40" id="validationPassword2"
            required onChange={ () => document.getElementById("validationPassword2").pattern = document.getElementById("validationPassword1").value} pattern="-1"></input>
          <Feedback error="tryAgain"/>
          <Feedback valid="passwordMatch"/>
        </div>
    var selectState =
        <div className={validationClassName}>
          <label className={labelClassName3} id="inputState">State</label>
          <select defaultValue="" className={selectClassName} id="validationState" required {...register("state")}>
            <option disabled value="">Choose...</option>
          </select>
          <Feedback error="tryAgain"/>
          <Feedback valid="looksGood"/>
        </div>
    var selectOccupation = 
        <div className={validationClassName}>
          <label className={labelClassName3} id="inputOccu">Occupation</label>
          <select defaultValue="" className={selectClassName} aria-label="select example" id="validationOccu" required {...register("occupation")}>
            <option disabled value="">Choose...</option>
          </select>
          <Feedback error = "tryAgain"/>
          <Feedback valid="looksGood"/>
        </div>
    return(
      <form id={formId} className={formClass} align="center" noValidate onSubmit={handleSubmit(submitFunction)}>
        {signUpForm ? inputName : ""}
        {inputEmail}
        {inputPassword1}
        {signUpForm ? inputPassword2 : ""}
        {signUpForm ? selectState : ""}
        {signUpForm ? selectOccupation : ""}
        {submit}
        {links}
      </form>
    ) 
}
export default Form;