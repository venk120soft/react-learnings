Better explanation for the difference between Functional component vs Class Components
[Function vs Class component](https://overreacted.io/how-are-function-components-different-from-classes/) | [Demo](
https://codesandbox.io/s/pjqnl16lm7)

state is Mutable(we can change), and props are Immutable(we can't change)

Class components are Mutated or statefull components when ever any change in state, the entire component get's re render with the Mutated(changed) state Value.

In Class components we use **this** keyword to access the **state, props and functions**, that we declare inside the class component. **this** is poining to the current object which may result in getting the wrong results  in case of any state updates. Due to the complexity in dealing with **this** keyword inside class components, if it's not handled properly, it will take some other value. That will result in ending up showing wrong values This [demo](https://codesandbox.io/s/pjqnl16lm7) will help us to understand why we go for functional components. [more info](https://overreacted.io/how-are-function-components-different-from-classes/) 

Class components has render method and JSX to define the component and it should extend React.Component it has lifecycle methods to handle in differnt stages of an application.

Functional components are stateless components it has hooks to handle different stages of an application. it is immutable. This will help improve the performance a lot with pure functions. 
#### But how?
Pure functions will always give same o/p for the same input hence, if we call the pure function multiple times with same input, it won't execute every time. Instead it will keep the result in Browser memory (may be from event loop tasks) and fetch the result on sub sequent calls.

## In Simple words:
Class Components:
- Class components are Mutated or statefull components
- Class components has render method and JSX to define the component 
- Class components should extend React.Component it has lifecycle methods to handle in differnt stages of an application.
- Class component uses **this** keyword to access state,props, functions define inside. Check this [Demo](https://codesandbox.io/s/pjqnl16lm7)

Functional Components:
- Functional components are having hooks to handle the state
- Functional components are Immutable or stateless
- It handles the state and props better than class component as we don't use **this** keyword to access the elements
- These acts like a pure component
