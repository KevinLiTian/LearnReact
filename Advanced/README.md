# Advanced

Congratulations for making it here! We have finished learning all basic React, now we can dive into practicing and more advanced React

## Local Storage

So farm everytime we refresh our app, the content re-initializes to the initial state. But sometimes we don't want that, for instance, if we are taking notes, we don't want them to disappear the next time we open the notes app

Our browsers actually have a storage area that we can access and use with JavaScript, which is called `localStorage`. It stores data using key value pairs much like JavaScript objects or Python dictionaries

```JS
// Store data
const data = [1, 2, 3, 4, 5];
localStorage.setItem("key", data);

// Retrive data using the specific key
const data = localStorage.getItem("key");
```

We can use `localStorage` to store information so that the next time we open up the app, it will retain some information from last time. In React, we can set state using `localStorage`:

```JSX
const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem("data")) || []
);

setData([1, 2, 3, 4, 5]);

React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data))
}, [data]);
```

The above code basically means if there's data in the `localStorage`, we use the existing data as the initial state, otherwise we use empty array as initial state

## Lazy State Initialization

This is an optimization technique to get better performance. Recall that so far we've been initializing state using normal `useState` hook with a value as input just like declaring a variable:

```JSX
function Component() {
    const [data, setData] = React.useState("Hello");

    return (
        <h1>{data}</h1>
    );
}
```

But there's a downside to initializing state like this, re call that whenever state changes, components that renders this state gets re-rendered, their functions will run again, so the state initialization will run again despite the state is already initialized. This will not cauze problems, but imagine if the state initialization isn't only a string, but a huge object, that will be computationally expensive to initialize again

Therefore, we want a way to only initialize the state the first time the component is rendered. We can achieve this by using "lazy state initialization" which basically just pass a callback function into the `useState` hook instead of a direct value:

```JSX
function Component() {
    const [data, setData] = React.useState(() => "Hello");

    return (
        <h1>{data}</h1>
    );
}
```

This might not seem much big of a deal, but under the hood, we free up lots of computation power, so that our app will be more "reactive"

## Practice!

We have almost reach the end! Now it's the time to flex your React skills by building two game!

Checkout the updated [React Facts](./my-app/) website by running `npm start` in that directory to see the effect of switching between light mode and dark mode! Try to use states and conditional rendering to complete it yourself!

Checkout [tenzies](./tenzies/) game by running `npm start` in that directory, play the game and when doing that try to think how to build it with React from scratch, what components do you need? What states do you need? After you have an idea, try to build it yourself! Hint: `useEffect` can be used to check for win condition. The winning animation can be applied by first installing "react-confetti" using the command:

```sh
npm install react-confetti
```

Then render `<Confetti />` component in the DOM

If you encounter any difficulties along the way, try to figure it out or search google for a specific technical difficulty. If you really cannot find a way, check the source code of the two projects!
