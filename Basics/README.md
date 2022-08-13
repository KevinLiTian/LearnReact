# Basics

What We'll Learn?

- **Why ReactJS?**
- **JSX**
- **Custom Components**

## First React Program!

ReactJS is a JavaScript framework, aim to make it intuitive and easy for developers to create interactive applications. Though React can be thought of as an extension to JavaScript, it cannot be written in vanilla JavaScript. React uses something called JSX, which means to write your first React program, we have to first include some React and JSX libraries. Just for a quick start, we'll simply create a new HTML file and include the React development CDNs in the `head` section of our HTML:

```HTML
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

By including these two CDNs, we can start writing some React code in JSX, but it won't work on the browser, why? It turns out browsers typically cannot understand JSX code, so we have to translate them into JavaScript using a tool called `babel`, we can simply include its CDN in the `head` section of our HTML too:

```HTML
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Now create a file called `index.js` and link it to the HTML file with type set to `babel`:

```HTML
<script src="index.js" type="text/babel"></script>
```

Then in the `body` section of the HTML file, let's add an empty `div` with `id` of `root` for React to render components in. Afterwards, open up `index.js` and we'll start writing a simple JSX program which renders a `h1` heading inside of the `div` with `id` of `root`:

```JSX
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, React!</h1>);
```

Then open up the HTML file with a browser, you should see a heading with the content "Hello, React!"

## Why ReactJS?

It's obviously that we can simply use HTML, CSS and vanilla JavaScript to create beautiful and interactive websites, so why do we even care about using React? There are a few reasons:

### It's Composable

Create large projects with small, reusable components, write less code, have a cleaner, maintainable code base, which is easier to manage the development of a project

For example, a bootstrap navbar code could look like this:

```HTML
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
```

Which is a lot of code for just a navbar, it could results in thousands lines of code for a webpage. By using React, the entire webpage could look like this:

```JSX
<body>
    <MyNavBar />
    <MyContent />
    <MyFooter />
</body>
```

Which is much more cleaner. Note that the three elements within the `body` tag are React componets. The idea here is to write HTML in JavaScript, and a React component is just a JavaScript function that returns some HTML and the component name is the name of the function:

```JSX
function MyContent() {
    return (
        <h1>Hello, React!</h1>
        <p>React is fun!</p>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<MyContent />);
```

### It's Declarative

We can classify programming into two categories, imperative and declarative

#### Imperative Programming

**How should it be done?** Describe to the computer every step on how to do something, and the computer will do it for you. Vanilla JavaScript commonly uses imperative programming where the programmers have to write all the instructions

```JS
const heading = document.createElement('h1');
heading.textContent = 'Hello, React!';
heading.className = 'header';
const root = document.getElementById('root');
root.append(heading);
```

#### Declarative Programming

**What should be done?** Tell the computer what to do and it will worry about how to get it done. For example, the following React code does the same thing as the vanilla JavaScript code above, but we as programmers only need to describe what we want to render and where do we want to render, React will figure out how to do that

```JS
ReactDOM.createRoot(document.getElementById('root')).render(<h1 className="header">Hello, React!</h1>);
```

### Some Other Reasons

- **It's a hireable skill.** A lot of big tech companies uses React for creating web apps and mobile apps, if you are skilled in React, there's a significantly higher chance to get hired
- **It's actively maintained by skilled people**: React is actively maintained by Facebook/Meta, which means React is popular right now and is not likely to be outdated anytime soon

## JSX

JavaScript XML (JSX) allows programmers to write HTML in JavaScript. Though there are some small difference like `className` instead of `class`, but it is much more efficient and maintainable than vanilla JavaScript. For example, instead of using imperative programming, we can simply in HTML and store it inside a variable:

```JSX
const element = <h1 className="header">This is JSX!</h1>;
ReactDOM.createRoot(document.getElementById('root')).render(element);
```

How does JSX create HTML elements with JavaScript under the hood? We can see that by simply console log the element. We'll also console log a HTML element created by vanilla JavaScript for comparison:

```JS
const h1 = document.createElement('h1');
h1.textContent = 'Hello world';
h1.className = 'header';
console.log(h1); // <h1 class="header">

const element = <h1 className="header">This is JSX!</h1>;
console.log(element);
/*
{
    type: "h1",
    key: null,
    ref: null,
    props: {
        className: "header",
        children: "This is JSX!"
    },
    _owner: null,
    _store: {}
}
*/
```

We can see that the element React created using JSX is just a plain JavaScript object, the object describes what should be rendered as a HTML element such as type and properties like class name

Note that with JSX and `render` function, only one parent element can be rendered at once:

```JSX
// This doesn't work since there are two parallel elements
ReactDOM.createRoot(document.getElementById('root')).render(
    <h1>Hello, JSX!</h1>
    <p>This doesn't work</p>
);

// We have to wrap everything with a parent element such as a div
ReactDOM.createRoot(document.getElementById('root')).render(
    <div>
        <h1>Hello, JSX!</h1>
        <p>This does work</p>
    </div>
);
```

Recall that we can store a `h1` heading inside a variable, we can also store an entire `div` with some children inside a variable:

```JSX
const page = (
    <div>
        <h1>Hello, JSX!</h1>
        <p>This does work</p>
    </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(page);
```

### Render instead of Append?

You might wonder why we are using `render` instead of simply `append` the HTML elements like in vanilla JavaScript? We can actually try to use `append` and see what will happen:

```JSX
const page = (
    <div>
        <h1>Hello, JSX!</h1>
        <p>JSX creates HTML elements using JavaScript objects</p>
    </div>
);

document.getElementById('root').append(page);

// We'll see "[object Object]" appear on the browser, to display the entire object, we can use JSON.stringify

document.getElementById('root').append(JSON.stringify(page));

/* We should see something like this on the browser
{
    type: "div",
    key: null,
    ref: null,
    props: {
        children: [
        {
            type: "h1",
            key: null,
            ref: null,
            props: { children: "Hello, JSX!" },
            _owner: null,
            _store: {},
        },
        {
            type: "p",
            key: null,
            ref: null,
            props: {
            children: "JSX creates HTML elements using JavaScript objects",
            },
            _owner: null,
            _store: {},
        },
        ],
    },
    _owner: null,
    _store: {}
}
*/
```

This is because we mentioned that under the hood, JSX creates HTML elements by creating JavaScript objects, and when we append the JS object to the div, we'll see the object itself instead of what we want the browser to render. This is the reason we want to use `render` instead of `append`

Now we can try to use all the knowledge we have so far to create the basic layout of a React info site:

```JSX
const page = (
  <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
    <h1>Fun facts about React</h1>
    <ul>
      <li>Was first released in 2013</li>
      <li>Was originally created by Jordan Walke</li>
      <li>Has well over 100k stars on GitHub</li>
      <li>Is maintained by Facebook</li>
      <li>Powers thousands of enterprise apps, including mobile apps</li>
    </ul>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(page);
```

This works, but we are back to the problem where we are piling up all the HTML code without making them reusable and maintainable

## Custom Components

Recall that we mentioned React is "composable", which means large projects can be constructed using small components. Small components are basically JavaScript functions that returns a snippet of HTML. Components makes HTML snippets reusable and more maintainable. For example, we can rewrite the above example program with a component instead of a variable:

```JSX
function Page() {
  return (
    <div>
      <header>
        <nav>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="40px" />
        </nav>
      </header>
      <h1>Fun facts about React</h1>
      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100k stars on GitHub</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
      <footer>
        <small>Ⓒ 2022 KevinLiTian. All rights reserved.</small>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Page />);
```

Notice that by convention, we always name our components starting with a uppercase letter, and when we want to render it, we use format like `<NAME />`

However, notice that we still have a relatively large chunk of HTML code. Maybe we can still improve it somehow, like separate this big component into several small components for even better reusability

```JSX
function Header() {
  return (
    <header>
      <nav>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          width="40px"
        />
      </nav>
    </header>
  );
}

function MainContent() {
  return (
    <div>
      <h1>Fun facts about React</h1>
      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100k stars on GitHub</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <small>Ⓒ 2022 KevinLiTian. All rights reserved.</small>
    </footer>
  );
}

function Page() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Page />);
```

It might seem not necessary since it's such a tiny HTML, but imagine working with a large project, it's convenient if you are able to simply insert a navbar to pages just by rendering your `<Header />` component rather than copy and paste the whole navbar HTML over and over again

Afterwards, you can practice adding `className` to HTML elements in JSX, then select and style them in a CSS file, create your first React website!
