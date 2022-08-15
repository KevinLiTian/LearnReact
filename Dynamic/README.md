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
        setItemArray(prevState => [...prevState, newItem]);
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
setItemArray([...itemArray, newItem]);
setItemArray([...itemArray, prevArray.length]);
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

setContact({
    ...contact,
    phone: "222-222-2222"
});
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
