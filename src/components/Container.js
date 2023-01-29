import React from 'react';
import Form from './Form';

/*
* Allows user to create an account, 
* most of the work is done in CustomForm.js.
* Stores name and email to be used in a personalized "Welcome" message.
* Parts of this component are invisible until all form data has been loaded.
* Spinning "loading" icon displays while this data loads.
*/
class Container extends React.Component {
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
  prepareValidation(){
    var formId = "";
    if(this.props.type === "signUp") {
      formId = "signUpForm";
    }
    else if (this.props.type === "login"){
      formId = "loginForm";
    }
    const form = document.getElementById(formId);
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.className="was-validated";
    })  
  }
  componentDidMount(){
    this.prepareValidation();
  }
  
  componentDidUpdate(){
    this.prepareValidation();
  }
/**
 * 
 * @returns Login Form or Sign Up Form
 */
  render(){
    var cardClass = "";
    var cardBodyClass = "";
    var cardBodyId = "";
    var headerClass = "";
    var headerId = "";
    var header = "";
    var loading = "";
    var formType = "";

    if(this.props.type === "signUp"){
      headerClass = ["invisible card-header text-white"];
      headerId = "signUpHeader";
      header = "Create Account";
      cardClass = ["card mx-auto shadow bg-transparent text-white col-sm-12 col-md-8 col-lg-5 blur-card position-relative"];
      cardBodyClass = ["invisible card-body"];
      cardBodyId = ["signUp"];
      loading =     <div id="formLoading" className="position-absolute start-50 top-50 translate-middle">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>;
      formType = "signUp";
    }
    else if(this.props.type === "login"){
      headerClass = ["card-header text-white"];
      headerId = "";
      header = "Sign In";
      cardClass = ["card mx-auto shadow bg-transparent text-white col-sm-12 col-md-8 col-lg-5 blur-card"];
      cardBodyClass = ["card-body"];
      cardBodyId = ["login"];
      loading = "";
      formType = "login";
    }

    return(
      <section className="w-100 container">
          <div className={cardClass} >
            <h5 id={headerId} className={headerClass}> {header}
            {/* <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.changeView("welcome")}>Success</button>
            <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.changeView("error")}> Fail</button>
            <button id="submit1" type="button" className="btn btn-primary btn-sm" onClick={() => this.props.parentCallback("home")}> Home</button> */}
            </h5>
            {loading}
                <div id={cardBodyId} className={cardBodyClass}>
                  <Form       
                              auth={this.props.auth}
                              type={formType}
                              setView={(value) => this.props.setView(value)}
                              setEmail={(value) => this.props.setEmail(value)}
                              setName={(value) => this.props.setName(value)}
                    />
                </div>
          </div>
      </section>
      )
  }

}
export default Container;
      