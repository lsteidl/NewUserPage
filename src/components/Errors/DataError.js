import React from 'react';
/*
* Notifies user of error retrieving form data
*/
class DataError extends React.Component {
    render(){
        return(
            <div className=" container">
                <h2 className="p-2" align="center"></h2>
                <div className="card mx-auto shadow bg-transparent blur-card text-white col-sm-11 col-md-10 col-lg-6">
                <h5 className="card-header">Oops!</h5>
                    <div className="card-body">
                        <h2 className="p-2" align="center">Something went wrong.</h2>
                        <p> An unexpected error has occurred, critical form data could not be retreived.</p>
                        <p> Please refresh the page and try again.</p>
                    </div>
                </div>
          </div>
          )
      }
    }
    export default DataError;