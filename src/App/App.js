import './App.css';
import React from 'react';
import EntryPage from '../components/EntryPage';

/*
* Returns the App's main component, EntryPage 
*/
function App(props) {
  
  return (
      <EntryPage auth={props.auth} className='page-full'> </EntryPage>
  );
}
export default App;
