import React from 'react';
import CustomForm from './CustomForm';

/*
* Allows user to create an account, 
* most of the work is done in CustomForm.js.
* Stores name and email to be used in a personalized "Welcome" message.
* Parts of this component are invisible until all form data has been loaded.
* Spinning "loading" icon displays while this data loads.
*/
class SignUp extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
      currentView: "form",
      name: "DEFAULT_NAME",
      email: "DEFAULT@MAIL.COM"
    }
 }
 
/*
* Adds EventListener to submit button to handle validation.
* Prevents submission if any field is invalid
*/
componentDidMount(){
  const form = document.getElementById("signUpForm");
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
          <section className="w-100">
            <div  className="container">
              <div className="card mx-auto shadow bg-transparent text-white col-sm-12 col-md-8 col-lg-5 blur-card position-relative" >
                <h5 id="signUpHeader" className="invisible card-header text-white">Create Account
                {/* <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.changeView("welcome")}>Success</button>
                <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.changeView("error")}> Fail</button>
                <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.props.parentCallback("home")}> Home</button> */}
                </h5>
                <div id="formLoading" className="position-absolute start-50 top-50 translate-middle">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                </div>
                    <div id="signUp" className="invisible card-body">
                      <CustomForm setView={(value) => this.props.setView(value)}
                                  setEmail={(value) => this.props.setEmail(value)}
                                  setName={(value) => this.props.setName(value)}
                        />
                    </div>
              </div>
            </div>
          </section>
          )
      }

    }
    export default SignUp;
      