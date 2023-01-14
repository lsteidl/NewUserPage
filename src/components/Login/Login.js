import React from 'react';
import LoginForm from './LoginForm';

/*
* Allows user to log in to an account, 
* most of the work is done in LoginForm.js
*/
class Login extends React.Component {
 /*
 * Adds EventListener to log in button to handle validation.
 * Prevents submission if any field is invalid
 */
 componentDidMount(){
  const form = document.getElementById("loginForm");
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.className="was-validated";
  })  
 }
 
 render(){   
    return(
        <div className="container">
          <div className="card mx-auto shadow bg-transparent text-white col-sm-12 col-md-8 col-lg-5 blur-card" >
            <h5 className="card-header text-white">Sign In</h5>
                <div className="card-body">
                  <LoginForm setView={(value) => this.changeView(value)}
                              grandParentCallback={(value) => this.props.parentCallback(value)}/>
                </div>
          </div>
        </div>
      )
  }

}
export default Login;