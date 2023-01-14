import React from 'react';
import SignUp from '../../components/SignUp/SignUp.js';
import Login from '../../components/Login/Login.js';
import HomePage from '../../components/HomePage/HomePage';
import FormError from '../../components/Errors/FormError';

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
      email: "",
    }
  }
  /*
  * Gets form data 
  * Completes form options
  */
  async loadFormData(){
    await getFormData(this); // retrive states and occupations
    loadStates(); // adds option elements in CustomForm
    loadOccupations(this); // adds option elements in CustomForm
  }
  async componentDidMount(){
    this.loadFormData();
  }
  /*
  * Handles hiding of loading symbol
  * Waits to display form text until data is loaded
  */
  revealSignUp(){
    let signUp = document.getElementById("signUp");
    let signUpHeader = document.getElementById("signUpHeader");
    let loading = document.getElementById("formLoading"); // "loading" spinning icon
    signUp.classList.remove("invisible");
    signUpHeader.classList.remove("invisible");
    loading.classList.add("invisible");
  }
  async componentDidRender(){
    this.loadFormData();
  }
  changeView = (view) => {
    this.setState({
      currentView: view
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
          <SignUp 
            parentCallback = {(value)=>this.changeView(value)}
          />
        )
      case "login":
        this.updateTitle("Login");
        return (
            <Login
              parentCallback = {(value)=>this.changeView(value)}
            />
        )
        case "home":
          this.updateTitle("Home");
          return (
              <HomePage
                parentCallback = {(value)=>this.changeView(value)}
                parentBackground = {(value)=>this.changeBackground(value)}
              />
          )
        case "error":
          this.updateTitle("Error");
          return (
                <FormError 
                  errorType="loading"/>
          )
        default:
          this.updateTitle("Error");
          return (
                <FormError 
                  errorType="default"/>
          )
    }
  }
  // // style={{backgroundImage: this.state.background,  minWidth: '100vw', minHeight:'100vh', backgroundSize:'cover', backgroundAttachment: 'fixed'}}>
  render(){
    return(
      <section id="main" className="min-vh-100 bg-image d-flex align-items-center page-background bg-abstract">
        {this.currentView()}
      </section>
    )
  }
}
const occupations = [];
const states = [];
const abbrev = [];
 
const getFormData = async (obj) => {
  let status = -1;
  // get option data after component has loaded
  await fetch("https://frontend-take-home.fetchrewards.com/form")
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
        occupations.push(json.occupations[i]);
        console.log(occupations[i]);
      }
      for(let i in json.states) {
        states.push(json.states[i].name);
        abbrev.push(json.states[i].abbreviation)
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
  for(let i = 0; i < states.length; i++) {
    let opt = states[i] + " (" + abbrev[i] + ")";
    let el = document.createElement("option");
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
  for(let i = 0; i < occupations.length; i++) {
    let opt = occupations[i];
    let el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    if(select != null)
      select.add(el);
  }
  obj.revealSignUp(); // make sign up visible after loading options 
}

export default EntryPage;