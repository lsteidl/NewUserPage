import React from 'react';
import FeedbackValid from '../../components/Feedback/FeedbackValid';
import FeedbackInvalid from '../../components/Feedback/FeedbackInvalid';
import { useForm } from "react-hook-form";

/* 
* Account Sign Up form with validation.
* Validation is not active until "Submit" button is pressed.
* All fields are required. 
*
* Definitions of valid entries:
* Name: Any String with length > 0
* Email: [Any String with length > 0][@][Any String with length > 0][.][Any String of letters with length > 1].
* Password: Any String with length > 7, password fields must match.
* State: Any of the select options.
* Occupation: Any of the select options.
*/ 
function CustomForm(props) {
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
          return response})
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data)))
        .catch(err => { console.log('Request Failed', err)
                        props.setView("error")
        });
        
      }
      // Modifies submit button to indicate form is being processed
      function onSubmit(data){
        let element = document.getElementById("submitButton");
        element.innerText = "Loading...";
        const span = document.createElement("span");
        span.role = "status";
        span.className="spinner-border spinner-border-sm";
        element.appendChild(span);
        postFormInfo(data);
      }

    const { register, handleSubmit, formState: { errors } } = useForm();
        return(
             <form id="signUpForm" className="needs-validation" align="center" noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div className="has-validation text-start position-relative">
                        <label className="pt-1 form-label" id="inputName">Full Name</label>
                        <input type="text" className="form-control transparent-input text-white" maxlength="50" id="validationName"
                        required {...register("name")} pattern="^.*$"></input>
                        <FeedbackInvalid/>
                        <FeedbackValid/>
                      </div>
                      <div className="has-validation text-start position-relative">
                        <label className="pt-3 form-label" id="inputEmail">Email</label>
                        <input type="email" className="form-control transparent-input text-white" maxlength="50" id="validationEmail" 
                        aria-describedby="inputGroupPrepend" required {...register("email")} pattern="^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$"></input>
                        <FeedbackInvalid />
                        <FeedbackValid/>
                      </div>
                        <div className="has-validation text-start position-relative">
                          <label className="pt-3 form-label" id="inputPass1" >Password</label>
                          <input type="password" className="form-control transparent-input text-white" minlength="8" maxlength="40" id="validationPassword1"
                          required onChange={ () => document.getElementById("validationPassword2").pattern = document.getElementById("validationPassword1").value} ></input>
                          <FeedbackInvalid error="length"/>
                          <FeedbackValid/>
                        </div>
                        <div className="has-validation text-start position-relative">
                          <label className="pt-3 form-label" id="inputPass2" >Repeat Password</label>
                          <input type="password" className="form-control transparent-input text-white" maxlength="40" id="validationPassword2"
                          required {...register("password")}></input>
                          {/* <div className="valid-tooltip position-absolute top-100 end-0 text-nowrap">
                            Looks good!
                          </div> */}
                          <FeedbackInvalid error="passwordMatch"/>
                          <FeedbackValid valid="passwordMatch"/>
                        </div>
                        <div className="has-validation text-start position-relative">
                          <label className="pt-3 form-label" id="inputState">State</label>
                          <select className="form-control form-select transparent-input text-white" id="validationState" required {...register("state")}>
                            <option selected disabled value="">Choose...</option>
                          </select>
                          <FeedbackInvalid/>
                          <FeedbackValid/>
                        </div>
                      <div className="has-validation text-start position-relative">
                        <label className="pt-3 form-label" id="inputOccu">Occupation</label>
                        <select className="form-control form-select transparent-input text-white" aria-label="select example" id="validationOccu" required {...register("occupation")}>
                          <option selected disabled value="">Choose...</option>
                        </select>
                        <FeedbackInvalid/>
                        <FeedbackValid/>
                      </div>
                    <div id="submitDiv" className="pt-5 d-grid">
                      <button id="submitButton" className="btn myBtn text-white btn-outline-light btn-block" type="submit" >Submit form</button>
                      <button type="button" className="btn btn-link my-link mx-auto pt-3 text-white text-nowrap" onClick={() => props.grandParentCallback("login")}>Already Have an Account? Sign In.</button>
                    </div>
                  </form>
        )
   }
   export default CustomForm;