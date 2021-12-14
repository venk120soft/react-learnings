Better explanation for the difference between Functional component vs Class Components
https://overreacted.io/how-are-function-components-different-from-classes/

state is Mutable(we can change), and props are Immutable(we can't change)

Class components are Mutated or statefull components when ever any change in state, the entire component get's re render with the Mutated(changed) state Value.

Class components has render method and JSX to define the component and it should extend React.Component it has lifecycle methods to handle in differnt stages of an application.

Functional components are stateless components it has hooks to handle different stages of an application. it is immutable. This will help improve the performance a lot with pure functions. 
#### But how?
Pure functions will always give same o/p for the same input hence, if we call the pure function multiple times with same input, it won't execute every time. Instead it will keep the result in Browser memory (may be from event loop tasks) and fetch the result on sub sequent calls.
