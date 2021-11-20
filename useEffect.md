[Best Resources to Understand by Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)

> ***Note:***
> If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
```javascript
const [count, setCount]=useState(0);
useEffect(()=>{
  // add your api fetching logic or update state for the reference
}, [dependency array]);
```

useEffect is a hook function which takes two arguments as input: 
  - the first one is a function to call
  - the second one is an array of 'Calling/Dependent objects'. 

This means we can pass a number of objects in that array, and the effect will be applied (or in other words, argument function will be called) only if at least of the values inside an array changes on the next render. E.g. we can pass several values as a second argument:

- No argument at all - useEffect will be called on every render.
- [] - useEffect will be called only at the first render, since empty brackets can never change. this is likely to imitate `componentDidMount`
- [arg1, arg2, … , argN] - useEffect will be called if any of the values inside of an array has changed. likely to be imitate `componentDidUpdate`
- If we return the function inside the useEffect then it will help us to cleanup with is optional. likely to be imitate `componentWillUnmount`

Examples:
```javascript
const [count, setCount]=useState(0);

useEffect(()=>{
  setCount(count+1);
}); // This will be called all the time o/p 1,2,3,.... 

Reason: functional component is stateless component hence any changes to the state the whole component gets re renderd, to avoid this, we can pass an empty array as dependency 
so that it will only at first run. 

useEffect(()=>{
setCount(count+1);
}, []); // This will only be called after first render o/p: 1. this is likely componentDidMount

useEffect(()=>{
  setCount(count+1);
}, [count]); // This will be called when ever count is changed o/p 1,2,3,.... 
it means we can call this as componentDidUpdate which will be called up on updates to the depependency objects
```
For cleanup we just need to return the function inside the useEffect

```javascript
useEffect(() => {
  window.addEventListener("mousemove", handleMousePosition);
  //cleanup
  return () => {
    window.removeEventListener("mousemove", handleMousePosition);
  };
}, []);
```
