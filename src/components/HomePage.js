import React from 'react';
import { signOut } from "firebase/auth";
import Game from "./Game";
class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       currentView: "form",
       name: "DEFAULT_NAME",
       email: "DEFAULT@MAIL.COM",
       username: "Guest"
     }
  }
componentDidMount(){
  let bg1 = document.getElementById("bg-1");
  if(bg1 != null)
    bg1.setAttribute("disabled","disabled"); // disable default background button to avoid a repeat selection
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
    this.props.setView("login");
  }
  render(){   
    var backgroundButtonClass = "btn btn-outline-light mx-3";
    var dropdownButtonClass = "btn text-white dropdown-item my-dropdown";
    return(
        <div className="w-100">
            <nav className="navbar navbar-expand-lg fixed-top blur-card shadow">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-white">Home</span>
                    {/* <button className="btn btn-outline-light" type="submit" onClick={() => this.userSignOut()}>Sign Out</button> */}
                    <div className="btn-group">
                      <button className="btn btn-outline-light btn-lg dropdown-toggle my-dropdown pe-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle me-2"></i> <span className="pe-1"> {this.state.username} </span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className={dropdownButtonClass} type="button" href="#">My Account</button></li>
                        <li><button className={dropdownButtonClass} data-bs-toggle="modal" data-bs-target="#settingsModal">Settings</button></li>
                        <li><button className={dropdownButtonClass}  onClick={() => this.userSignOut()}>Sign Out</button></li>
                      </ul>
                    </div>
                </div>
            </nav>
            {/* <!-- Modal --> */}
            <div className="modal" id="settingsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="false">
              <div className="modal-dialog modal-lg">
                <div className="modal-content transparent-backdrop blur-card">
                  <div className="modal-header text-white">
                    <h5 className="modal-title" id="exampleModalLabel">Settings</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body blur-card">
                    <div className="card mx-auto shadow bg-transparent text-white blur-card" >
                      <h3 className="card-header text-white text-center">Choose a background image:</h3>
                          <div className="card-body mx-auto">
                              <button id="bg-2" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-2")}>Purple</button>
                              <button id="bg-3" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-3")}>Beach</button>
                              <button id="bg-1" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-1")}>Abstract</button>
                          </div>
                    </div> 
                  </div>
                  <div class="modal-footer">
                    <button type="button" className={backgroundButtonClass} data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Choose backgroun image  */}
            {/* <div className="container" align="center">
                <div className="card mx-auto shadow bg-transparent text-white col-sm-11 col-md-8 col-lg-6 blur-card" >
                    <h3 className="card-header text-white">Choose a background image:</h3>
                        <div className="card-body">
                            <button id="bg-2" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-2")}>Purple</button>
                            <button id="bg-3" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-3")}>Beach</button>
                            <button id="bg-1" className={backgroundButtonClass} type="submit" onClick={() => this.handleSelection("bg-1")}>Abstract</button>
                        </div>
                </div> 
            </div> */}
            <Game></Game>
        </div>
      )
  }
}
export default HomePage;