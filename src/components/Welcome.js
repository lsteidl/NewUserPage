import React from 'react';

/*
* Welcomes user upon successful form completion and submission.
* Provides instructions to complete account setup.
*/
class Welcome extends React.Component {
    render(){
        return(
            <div className="container pt-5" >
                <div className="card mx-auto shadow bg-transparent blur-card text-white col-sm-12 col-md-8 col-lg-7" >
                    <h5 className="card-header">Account Created</h5>
                    <div className="card-body">
                        <h2 className="p-2" align="center">Welcome, {this.props.name}!</h2>
                        <p> A confirmation email has been sent to <u>{this.props.email}.</u></p>
                        <p> Please click the validation link in the email to verify your account.</p>
                        <div className="text-center">
                            <button type="button" className=" mx-auto btn btn-link my-link text-white text-center text-nowrap" 
                                onClick={() => this.props.changeView("home")}>Continue as a Guest.</button>
                        </div>

                    </div>
                </div>
                
          </div>
          )
      }
    }
    export default Welcome;
      