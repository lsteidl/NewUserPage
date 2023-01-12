import React from 'react';

/*
* Welcomes user upon successful form completion and submission.
* Provides instructions to complete account setup.
*/
class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="container pt-5" >
                <div className="card mx-auto shadow bg-transparent blur-card text-white col-sm-12 col-md-8 col-lg-7" >
                    <h5 className="card-header">Account Created</h5>
                    <div className="card-body">
                        <h2 className="p-2" align="center">Welcome, {this.props.name}!</h2>
                        <p> A confirmation email has been sent to <a class="link-light">{this.props.email}.</a></p>
                        <p> Please click the validation link in the email to verify your account.</p>
                    </div>
                </div>
                
          </div>
          )
      }
    }
    export default Welcome;
      