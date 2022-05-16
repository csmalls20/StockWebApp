<h1 align="center">Stock Web Application</h1> 

<h3 align="center">Christopher Smalls (cas35@hood.edu)</h3>
<h3 align="center">Sorupa Wagle (sw11@hood.edu)</h3>
<h3 align="center">Tobi Aroloye (oa5@hood.edu)</h3>
<br>
<h4 align="center">Github Link: https://github.com/sorupa/StockWebApp</h4>

## Table of Contents 
- [Introduction](#introduction) 
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Tech Stack](#tech-stack)

## Introduction
With this stock portfolio simulation, users can add however much money they would like to the stock of their choice. Thus, displaying the changes of the stock due to the addition of an individual's money in real time. Each stock that is affected by the user's actions will be added to their portfolio; allowing them to see how the stock they invested in is currently doing.   

**The application can be ran on any browser.**

## Features
* Login/logout functionality
* Register functionality
* Get current value of stock
* Add money to stocks 
* Display of loss/profit of stocks

## Directory Structure
* accounts = Account info of user
* backend = Backend configuration of program through django
* media/profilepic = Avatar profile of user
* public = Transition of website to be created through React 
* src = Source code
* stockapp = Used for django configuration

## Tech Stack
* Python
* JavaScript
* Django
* SQLite
* Virtual Studio Code

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Running the app locally in windows
Please make sure you have node, yarn and python already installed in your machine.
Run the following commands from your VS Code Terminal

    python -m venv venv

    .\venv\Scripts\activate

    pip install -r .\requirements.txt

### Running the app locally (Mac OS)
Please make sure you have node, yarn and python already installed in your machine.
Run the following commands from your VS Code Terminal

    python -m venv venv
    
    source venv/bin/activate
    
    pip install -r requirements.txt
    
    sudo npm install --global yarn

## Start the frontend server
    yarn start 
## Open a new terminal to run the backend server

    python manage.py migrate/ python manage.py makemigrations

    python manage.py runserver

### To see the sqllite database
    python manage.py createsuperuser

Go to this link: 

http://127.0.0.1:8000/admin/login/?next=/admin/

