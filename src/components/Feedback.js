import React from 'react';
/*
* Pop up element used to indicate input is valid.
* Provides a message for valid input.
* This component is used by CustomForm and LoginForm.
* 
*/
class FeedbackValid extends React.Component {
  render(){
    if(this.props.valid === "passwordMatch"){
      return(
        <div className="valid-tooltip position-absolute top-100 end-0 text-nowrap">
          Passwords Match!
        </div>
      )
    }
    else if (this.props.valid === "looksGood") {
      return(
        <div className="valid-tooltip position-absolute top-100 end-0 text-nowrap">
          Looks good!
        </div>
      )
    }
    else if (this.props.valid === "email") {
      return(
        <div className="valid-tooltip position-absolute top-100 end-0 text-nowrap">
          Email is valid!
        </div>
      )
    }
    else if(this.props.error === "email"){
      return(
          <div className="invalid-tooltip position-absolute top-100 end-0 text-nowrap">
            Please enter a valid email.
          </div>
      )
    }
    else if(this.props.error === "password"){
        return(
            <div className="invalid-tooltip position-absolute top-100 end-0 text-nowrap">
              Please enter a password.
            </div>
        )
    }
    // Sign Up Page feedback
    else if(this.props.error === "length"){
        return(
            <div className="invalid-tooltip position-absolute top-100 end-0 text-nowrap">
              Minimum Password Length: 8
            </div>
        )
    }
    else if(this.props.error === "tryAgain"){
        return(
            <div className="invalid-tooltip position-absolute top-100 end-0 text-nowrap">
              Try Again!
            </div>
        )
    }
    }

}
export default FeedbackValid;