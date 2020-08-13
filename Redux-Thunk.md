# [Redux-Thunk Overview](https://github.com/reduxjs/redux-thunk)

## What is thunk?

A thunk is a function that wraps an expression to delay its evaluation. Redux thunk is a middileware for redux.

## Why redux-thunk? as we already have Redux?

With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. 
Middleware extends the store's abilities, and lets you write async logic that interacts with the store.

```javascript
// calculation of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
let foo = () => 1 + 2;
```
## How do you access the global state in react while using redux?
By Calling reducer's state on the getState() method.
```javascript
return (dispatch, getState) => {
  const token= getState().tokenReducer.token
}
```
