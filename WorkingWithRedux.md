[Difference b/w Redux & Mobex. which one to choose](https://www.tabnine.com/blog/redux-vs-mobx/)
# Working with Redux
### Wht is Redux? Why Redux with React?
Redux is a state management tool.
1) React is awesome but dependency between the components are hard to manage, If we have multiple components communicating with each other
while passing the props from parent to child for some events we pass the call backs from child to parent in these type of scenarios the code is getting complicated 
2) Complex UI requires many states, Asynchronus behaviour of the state is makes the app hard to predict

In production we will have lots of components and states so if we can use redux this will overcome this issue
1) Single source of truth
2) State of the app in redux is read only (which we use it as props in react)
3) Changes are made with pure functions

Redux is simplified implementation of flux, redux is a state container
Based on the actions dispatched to the store, it is calling the respective reducer function(which takes the state and action from dispatcher function) and return the new state to the store.

Initially read the state from store. once user performed some action on view, we dispatch action to the store 
(as the state is already map to props with mapStateToProps the state will be updated at the same time to store
Then based on action dispatched, reducer takes the new state from store and do the manipulations based on action return the new state to the store)

Dispatcher(action) => store => reducer(state, action) => new state sent to store

How to link the react with redux?
We use Heigher Order Component called connect from react-redux library which takes mapStateToProps and mapDispatchToProps as arguments and component as in function
```javascript
export default connect(mapStateToProps, mapDispatchToProps)(YourComponent)
```
**Explanation:**
The above line of code is refers HOC wich is accepting YourComponent as component and returns new component by maping the local state to Props and dipatch the state to the store

#### Managing the state with Redux:

Setting up the Redux One Store.

Redux helps to maintain the state for the components. The data flow in redux is One way only

In Redux architecture we have 3 main areas store, actions, reducers, in the solution src folder we need:

1) Actions
2) Reducers
3) Components

## Actions:
Actions are simple javascript Objects, which is having type(mandidate), payload(Optional), Error(Optional) as a properties in it.
type should be plane string which refers to the events/actions performed on the view.
payload can be any data that is carrying while the action is performed.
error can be any data that is carrying while the action is performed.

counterActions.js
```javascript
export const INCREAMENT = "INCREMENT";
export const DECREAMENT = "DEREMENT";
export const incrementCount = {
  type: INCREMENT
};
export const decrementCount = {
  type: DECREMENT
}
```
## Reducers:
Reducers are pure functions, which takes intial state and the action performed on the view and return the new state to the store.
Pure functions will alway return same output for the same inputs and which will not effect to any global variables

counterReducer.js
```javascript
import {INCREAMENT, DECREAMENT} from '../Actions/counterActions';

export counterReducer =(state=20,event){
  switch(event.type){
    case INCREMENT:
      return state+=1;
    case DECREMENT:
      return state+=1;
    default:
      return state;
  }
}
```
// Now, If we have plenty of reducers defined, then we should combine them into single reducer by providing them a key to each reducer

applicationReducer.js
```javascript
import combineReducer from 'redux'; 
import {counterReducer} from './counterReducer';

export applicationReducer= combineReducer({
  CounterReducer: counterReducer,
  // other reducers with user defined keys
  // ex: MyXYZname: myReducer
  })
```
// now lets register them in to store
store.js
```javascript
import createStore from 'redux';
import applicationReducer from './applicationReducer';

export default const store = createStore(applicationReducer);
```
// Now the store has been created, need to subcribe the root element to store so that any change is happening will be reflected on UI

In index.js
```javascript
import store from './store';

const render =() => ReactDOM.render(<App />, document.getElementById('root'));
render(); // for rendering the web page

// Registering with the store
store.subscribe(render);
```
// Using The Store in components
## Components:
