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
    else {
      return(
        <div className="valid-tooltip position-absolute top-100 end-0 text-nowrap">
          Looks good!
        </div>
      )
    }
  }

}
export default FeedbackValid;