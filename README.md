# Entry Page for Application

This project uses React and Bootstrap 5.2.

Users can Create an Account, Log in, or view the HomePage as a guest.

CustomForm.js only allows form submission when all fields are valid.

Definitions of valid entries:

* Name: Any String (with length > 0 and length < 51).

* Email: [Any String with length > 0][@][Any String with length > 0][.][Any String of letters with length > 1]. Total length must be less than 51.

* Password: Any String (with length > 7 and length < 41), password fields must match.

* State: Any of the select options.

* Occupation: Any of the select options.

Any valid email and passsword entered into the Login page will bring the user to the HomePage.

### Application Overview:
  EntryPage returns 1 of 4 components: SignUp, Login, HomePage or DataError.

  SignUp returns 1 of 3 components: CustomForm, Success, or FormError.

## How to run this project using Yarn

Clone this repository and install dependencies.
In the project directory, you can run:

### `yarn install`


Next, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `yarn test`

Runs tests using watch mode.


