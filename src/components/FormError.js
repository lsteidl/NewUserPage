import React from 'react';
/*
* Notifies user of server error, error retrieving form data and all other errors.
*/
class FormError extends React.Component {
    renderMessage(){
        if(this.props.errorType === "loading"){
            return (
                <div>
                    <p> An unexpected error has occurred, critical form data could not be retrieved.</p>
                    <p> Please refresh the page and try again.</p> 
                </div>
            )
        }
        else if(this.props.errorType === "default"){
            return(
                <div>
                    <p> An unexpected error has occurred. Default Page Error.</p>
                    <p> Please refresh the page and try again.</p> 
                </div>
            )
        }
        else {
            return(
                <div>
                    <p> An unexpected error has occurred.</p>
                    <p> Please refresh the page and try again.</p>
                </div> 
            )
        }
    }
    render(){
            return(
                <div className="container">
                    <div className="card mx-auto shadow bg-transparent blur-card text-white col-sm-11 col-md-10 col-lg-6">
                    <h5 className="card-header">Oops!</h5>
                        <div className="card-body">
                            <h2 className="p-2" align="center">Something went wrong.</h2>
                            {this.renderMessage()}
                            <button type="button" className="btn btn-link my-link mx-auto pt-3 text-white text-nowrap" onClick={() => window.location.reload(true)}> Refresh the page. </button>
                        </div>
                    </div>
              </div>
              )
    }
}
export default FormError;