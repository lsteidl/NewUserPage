import React from 'react';
import { signOut } from "firebase/auth";
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
    this.props.setBackground(buttonId); // update background in EntryPage.js
    let bg2 = document.getElementById("bg-2");
    let bg3 = document.getElementById("bg-3");
    let bg1 = document.getElementById("bg-1");
    // disable/enable appropriate buttons
    if(buttonId === "bg-2"){
        bg2.setAttribute("disabled","disabled"); // disable
        bg3.removeAttribute("disabled"); // enable
        bg1.removeAttribute("disabled");
    }
    else if (buttonId === "bg-3"){
        bg2.removeAttribute("disabled");
        bg3.setAttribute("disabled","disabled");
        bg1.removeAttribute("disabled");
    }
    else if (buttonId === "bg-1"){
        bg2.removeAttribute("disabled");
        bg3.removeAttribute("disabled");
        bg1.setAttribute("disabled","disabled");
    }
  }
  /*
  * Handles procedure for user logout
  * Switches back to login page and resets customization
  */
  userSignOut(){
    this.handleSelection("bg-1"); // reset background to default, no customization while logged out
        signOut(this.props.auth).then(() => {
            // Sign-out successful.
            console.log("sign out success");
          }).catch((error) => {
            // An error happened.
            console.log("sign out failed: " + error);
          });
    //this.props.setView("login");
  }
  render(){   
    var backgroundButtonClass = "btn btn-outline-light mx-3";
    return(
        <div className="w-100">
            <nav className="navbar navbar-expand-lg fixed-top blur-card shadow">
                <div className="container-fluid ">
                    <span className="navbar-brand mb-0 h1 text-white">Home</span>
                    <button className="btn btn-outline-light" type="submit" onClick={() => this.userSignOut()}>Sign Out</button>
                </div>
            </nav>
            <div className="container" align="center">
                {/* <h2 className="text-white">Choose a background image:</h2> */}
                <div className="card mx-auto shadow bg-transparent text-white col-sm-11 col-md-8 col-lg-6 blur-card" >
                    <h3 className="card-header text-white">Choose a background image:</h3>
                        <div className="card-body">
                            <button id="bg-2" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-2")}>Purple</button>
                            <button id="bg-3" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-3")}>Beach</button>
                            <button id="bg-1" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-1")}>Abstract</button>
                        </div>

                </div>
            </div>
        </div>
      )
  }
}
export default HomePage;