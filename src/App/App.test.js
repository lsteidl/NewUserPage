import React from 'react';
import App from './App';
import SignUp from '../components/SignUp/SignUp';
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'

// Test that rendering the App component loads Create account card in Login.js
test('Rendering App should load Create Account card', () => {
  render(
    <App/> 
);
  const element = screen.getByText(/Create/i);
  expect(element).toBeInTheDocument();
});

// Test button switching from Sign Up to Sign In, then Continue as Guest button.
test('Switch from Sign Up to Sign In.', () => {
 render(
    <App> 
      <SignUp/>
    </App>
);

fireEvent.click(screen.getByText(/Sign In./i)); // "Already have an account" button
fireEvent.click(screen.getByText(/Guest/i)); // "Continue as Guest" Button

const element = screen.getByText(/Choose a background/i);
expect(element).toBeInTheDocument();

});

// Test submission of blank form.
test('Attempt to submit a blank form then continue as a Guest.', () => {
  render(
     <App> 
       <SignUp/>
     </App>
 );
 // Attempt to submit blank form twice
 fireEvent.click(screen.getByText(/Submit./i)); // "Submit" button
 fireEvent.click(screen.getByText(/Submit./i)); // "Submit" button
 // Submit button should still be on the page
 const submitButton = screen.getByText(/Submit./i);
 expect(submitButton).toBeInTheDocument();

 fireEvent.click(screen.getByText(/Sign In./i)); // "Already have an account" button
 fireEvent.click(screen.getByText(/Sign Up./i)); // "Create an account" button
 fireEvent.click(screen.getByText(/Sign In./i)); // "Already have an account" button
 fireEvent.click(screen.getByText(/Guest/i)); // "Continue as Guest" Button 
 // Choose a backgroun prompt should now be present
 const choosePrompt = screen.getByText(/Choose a/i);
 expect(choosePrompt).toBeInTheDocument();
});
