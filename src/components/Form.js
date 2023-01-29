import React from 'react';
import Feedback from './Feedback';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously  } from "firebase/auth";

/* 
* Account Sign Up / Login form with validation.
* Validation is not active until "Submit" button is pressed.
* All fields are required. 
*
* Definitions of valid Create Account entries:
* Name: Any String with length > 0 and < 51
* Email: [Any String with length > 0][@][Any String with length > 0][.][Any String of letters with length > 1]. Length must be < 51.
* Password: Any String with length > 5 and < 41, password fields must match.
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
  * POSTs valid info to Firebase project
  * Redirects user to Welcome or FormError page depending on POST response status.
  */ 
  function createEmailPassword(data){
    console.log("DATA: " + data.email + " and " + data.password);
    // const auth = getAuth();
    console.log("props.auth: " + props.auth);
    createUserWithEmailAndPassword(props.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("new user signed in: " + user);
        console.log(userCredential);
        let email = document.getElementById("validationEmail").value;
        let name = document.getElementById("validationName").value;
        props.setEmail(email); // Pass email info back to EntryPage to be used by Welcome
        props.setName(name); // Pass name info back to EntryPage to be used by Welcome
        props.setView("welcome") // Switch to welcome page
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        // ..
      });  
  }
  function signIn(data){
    signInWithEmailAndPassword(props.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("SIGN IN SUCCESSFUL from FORM PAGE");
        console.log(user);
        // props.setView("home") // Switch to welcome page
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error with sign in, " + error.code + " " + error.message);
        // show invalid credentials alert
        let alert = document.getElementById("loginFailedAlert");
        alert.classList.remove("invisible");
        // change button back to normal
        let span = document.getElementById("loginLoading");
        span.remove();
        let element = document.getElementById("loginButton");
        element.innerText = "Submit";
        // reset form 
        let form = document.getElementById("loginForm");
        form.classList.add("has-validation"); // this is not working
        form.classList.remove("needs-validation"); // this is not working
        form.reset(); // maybe only clear the password field?
        // move input selection back to username
      });
      console.log("After sign in call");
  }
  function anonymousLogin(){
    signInAnonymously(props.auth)
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Anonymous Login Error: " + errorCode + ": " + errorMessage)
      // ...
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
    if(password.length > 5 && password.length < 41){
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
  * Calls createEmailPassword(data) once preparation is complete
  */
  function userSignUp(data){
    // prepare loading symbol
    let element = document.getElementById("signUpButton");
    element.innerText = "Loading...";
    const span = document.createElement("span");
    span.id ="signUpLoading";
    span.role = "status";
    span.className="spinner-border spinner-border-sm";
    element.appendChild(span);
    // prepare data
    data.state = data.state.split(" ")[0]; // eliminate abbreviation from state string, only pass name of the State
    console.log(data);
    if(checkFormData(data)){ // final data check
      createEmailPassword(data);
    }
    else{
      props.setView("error");
    }
  }
    /* 
    * Modifies log in button to indicate form is being processed
    * calls signIn(data) once preperation is complete
    */
    function userLogin(data){
      // Display loading icon
      console.log("userLogin(data)");
      let element = document.getElementById("loginButton");
      element.innerText = "Loading...";
      const span = document.createElement("span");
      span.id = "loginLoading";
      span.role = "status";
      span.className="spinner-border spinner-border-sm";
      element.appendChild(span);
      if(checkEmail(data.email) && checkPassword(data.password)){
        console.log("CALLING SIGN IN");
        console.log(data.email +" and " + data.password);
        signIn(data);
      }
      else{
        props.setView("error");
      }
    }
    // define shared variables
    const { register, handleSubmit} = useForm();
    const inputClassName = ["form-control transparent-input text-white"];
    const selectClassName = ["form-control form-select transparent-input text-white"];
    const linkClassName = ["btn btn-link my-link mx-auto pt-3 text-white"];
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
      submitFunction = userSignUp;
      passwordError = "length";
      passwordLength = "6";
      submit = 
        <div id="submitDiv" className="pt-5 d-grid">
          <button id="signUpButton" className={buttonClassName} type="submit"> Submit form </button>
          <button type="button" className={linkClassName} onClick={() => props.setView("login")}>Already Have an Account? Sign In.</button>
        </div>
    }
    else if(props.type === "login"){
      signUpForm = false;
      formId = "loginForm";
      submitFunction = userLogin;
      passwordError = "password";
      passwordLength = "6";
      submit =               
          <div id="submitDiv" className="pt-5 mx-auto d-grid  position-relative">
              <button id="loginButton" className={buttonClassName} type="submit">Sign In</button>
              <div id="loginFailedAlert" className="invisible position-absolute top-100 alert alert-danger font-size-sm d-flex align-items-center justify-content-center mt-2 mx-auto py-1" role="alert">
              <i className="bi bi-exclamation-triangle-fill pe-2"></i> Invalid Credentials. Please Try Again.
              </div>
          </div>
          
      links = 
        <div className="pt-5 row" align="center">
          <button type="button"  className={linkClassName} onClick={() => props.setView("signUp")}>No Account Yet? Sign Up.</button>
          <span className="text-center"> or </span>
          <button type="button" className={linkClassName} onClick={() => anonymousLogin()}>Continue as a Guest.</button>
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
          <input type="password" className={inputClassName} minLength="6" maxLength="40" id="validationPassword2"
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
