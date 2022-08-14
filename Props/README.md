# Props

So far we have been hard coding all the HTML contents, which is not reusable and composable, that's generally not the way most companies are doing it. Imagine there's a new movie coming out, it is not possible that there's a dedicated developer sitting and waiting for movies to come out and constantly changing the IMDb website's HTML content

More likely, is that they update the database and the front-end HTML will re-use the reusable components and render with new data. For example

Figure 1

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
