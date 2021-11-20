## Why React hooks was introduced?

`One reason` to introduce hooks was the complexity in dealing with `this` keyword inside class components. If not handled properly, `this` will take some other value. That will result in breaking lines like this.setState() and other event handlers. Using hooks, we avoid that complexity when working with functional components.

`Second reason` is, Class components do not minify very well and also make hot reloading unreliable. That is another inspiration to bring hooks.

`Third reason` is, there is no specific way to reuse stateful component logic. Even though HOC and render props patterns address this problem, that asks for modifying the class component code. Hooks allow to share stateful logic without changing the component hierarchy.

`Fourth reason` is, in a complex class component, related code are scattered in different lifecycle methods. Example, in case of a data fetching, we do that mainly in componentDidMount() and componentDidUpdate(). Another example is, in case of event listeners, we use componentDidMount() to bind an event and componentWil

## How useState hook works? What is/are the arguments accepted by this hook and what is returned by the hook?

`useState` hook is a function which is used to store state value in a functional component. It accepts an argument as the initial value of the state. It returns an array with 2 elements. First element is the current value of state. Second element is a function to update the state
```javascript
import React, { useState } from "react";
// syntax
// const [currentStateValue, functionToUpdateState] = useState(initialStateValue);
 const [count, setCount] = useState(0);

// We can update the state in 2 different ways
const onCountChange=()=>{
  setCount(count+1);
}
const onCountChange=()=>{
  setCount((prevStateCount)=>{
    return prevStateCount + 1
  });
}
```
Updating the object using setState
```javascript
  const [profile, setProfile] = useState({
    name: "Backbencher",
    age: 24,
  });
  const onNameChange = (e) => {
    setProfile({ ...profile, name: e.target.value });
  };
```
## What are the differences in using hooks and class components with respect to state management?
- In class component the state is always an object with properties but in functional it can be anything number, string, boolean, object or array.
- When state variable is an object, setState() in class components automatically merges the new value to the state object. But in case of setter function in useState(), we need to explicitly merge the updated object property using spread operator.
 ```javascript
 // class component state deifination should be always an object
 this.state={
   age:25,
   count:0
 }
 // we can't do like
// this.state=2;
 
// Updating the state
 this.setState({count: this.state.count + 1});
 with above method of updating will automatically merge with previous state properties in it which means above statement is equal to
 this.setState({...this.state, count: this.state.count +1});
 ```
 In functional component
 ```javascript
 const [count, setCount]=useState(0);
 const [profile, setProfile] = useState({
    name: "Backbencher",
    age: 24,
  });
  to update age of the profile we must use spread operator
  setProfile({ ...profile, name: e.target.value });
  ```
  ## What is useEffect and how it works?
useEffect is a hook function which takes two arguments as input: 
  - the first one is a function to call
  - the second one is an array of 'Calling/Dependent objects'. 

This means we can pass a number of objects in that array, and the effect will be applied (or in other words, argument function will be called) only if at least of the values inside an array changes on the next render. E.g. we can pass several values as a second argument:

- No argument at all - useEffect will be called on every render.
- [] - useEffect will be called only at the first render, since empty brackets can never change. this is likely to imitate `componentDidMount`
- [arg1, arg2, … , argN] - useEffect will be called if any of the values inside of an array has changed. likely to be imitate `componentDidUpdate`
- If we return the function inside the useEffect then it will help us to cleanup with is optional. likely to be imitate `componentWillUnmount`
[check this for more details](https://github.com/venk120soft/react-learnings/blob/master/useEffect.md)
## What is useContext and how to use it?
To Overcome the prop drilling issue, Context api provides the support to maintain the props in global so that, we can use the props where ever it is needed
>**Note**: Context api is not needed when you use some state management tool redux/mobx/flux
```javascript
 function ConsumerComponent() {
  const name = useContext(NameContext);
  const age = useContext(AgeContext);

  return (
    <div>
      Name: {name}, Age: {age}
    </div>
  );
}
```
to acheive the samething in class component
```javascript
import { NameContext, AgeContext } from "./ProviderComponent";

export class ConsumerComponent extends Component {
  render() {
    return (
      <NameContext.Consumer>
        {(name) => {
          return (
            <AgeContext.Consumer>
              {(age) => ( 
                <div> Name: {name}, Age: {age} </div>
              )}
            </AgeContext.Consumer>
          );
        }}
      </NameContext.Consumer>
    );
  }
}
 ``` 
  
