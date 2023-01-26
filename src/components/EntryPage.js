import React from 'react';
import Container from './Container.js';
import HomePage from './HomePage';
import FormError from './FormError';
import Welcome from './Welcome';

/*
* This is the main component returned by App.js
* Facilitates the switching between Login, SignUp,
* FormError and Home.
*/
class EntryPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentView: "signUp",
      name: "DEFAULT_NAME",
      email: "DEFAULT@MAIL.COM"
    }
  }
  // Authentication
  // authenticate(data){
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, data.email, data.password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       console.log("new user signed in");
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode + errorMessage);
  //       // ..
  //     });   
  // }

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
  * Only accessable by Logged In Users.
  * Background resets to default after logging out.
  */
  changeBackground = (image) => {
    let main = document.getElementById("main");
    if (image === "abstract"){
      if(main.classList.contains("bg-space"))
        main.classList.remove("bg-space");
      else
        main.classList.remove("bg-wood");

      document.getElementById("main").classList.add("bg-abstract");
    }
    else if(image === "wood"){
      if(main.classList.contains("bg-abstract"))
        main.classList.remove("bg-abstract");
      else
        main.classList.remove("bg-space");

      document.getElementById("main").classList.add("bg-wood");
    }
    else {
      if(main.classList.contains("bg-wood"))
        main.classList.remove("bg-wood");
      else 
        main.classList.remove("bg-abstract");

      document.getElementById("main").classList.add("bg-space");
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
      <section id="main" className="min-vh-100 bg-image d-flex align-items-center page-background bg-abstract">
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