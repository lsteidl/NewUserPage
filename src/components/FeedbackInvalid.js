import React from 'react';

/*
* Pop up element used to indicate input is invalid.
* Provides a variety of error messages for input validation.
* This component is used by CustomForm and LoginForm.
* 
*/
class FeedbackInvalid extends React.Component {
    render(){  
        // Login Page feedback
        if(this.props.error === "email"){
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
        else {
            return(
                <div className="invalid-tooltip position-absolute top-100 end-0 text-nowrap">
                Try Again!
                </div>
            )
        }
    }   
  
}
export default FeedbackInvalid;