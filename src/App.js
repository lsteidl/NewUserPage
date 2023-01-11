import './App.css';
import React from 'react';
import SignUp from './SignUp.js';
import FormError from './FormError.js';
import Background1 from './abstract.jpg';
import Background2 from './wood.png';
import Background3 from './space.jpg';
import Login from './Login';
import HomePage from './HomePage';
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
      name: "",
      email: "",
      background: `url(${Background1})`,
    }
  }
  /*
  * Gets form data 
  * Completes form options
  */
  async loadFormData(){
    await getFormData(this); // retrive states and occupations
    loadStates(); // adds option elements in CustomForm
    loadOccupations(); // adds option elements in CustomForm
  }
  async componentDidMount(){
    this.loadFormData();
    // new Image().src = `url(${Background1})`;
    // new Image().src = `url(${Background2})`;
    // new Image().src = `url(${Background3})`;
    
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
    console.log("change background called in App.js");
    if (image === "abstract"){
      this.setState({
        background: `url(${Background1})`,
      })
    }
    else if(image === "wood"){
      this.setState({
        background: `url(${Background2})`,
      })
    }
    else {
      this.setState({
        background: `url(${Background3})`,
      })
    }
  }
  /*
  * Switch Tab title to match current context
  */
  updateTitle = (newTitle) => {
    let title = document.getElementById("pageTitle");
    title.innerText = newTitle;
  }

/*
* Displays 1 of 4 possible components,
* SignUp, FormError, Login and Home
*/
  currentView = () => {
    console.log("current view called in App.js");
    switch(this.state.currentView) {
      case "signUp":
        this.updateTitle("Create Account");
        this.loadFormData(); 
        return (
          <SignUp 
            parentCallback = {(value)=>this.changeView(value)}
          />
        )
      case "error":
        this.updateTitle("Error");
         return (
               <FormError errorType="loading"></FormError>
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
    }
  }
  render(){
    //console.log("RENDER CALLED IN APPP.JS");
    return(
      <section id="main" className="bg-image d-flex justify-content-center align-items-center background-custom"
                style={{backgroundImage: this.state.background,  minWidth: '100vw', minHeight:'100vh', backgroundSize:'cover', backgroundAttachment: 'fixed'}}>
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
  for(var i = 0; i < states.length; i++) {
    var opt = states[i];
    var el = document.createElement("option");
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
function loadOccupations(){
  let select = document.getElementById("validationOccu");
  for(var i = 0; i < occupations.length; i++) {
    var opt = occupations[i];
    var el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    if(select != null)
      select.add(el);
  }
}

function App() {
  
  return (
      <EntryPage style={{ height:'100vh', width:'100vw'}}> </EntryPage>
  );
}
export default App;
