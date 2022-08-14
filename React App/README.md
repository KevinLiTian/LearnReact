# React App

We've been using React and Babel CDNs so far to write JSX code, which is a quick and easy way to setup local environment for developing with React; however, since we are writing in JSX which needs in-browser Babel to translate/compile into JavaScript on the fly, it is definitely not the best approach, not to mention if you right click to inspect the console of the webpage we created using the quick setup, there's warning saying "Be sure to precompile your scripts for production"

Thanks to the React team, there's an easy way to create an React App. This method requires [`node.js`](https://nodejs.org/en/) and [`npm`](https://www.npmjs.com/) (Node Package Manager) to be installed on your local machine, here's a complete guide for setting up `node.js` and `npm`

## Setup Node.js & NPM

First step is to check whether you already have `node.js` and `npm`. Open up a terminal or a command prompt if you are using Windows, type each of the following commands and hit enter:

```sh
# Check for node.js version
node -v

# Check for npm version
npm -v
```

If your local machine doesn't have these two yet, it will not recognize these two commands; if version numbers pop up, then it means you already have them, feel free to skip the following installation steps, or keep following if you are not sure you have the up to date version or the correct way of setting up the environtment

If you are on macOS or Linux, visit the [`nvm`](https://github.com/nvm-sh/nvm) (Node Version Manager) official GitHub repository and follow the instructions there to download `nvm`; if you are on Windows, visit the [`nvm-windows`](https://github.com/coreybutler/nvm-windows) official GitHub repository and follow the instructions there to download `nvm` Windows version

After downloading Node Version Manager, check if its correctly installed by running `nvm -v` in the terminal, if everything went well, a version number should appear, otherwise, check the GitHub repo instructions and be sure not to miss anything

Node Version Manager allows you to use specific version of `node.js` and switch easily between different versions. Now we can use `nvm` to install `node.js`, specifically the LTS (Long Term Support) version, which is the most stable and bug-free version

If you are using macOS or Linux

```sh
nvm install --lts
nvm use --lts
```

If you are using Windows, the commands usually require administrative rights, which means the normal command prompt will not work, press Windows + X and find the admin power shell, then run the following commands:

```
nvm install lts
nvm use lts
```

Now if everything was successful, we should be able to type `node -v` and see some version number, which means `node.js` is installed successfully

`npm` actually comes with `node.js`, which means you can also type `npm -v` and should see some version number

## Create React App

Now that we have `node.js` and `npm` setup, we can use the commands given on the React official website to create our first complete setup React App:

```sh
# my-app is the name of our app, feel free to give any name you prefer
npx create-react-app my-app
cd my-app
npm start
```

If everything went well, a webpage like the figure below should appear:

<img width="1470" alt="1" src="https://user-images.githubusercontent.com/99038613/184518375-89fe192d-7025-43c9-9ef4-48eaab78a025.png">

This is the React App default view. Now we can start developing React application with this framework, first by deleting everything in the `src` directory as we don't need the default view

## First Project

Now we can practice using React by building a simple project, a static mobile "React Facts" info site, which looks like this

<img width="565" alt="Screen Shot 2022-08-13 at 9 44 37 PM" src="https://user-images.githubusercontent.com/99038613/184521676-b0b54963-e316-4edc-a790-12bdc51dfd5b.png">

Whenever we start a project, the first thing to do should be a mental outline of what structure and components should we use, especially if we already have the design/look of the project

### Mental Outline

For this project, it's clear from the figure above that we need a navbar section and a main content section. By identifying the big picture of the project helps the development process a lot and especially when using React since it's component-based. Now it's clear to us that we should have a `Navbar` component and a `Main` component

Then, we can start brainstorming what HTML elements we possibly going to use in each component, maybe an outline like this:

```HTML
<nav>
    <img />
    <h3></h3>
    <h4></h4>
</nav>

<main>
    <h1></h1>
    <ul>
        <li></li> * 5
    </ul>
</main>
```

### Project Setup

After deleting everything in the `src` directory, start by creating the following directories and files in the `src` directory:

- `Components`
  - `Navbar.js`
  - `Main.js`
- `Images`
  - React Logo
- `App.js`
- `index.js`
- `styles.css`

The `components` directory contains all reusable components of the project. In this case, we have a navbar component and a main component

`App.js` will create a single application by importing and using the components, then `index.js` will import this application and render it on the webpage

Note that the `index.html` file is actually not in the `src` directory, it resides in the `public` directory and we are not going to touch it, a good practice in React App is keeping everything in the `src` directory. We'll not add a link to `styles.css` in the HTML file, rather, we'll do it in the "React" way

In `index.js`:

```JSX
import "./styles.css";
```

If you have any confusion regarding the setup, feel free to check the [`my-app`](my-app/) directory for the entire completed project. It is recommanded to DIY the project, but if you have any concern, feel free to reference the completed project

### Navbar

We'll start by creating the navbar and give it some styling

Since now we are not using the CDNs in the HTML file, we don't have access to React and global variables like `ReactDOM`, therefore, in each file we have to import what we want to use from React

In `Navbar.js`:

```JSX
import React from "react";
import reactLogo from "../images/react_logo.svg";

export default function Navbar() {
  return (
    <nav>
      <img src={reactLogo} alt="React Logo" className="nav--icon" />
      <h3 className="nav--logo_text">ReactFacts</h3>
      <h4 className="nav--title">React Course - Project 1</h4>
    </nav>
  );
}
```

Notice that we imported React Logo and used it as the `src` attribute in the `img` tag, this gives React a reference of where to find the image

Also notie that the function `Navbar` has `export default` as its prefix, if you are not familiar with JavaScript modules, this just gives other JavaScript files the ability of importing this function

Then in the `styles.css`, we give the navbar elements some styling

```CSS
nav {
    display: flex;
    align-items: center;
    background-color: #21222A;
    height: 90px;
    padding: 30px 25px;
}

.nav--logo_text,
.nav--title {
    margin: 0;
}

.nav--logo_text {
    margin-right: auto;
    color: #61DAFB;
    font-weight: 700;
    font-size: 22px;
}

.nav--title {
    color: #DEEBF8;
    font-weight: 600;
}

.nav--icon {
    height: 30px;
    margin-right: 7px;
}
```

If you are not familiar with CSS, take a moment to read through the styling and try to understand what each property does, and Google them if needed

### Main Section

Now we can move on to the `Main` component, in `Main.js`:

```JSX
import React from "react";

export default function Main() {
  return (
    <main>
      <h1 className="main--title">Fun facts about React</h1>
      <ul className="main--facts">
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100k stars on GitHub</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </main>
  );
}
```

And we can apply some styles:

```CSS
main {
    padding: 57px 27px;
    color: white;
    background-image: url(./images/react_logo_half.png);
    background-repeat: no-repeat;
    background-position: right 75%;
}

.main--title {
    margin: 0;
    font-size: 39px;
    letter-spacing: -0.05rem;
}

.main--facts {
    margin-top: 46px;
}

.main--facts>li {
    line-height: 19px;
    padding-block: 10px;
}

.main--facts>li::marker {
    font-size: 1.4rem;
    color: #61DAFB;
}
```

We have completed the two components and we are ready to combine them together as an application

In `App.js`:

```JSX
import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Main />
    </div>
  );
}
```

Then we want to render the app on the webpage, we can do this in `index.js`:

```JSX
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Congratulations! You have completed your first React App!
