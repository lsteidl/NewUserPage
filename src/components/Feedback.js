import React from 'react';
/*
* Pop up element used to indicate input is valid.
* Provides a message for valid input.
* This component is used by CustomForm and LoginForm.
* 
*/
class FeedbackValid extends React.Component {
  render(){
    var className = "";
    var message = "";
    
    if(this.props.valid){
      className = ["valid-tooltip position-absolute top-100 end-0 text-nowrap"];
      switch(this.props.valid){
        case "passwordMatch": message = "Passwords Match!"; break;
        case "looksGood": message = "Looks good!"; break;
        case "email": message = "Email is valid!"; break;
        default: message = "Looks good!"; break;
      }
    }
    else if(this.props.error){
      className=["invalid-tooltip position-absolute top-100 end-0 text-nowrap"];
      switch(this.props.error){
        case "email": message = "Please enter a valid email."; break;
        case "password": message = "Please enter a password."; break;
        case "length": message = "Minimum Password Length: 4"; break;
        case "tryAgain": message = "Try Again!"; break;
        case "invalidLogin": message = "Invalid Email or Password. Please Try Again."; className = "alert alert-warning"; break;
        default: message = "Try Again!"; break;
      }
    }
      return(
        <div className={className} >
          {message}
        </div>
      )
    }
}
export default FeedbackValid;