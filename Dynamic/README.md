# Dynamic

So far we have been dealing with static webpages, though we can dynamically render components based on parameters or, props, we haven't really have a dynamic website where users can interact with the webpage

In vanilla JavaScript, we have the ability to add event listeners to respond to user interactions with our webpage such as clicking, changing, etc. It can be done in two ways:

```JS
const element = document.getElementById('root');
element.addEventListener('click', function());
element.onchange = function ();
```

Or

```HTML
<div id="root" onclick="function()"></div>
```

## React EventListeners

In React, it's very similar to the second method to add event listeners to JSX elements. For example, if we want to listen to "click" events, we can:

```JSX
function HandleClick(){
    alert("Clicked");
}

<button onClick={HandleClick}>Click Here!</button>
```

We also use `onclick`, but with camelCase convention like `onClick`

### State

Check the following code snippet, can you find out what's wrong:

```JSX
function App() {
    const itemArray = ["<p>Item1</p>", "<p>Item2</p>"];

    function addItem() {
        const newItem = `<p>Item ${itemArray.length + 1}</p>`;
        itemArray.push(newItem);
        console.log(itemArray);
    }

    return (
        <button onClick={addItem}>Add Item</button>
        {itemArray}
    );
}
```

Everytime we click the button, through the console we can see it logs arrays with new items added, but the webpage stays static, it doesn't re-render the updated variable `itemArray`, why is that?

It is because of the way React monitors variables, React doesn't monitor normal variables, it only monitors something called `state`

React has some hooks, or built-in functions we can use to fully utilize the power of React, one of them is `useState`:

```JSX
function App() {
    const [itemArray, setItemArray] = React.useState(["<p>Item1</p>", "<p>Item2</p>"]);

    function addItem() {
        const newItem = `<p>Item ${itemArray.length + 1}</p>`;
        setItemArray(prevState => (
            [...prevState, newItem]
        ));
    }

    return (
        <button onClick={addItem}>Add Item</button>
        {itemArray}
    );
}
```

Instead of updating variables like in vanilla JavaScript, we want to use `useState` to control dynamic variables so that React will constantly monitor it and update the front-end when state changes

### Props | States

Since props and states are both JavaScript variables being passed into JSX elements, it can sometimes be confusing what's the difference. Think of props as hyperparameters that are used to configure a components and it not meant to be changed within the component. In a "function" analogy, we don't want to change the hyperparameters that are passed in:

```JS
function Add(a, b){
    a = 43; // Changing the hyperparameter
    return a + b;
}
```

Props are similar, they are passed in to a components as "immutable" properties

Whereas states are meant to be dynamic and changing constantly, which means it's "mutable" and we want React to monitor its change, so whenever you need to dynamically changing some variable, `useState` would be your friend

### useState

How do we `useState` hook of React exactly? A better question would be, what is `useState`? This React hook takes in a parameter as the initial state, which is just like declaring a variable, but just pass that variable as the input to `useState`. It returns an array of two elements, the first is the state itself, and the second is a function to change that state:

```JSX
const [state, setState] = React.useState("Hello");
console.log(state); // "Hello"
console.log(setState); // func()
```

Note that we can name the two array elements whatever we want

When you want to change the state, never directly use the `state` variable, rather, we should use the second element in the array, the function you gave name to, to update the state

```JSX
setState("Goodbye");
console.log(state); // "Goodbye"
```

If the new state depends on the previous state, we can use the current state as the input to the `set` function:

```JSX
const [count, setCount] = React.useState(0);
setCount(count + 1);
```

Note that we can't write `count++` or `count+=1` since this is changing the state directly, we want to change state using the `set` function

What if the new state adds on the previous state, for example push an item into an array? ES6 introduces an easy way to achieve this by using the spread operator `...`

```JSX
const [itemArray, setItemArray] = React.useState([]);
const newItem = 0;
setItemArray(prevArray => (
    [...prevArray, newItem]
));

setItemArray(prevArray => (
    [...prevArray, prevArray.length]
));
```

The spread operator spreads the previous array elements, then we add a `newItem` to the end of the array. Why can't we just use `array.push()`? That's because `push` method changes the original state directly, which we don't want since we only want to use `setItemArray` function to change states; also, `push` method doesn't return the new array, we want a new array as the input to the `setItemArray` function

The spread operator can also be used when we use an object as state:

```JSX
const [contact, setContact] = React.useState({
    firstname: "John",
    lastname: "Doe",
    phone: "111-111-1111",
    email: "johndoe@gmail.com"
});

setContact(prevContact => ({
    ...prevContact,
    phone: "222-222-2222"
}));
```

We use `...` to spread all information of the previous state to a new object, then changing the "phone" property only. If we don't use `...contact` and only write the phone property, then the phone property would be the only thing left in the new state

## Custom Component Event Listener

We mentioned that in React, we add event listeners to JSX elements by adding HTML-attribute-like syntax in camelCase, but if you think about this:

```JSX
function Custom(props) {
    return (
        <h1>{props.title}</h1>
    );
}

const [title, setTitle] = React.useState("Hello");

function handleClick() {
    setTitle("Goodbye");
}

function App() {
    return (
        <Custom title={title} onClick={handleClick} />
    );
}
```

We add an `onClick` to the `Custom` component. Recall that when we add attribute to custom components, they are passed in as `props`, so `onClick` here is not an event listener anymore, but a parameter

How do we fix that? Now clicking the custom components does nothing but we want it to change the title from "Hello" to "Goodbye". The solution is to pass the `handleClick` function as a `prop` to the custom component and then use `onClick` property on a plane JSX element inside of the custom component:

```JSX
function Custom(props) {
    return (
        <h1 onClick={props.click}>{props.title}</h1>
        // Which translates to <h1 onClick={handleClick}>
    );
}

function App() {
    return (
        <Custom title={title} click={handleClick} />
    );
}
```

What if we want to pass in a parameter to the `handleClick` function from the `Custom` component? Does this work?

```JSX
function Custom(props) {
    const name = "Hello";
    return (
        <h1 onClick={props.click(name)}>{props.title}</h1>
        // Which translates to <h1 onClick={handleClick}>
    );
}

function handleClick(name) {
    alert(name);
}
```

It doesn't, since we are setting up an event handler, and event handler should be a function, not calling a function. By passing a name directly into the function is the same as calling the function. What we can do is use a custom call back function:

```JSX
<h1 onClick={() => props.click(name)}>{props.title}</h1>
```

Check [box](./box/) for an example project

## Dynamic Style

React also gives us the ability to write CSS in JavaScript:

```JSX
const style = {
    backgroundColor: "black";
    borderRadius: "10px"
};

function App() {
    return (
        <h1 style={style}>Hello</h1>
    );
}
```

## React Form

In vanilla JS with HTML forms, we add event handler to forms like `onsubmit`, but in React, we do it with states since React will only monitor state changes

```JSX
function Form() {
    const [firstName, setFirstName] = React.useState("");

    function handleChange(event) {
        setFirstName(event.target.value);
    }

    return (
        <form>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                value={firstName}
            />
        </form>
    );
}
```

Notice that there's an `event` parameter passed into the handler function we didn't have any input really at the `onChange` property, this is because any event listener will automatically gets an `event` input

We are constantly monitor any change to the input and set the state accordingly. However, as you may imagine, if there are 50 input boxes, we are going to need 50 states and a handle function for each one of them, which isn't the best design. Therefore, we can store them all in an form state object and use an additional `name` property to identify which field has changed:

```JSX
function Form() {
    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    function handleChange(event) {
        setForm(prevForm => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
    }

    <form>
        <input
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            name="firstName"
            value={form.firstName}
        />
        <input
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            name="lastName"
            value={form.lastName}
        />
        ...
        ...
    </form>
}
```

### Textarea

`textarea` in HTML has both the opening and the closing tag, the React team has modified that in JSX so that it is more similar to the `input` element so we can have a better experience using it

```JSX
// HTML
<textarea></textarea>

// JSX
<textarea />
```

### Checkbox

`checkbox` is an `input` with type of `checkbox` that holds a boolean value of whether the user has checked the box or not

```JSX
<input type="checkbox" />
```

And for the handler of `checkbox`, we will no longer be checking the `event.target.value` but rather `event.target.checked` property

### Radio

For radio buttons, we give all radio set the same name, then specify the value we want them to take on when selected

```JSX
<input
    type="radio"
    id="unemployed"
    name="employment"
    value="unemployed"
/>
<label htmlFor="unemployed">Unemployed</label>

<input
    type="radio"
    id="part-time"
    name="employment"
    value="part-time"
/>
<label htmlFor="part-time">Part-time</label>

<input
    type="radio"
    id="full-time"
    name="employment"
    value="full-time"
/>
<label htmlFor="full-time">Full-time</label>
```

### Submit

After gathering information, we need a button to submit the information. We can do this either by using an `input` with type `submit` or a plain `button`. Why `button` also works? Because it is found inside of a form, so the button automatically gets the type of `submit`, if you don't want the button to act like `submit`, you need to manually define its type to `button`

```JSX
<form>
    <input type="submit" value="Submit" />
    <button>Submit</button>
</form>
```

By default, when the form is submitted, the page will be refreshed, or go to the `action` URL with `method` specified. But we want to bypass that since we don't want to submit the information anywhere, we can add an `onsubmit` handler to the form, and the good thing we are keeping all information in an form data object, we can simply pass the entire object in the handler function to an API or do anything else with the data:

```JSX
function handleSubmit(event) {
    event.preventDefault();
    console.log(form)
}

<form onSubmit={handleSubmit}>
    <input type="submit" value="Submit" />
    <button>Submit</button>
</form>
```

## API

An important ability of JavaScript is that it can fetch data from APIs or submit data to APIs. Take a look at an example:

```JSX
function App() {
    const [starWarsData, setStarWarsData] = React.useState({})

    console.log("Component rendered")

    fetch("https://swapi.dev/api/people/1")
        .then(res => res.json())
        .then(data => setStarWarsData(data))

    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}
```

At first glance, this code snippet looks OK, but there's an under the hood mechanics that is messing things up. React monitors states, and when states changes, the components with that state will be re-rendered so that the front-end will follow the state. Try to track the above code snippet, when fetch completes, it changes the state with fetched data, then since state changed, this whole `App` component will be re-rendered since it contains the state, so the `App` function will be called again. Then again, the fetch function will be called... You'll find out it's an infinite loop!

This is defined as side effects in React, and we'll see how to handle them

### Side Effect

What are side effects in React? They are things that React cannot handle on its own since they are out of the scope. Some common side effects are:

- localStorage
- API/Database Interaction
- Web Sockets
- ... anything that React isn't in charge of

### useEffect

React provides us a lot of hooks, one we've seen and used is `useState` which gives us the ability to add to and modify React internal states. There's another useful hook that will be used whenever React interacts with anything outside of React, or side effects. It allows us to specify when do we want something to run, see the following example:

```JSX
function App() {
    const [starWarsData, setStarWarsData] = React.useState({})

    React.useEffect(() => {
        fetch("https://swapi.dev/api/people/1")
        .then(res => res.json())
        .then(data => setStarWarsData(data))
    }, []);

    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}
```

`useEffect` accepts two inputs, the first is a function to run and the second is called a "dependencies array". If we don't pass the second input, there's basically no difference between whether we use `useEffect` or not

- **Note**: If we don't pass the second parameter, the only difference is that the first parameter (the function) will run after the return statement, or, after everything has been rendered to the DOM

If we pass in an empty array like in the example above, we basically tells React only to run the function in `useEffect` the first time it renders this component

Otherwise, if we pass the dependencies array with variables inside of it, the function within `useEffect` will only run when any of the variables in the dependencies array changes comparing to the last render

See the following example where the `fetch` API is only called when state `count` changes, which is controlled by a button

```JSX
function App() {
    const [starWarsData, setStarWarsData] = React.useState({})
    const [count, setCount] = React.useState(1)

    React.useEffect(function() {
        console.log("Effect ran")
        fetch(`https://swapi.dev/api/people/${count}`)
            .then(res => res.json())
            .then(data => setStarWarsData(data))
    }, [count])

    return (
        <div>
            <h2>The count is {count}</h2>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Get Next Character</button>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}
```

### useEffect Cleanup

As we are dealing with side effects, interacting with interfaces outside of React, we want to have a method of cleaning up to avoid "memory leak". The following code snippet demonstrates a memory leak:

```JSX
function WindowTracker() {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
        function watchWidth() {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", watchWidth)
    }, [])

    return (
        <h1>Window width: {windowWidth}</h1>
    )
}

function App() {
    const [show, setShow] = React.useState(true)

    function toggle() {
        setShow(prevShow => !prevShow)
    }

    return (
        <div className="container">
            <button onClick={toggle}>
                Toggle WindowTracker
            </button>
            {show && <WindowTracker />}
        </div>
    );
}
```

The above code basically dynamically renders the window width by adding an event listener to window resize event. Now if in the `App`, we click the button and toggle of the `WindowTracker` component by using conditional rendering, this component is being removed from the DOM, thus its states are removed. However, the window resize event listener is still registered on the window, it will try to set the state that is already removed which causes a memory leak

We can add a return function to `useEffect` as a clean up function that runs when the component is removed:

```JSX
React.useEffect(() => {
    function watchWidth() {
        console.log("Setting up...")
        setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", watchWidth)

    return function() {
        console.log("Cleaning up...")
        window.removeEventListener("resize", watchWidth)
    }
}, [])
```

Check a [Meme Generator](./meme/) application that utilizes all the mentioned concepts
