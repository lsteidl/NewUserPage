import React from 'react';
import CustomForm from './CustomForm';
import Welcome from  './Welcome';
import FormError from '../../components/Errors/FormError.js';

/*
* Allows user to create an account, 
* most of the work is done in CustomForm.js.
* Stores name and email to be used in a personalized "Welcome" message.
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
  console.log("validator is running\n");
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.className="was-validated";
  })  
}
changeView = (view) => {
  this.setState({
    currentView: view
  })
}
changeEmail = (email) => {
  this.setState({
    email: email
  })
}
changeName = (name) => {
  this.setState({
    name: name
  })
}
/*
* Displays 1 of 3 components,
* CustomForm, Success, and FormError
*/
currentView = () => {
  switch(this.state.currentView) {
    case "form":
      return (
        <div className="container">
        <h2 className="text-white" align="center"></h2>
          <div className="card mx-auto shadow bg-transparent text-white col-sm-12 col-md-8 col-lg-5 blur-card" >
            <h5 className="card-header text-white">Create Account
            <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.changeView("welcome")}>Success</button>
            <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.changeView("error")}> Fail</button>
            <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.props.parentCallback("home")}> Home</button>

            </h5>
                <div className="card-body">
                  <CustomForm setView={(value) => this.changeView(value)}
                              setEmail={(value) => this.changeEmail(value)}
                              setName={(value) => this.changeName(value)}
                              grandParentCallback={(value) => this.props.parentCallback(value)}
                    />
                </div>
          </div>
        </div>
      )
    case "welcome":
      return (
        <Welcome 
        email={this.state.email}
        name={this.state.name}
        />
      )
      case "error":
        return (
          <FormError />
        )
  }
}


render(){   
        return(
          <section className="w-100">
            {this.currentView()}
          </section>
          )
      }

    }
    export default SignUp;
      