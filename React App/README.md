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