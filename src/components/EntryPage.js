import React from 'react';
import Container from './Container.js';
import HomePage from './HomePage';
import FormError from './FormError';
import Welcome from './Welcome';
import { onAuthStateChanged } from "firebase/auth";

/*
* This is the main component returned by App.js
* Facilitates the switching between Login, SignUp,
* FormError and Home.
*/
class EntryPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signedIn: false,
      currentView: "signUp",
      name: "DEFAULT_NAME",
      email: "DEFAULT@MAIL.COM"
    }
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
componentDidMount(){
    // Authentication
    this.authFirebaseListener = onAuthStateChanged(this.props.auth, (user) => {
      if (user) {
        // User is signed in
       // const uid = user.uid;
        this.setState({signedIn: true})
        this.changeView("home");
        // ...
      } else {
        // User is signed out
        this.setState({signedIn: false})
        this.changeView("login");
      }
    })
}


  /*
  * Gets form data 
  * Completes form options
  */
  async loadFormData(){
    await getFormData(this); // get states and occupations
    loadStates(); // adds option elements in CustomForm
    loadOccupations(this); // adds option elements in CustomForm
  }
 
  /*
  * Handles hiding of loading symbol
  * Waits to display form text until data is loaded
  */
  revealSignUp(){
    let signUp = document.getElementById("signUp"); // SignUp card in SignUp.js
    let signUpHeader = document.getElementById("signUpHeader"); // header in SignUp.js
    let loading = document.getElementById("formLoading"); // "loading" spinning icon
    signUp.classList.remove("invisible");
    signUpHeader.classList.remove("invisible");
    loading.classList.add("invisible");
  }

  /*
  * Only accessable by Logged In Users.
  * Background resets to default after logging out.
  */
  changeBackground = (image) => {
    let main = document.getElementById("main");
    if (image === "bg-1"){
      if(main.classList.contains("bg-3"))
        main.classList.remove("bg-3");
      else
        main.classList.remove("bg-2");

      document.getElementById("main").classList.add("bg-1");
    }
    else if(image === "bg-2"){
      if(main.classList.contains("bg-1"))
        main.classList.remove("bg-1");
      else
        main.classList.remove("bg-3");

      document.getElementById("main").classList.add("bg-2");
    }
    else {
      if(main.classList.contains("bg-2"))
        main.classList.remove("bg-2");
      else 
        main.classList.remove("bg-1");

      document.getElementById("main").classList.add("bg-3");
    }
  }

  /*
  * Switch Tab title to match current context
  */
  updateTitle = (newTitle) => {
    let title = document.getElementById("pageTitle");
    if(title !== null)
      title.innerText = newTitle;
  }

/*
* Displays 1 of 4 possible components,
* SignUp, FormError, Login and HomePage
*/
  currentView = () => {
    switch(this.state.currentView) {
      case "signUp":
        this.updateTitle("Create Account");
        this.loadFormData(); // reload Occupation and State options
        return (
          <Container 
            auth={this.props.auth}
            type="signUp"
            setView = {(value)=>this.changeView(value)}
            setEmail = {(value)=>this.changeEmail(value)}
            setName = {(value)=>this.changeName(value)}
          />
        )
      case "login":
        this.updateTitle("Login");
        return (
            <Container
              auth={this.props.auth}
              type="login"
              setView = {(value)=>this.changeView(value)}
            />
        )
        case "welcome":
          return (
            <Welcome 
            email = {this.state.email}
            name = {this.state.name}
            changeView = {(value) => this.changeView(value)}
            />
          )
        case "home":
          this.updateTitle("Home");
          return (
              <HomePage
                auth={this.props.auth}
                setView = {(value)=>this.changeView(value)}
                setBackground = {(value)=>this.changeBackground(value)}
              />
          )
        case "error":
          this.updateTitle("Error");
          return (
                <FormError 
                  errorType="loading"/>
          )
        case "sign-up-error":
          this.updateTitle("Error");
          return (
            <FormError/>
          )
        default:
          this.updateTitle("Error");
          return (
            <FormError 
              errorType="default"/>
          )
    }
  }
  render(){
    return(
      <section id="main" className="min-vh-100 bg-image d-flex align-items-center page-background bg-1">
        {this.currentView()}
      </section>
    )
  }
}
const occupations = []; // holds occupation options received from server
const states = []; // holds state options received from server
const abbrev = []; // holds occupations received from server
/*
* Gets form data for States, Abbreviations and Occupations from server
* Populates occupations, states and abbrev arrays with the data 
*/ 
const getFormData = async (obj) => {
    let status = -1;
    // get option data after component has loaded
    await fetch("https://newuserpage-a9fa8.web.app/formData")
    .then(response => { 
    status = response.status;
    if (status !== 200){
      console.log('Could not retrieve select options');
      obj.changeView("error");
    }
      return response 
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
        for(let i in json.occupations) {
          occupations[i] = (json.occupations[i]);
          console.log(occupations[i]);
        }
        for(let i in json.states) {
          states[i] = (json.states[i].name);
          abbrev[i] = (json.states[i].abbreviation)
          console.log(states[i]);
        }
    }).catch(err => { console.log('Could not retrieve select options', err);
      obj.changeView("error");
    });
  }

/*
* Populates options for States in CustomForm
* Depends on data gathered by getFormData().
*/
function loadStates(){
    let select = document.getElementById("validationState");
    for(let i = 0; i < states.length; i++){
      let opt = states[i] + " (" + abbrev[i] + ")";
      let el = document.createElement("option");
      el.id = "stateOption"+i;
      el.text = opt;
      el.value = opt;
      if(select != null)
        select.add(el);
  }
}
/*
* Populates options for Occupations in CustomForm
* Depends on data gathered by getFormData().
*/
function loadOccupations(obj){
  let select = document.getElementById("validationOccu");
  for(let i = 0; i < occupations.length; i++){
    let opt = occupations[i];
    let el = document.createElement("option");
    el.id = "OccuOption"+i;
    el.text = opt;
    el.value = opt;
    if(select != null)
      select.add(el);
  }
  obj.revealSignUp(); // make sign up visible after loading options 
}

export default EntryPage;