# Props

So far we have been hard coding all the HTML contents, which is not reusable and composable, that's generally not the way most companies are doing it. Imagine there's a new movie coming out, it is not possible that there's a dedicated developer sitting and waiting for movies to come out and constantly changing the IMDb website's HTML content

More likely, is that they update the database and the front-end HTML will re-use the reusable components and render with new data. For example

<img width="1281" alt="Screen Shot 2022-08-14 at 2 08 33 PM" src="https://user-images.githubusercontent.com/99038613/184551349-1c386f81-fc99-4f0a-819c-2063deecc7e5.png">

These movies all have the same HTML structure, but with different contents, which means IMDb website most likly is reusing the same component, and render it with different data in the database everytime

As a programmer, a better way of explaining this could be the use of parameters in functions:

```JS
function Add(){
    return 1 + 2;
}

function Add(a, b) {
    return a + b;
}
```

The first function always returns 3, which is OK if we want to see 3 everytime, but in real life, information are dynamic, we generally want to make our code more robust and reusable, to handle all circumstances rather than only one. In the analogy of functions, we add parameters to them, so that they can return the output we desire for any input

## JS in JSX

Our components would be more reusable and composable if they can also have parameter to receive inputs and act depending on the inputs. Fortunately, React allows us to use JavaScript inside of JSX syntax, for example

```JSX
function App() {
    const Firstname = "John";
    const Lastname = "Doe";

    return (
        <h1>
            Hello, {Firstname} {Lastname}, it is currently {new Data().getHours()}
        </h1>

    );
}
```

Notice that with `{}`, we are able to plugin variables into JSX, which acts like parameters of a function. Now with this ability, we can even do more complex logic and dynamically render HTML content based on that logic:

```JS
function App() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours < 12) {
        timeOfDay = "morning";
    }else if (hours >= 12 && hours < 17 ) {
        timeOfDay = "afternoon";
    }else {
        timeOfDay = "night";
    }

    return (
        <h1>Good {timeOfDay}!</h1>
    );
}
```

## Props

This idea can become much more powerful and make our components even more reusable is to open up the ability of our custom components to take in parameters or, **props** (which under the hood is a JavaScript Object), and render the contents accordingly rather than having static components:

```JSX
function Contact(props) {
    return (
        <div>
            <img src={props.img} />
            <h3>{props.name}</h3>
            <p>{props.number}</p>
            <p>{props.email}</p>
        </div>
    )
}

function App() {
    return (
        <div>
            <Contact
                img="some path or url"
                name="Mr. John Doe"
                number="111-111-1111"
                email="johndoe@gmail.com"
            />
            <Contact
                img="some path or url"
                name="Mr. Bob"
                number="222-222-2222"
                email="bob@gmail.com"
            />
            <Contact
                img="some path or url"
                name="Mrs. Wink"
                number="333-333-3333"
                email="wink@gmail.com"
            />
        </div>
    );
}
```

Now our custom component `Contact` becomes super reusable as it can render information given the props we input. It turns out that we don't even have to manually enter all the props, remember that we can plugin JS variables into JSX syntax! Imagine now we have a database that stores all contact information, we can do a `fetch` with JavaScript and get all the data, then plugin them into the props to dynamically render information to the front-end from the database

### Destructuring Props

Another common way you may see props is when it's destructured, where instead of using a single input `props`, the function takes in a JavaScript Obejct, which is really just the under the hood form of props:

```JSX
function App({img, name, number, email}){
    return;
}
```

You can choose which one you prefer, they work exactly the same way

### Prop Types

So far, we have only been passing string type data as props, but since we can write JS in JSX, it's possible to pass any JavaScript data type in as props:

```JSX
<Example
    bool={true}
    int={1}
    complex={[{JO1:"This is JavaScript Object 1"}, {JO2:"This is JavaScript Object 2"}]}
/>
```

## Array Map

JavaScript array prototype has a built-in method called `map`, where each array element will go through a function to generate a new array:

```JS
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]

```

This could be especially useful when it comes to React, since JSX syntax requires elements to have HTML tags, where we can use the `map` function to apply the desired HTML tags as strings to array of data and then pass the processed data as props to render

```JSX
const names = ["alice", "bob", "charlie", "danielle"];
const processed_names = names.map(name => {
    `<h1>${name[0].toUpperCase() + name.slice(1)}</h1>`
});
```

Or we can even do better by creating an array of components

```JSX
const names = ["alice", "bob", "charlie", "danielle"];
const Names = names.map(name => {
    return <Person name={name} />
});

function App() {
    return (
        {Names}
    );
}
```

The biggest benefit of using `map` is that whenever the data changes, our code handles it dynamically without the need to constantly updating our HTML

## Conditional Rendering

A lot of the times HTML will be different based on different conditions. For example, if a user is visiting a profile page and that profile happens to be this very user's own profile, we want to render an edit button, otherwise we don't want to render this button to give others the ability to modify this profile

Since we are using React, which is just JavaScript, we have the ability to do logic like any other programming languages (HTML & CSS are not programming languages!)

We can achieve this by using some logic expression:

```JSX
function App() {
    const condition = false;
    return(
        {condition === true && <h1>Render this!<h1/>}
    );
}
```

Logical AND (`&&`) requires both conditions to be true so that the joint is true, so if the first condition is already false, the program will not bother to check the second condition and move on, and that's the hack here. We put the condition we want to be true when rendering as the first condition, if this condition is false, the program will skip the latter condition, where we put the element we want to render

Take a minute to understand this process and be sure to know how this hack works

Check an example of an [airbnb experience clone](./airbnb/) that uses props and data mapping
