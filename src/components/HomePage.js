import React from 'react';

class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       currentView: "form",
       name: "DEFAULT_NAME",
       email: "DEFAULT@MAIL.COM"
     }
  }
componentDidMount(){
  let buttonAbstract = document.getElementById("abstract");
  if(buttonAbstract != null)
    buttonAbstract.setAttribute("disabled","disabled"); // disable default background button to avoid a repeat selection
}
/*
* Handles background customization
* Disables the button for the current background to prevent reselection
*/
  handleSelection(buttonId){
    this.props.parentBackground(buttonId); // update background
    let buttonWood = document.getElementById("wood");
    let buttonSpace = document.getElementById("space");
    let buttonAbstract = document.getElementById("abstract");
    // disable/enable appropriate buttons
    if(buttonId === "wood"){
        console.log("wood clicked");
        buttonWood.setAttribute("disabled","disabled"); // disable
        buttonSpace.removeAttribute("disabled"); // enable
        buttonAbstract.removeAttribute("disabled");
    }
    else if (buttonId === "space"){
        console.log("space clicked");
        buttonWood.removeAttribute("disabled");
        buttonSpace.setAttribute("disabled","disabled");
        buttonAbstract.removeAttribute("disabled");
    }
    else if (buttonId === "abstract"){
        console.log("abstract clicked");
        buttonWood.removeAttribute("disabled");
        buttonSpace.removeAttribute("disabled");
        buttonAbstract.setAttribute("disabled","disabled");
    }
  }
  /*
  * Handles procedure for user logout
  * Switches back to login page and resets customization
  */
  signOut(){
    this.handleSelection("abstract"); // reset background to default, no customization while logged out
    this.props.parentCallback("login");
  }
  render(){   
    return(
        <div className="w-100">
            <nav className="navbar navbar-expand-lg fixed-top blur-card shadow">
                <div className="container-fluid ">
                    <span className="navbar-brand mb-0 h1 text-white">Home</span>
                    <button className="btn btn-outline-light" type="submit" onClick={() => this.signOut()}>Sign Out</button>
                </div>
            </nav>
            <div className="container" align="center">
                {/* <h2 className="text-white">Choose a background image:</h2> */}
                <div className="card mx-auto shadow bg-transparent text-white col-sm-11 col-md-8 col-lg-6 blur-card" >
                    <h3 className="card-header text-white">Choose a background image:</h3>
                        <div className="card-body">
                            <button id="wood" className="btn btn-outline-light mx-3" type="submit" onClick={() => this.handleSelection("wood")}>Wood</button>
                            <button id="space" className="btn btn-outline-light mx-3" type="submit" onClick={() => this.handleSelection("space")}>Space</button>
                            <button id="abstract" className="btn btn-outline-light mx-3" type="submit" onClick={() => this.handleSelection("abstract")}>Abstract</button>
                        </div>

                </div>
            </div>
        </div>
      )
  }
}
export default HomePage;