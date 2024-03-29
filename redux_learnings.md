# Redux Learnings:
## Redux flow in short (TODO: Update it as per better understandings)
When user clicks on any components on the UI, action invoke changes and dispatch to the store with the new value, store will inform the reducers about the new value and the action triggered. 
- Then the respective Reducer will be called with the action and the new value.
- Reducers will update the state of an application 
- Updated state get notified to the component which in turn re render the component with new state changes
[better explanantion from official redux site](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
![Redux flow diagram](/images/reduxdataflowdiagram.gif)


## Redux Core concept
- Intuitive state container with a single source of truth
- The state in the store is immutable
- Reducers are employed to update state
- Actions invoke changes to the store

[redux vs mobx which is right for you](https://www.tabnine.com/blog/redux-vs-mobx/)

## In react can we manage the state with out redux? When to use Redux?
Yes, we can manage the state in react without redux also. But as the application grows vertically, managing the state becomes tedious job.
We can do it by passing props down to child component updating the state using function in props.

For brief explanation [more info](https://www.robinwieruch.de/react-global-state-without-redux)

## Limitations of redux?
Good Resources to understand:
* https://www.robinwieruch.de/react-global-state-without-redux
* https://redux.js.org/basics/reducers
* https://egghead.io/lessons/javascript-redux-supplying-the-initial-state
* https://github.com/tayiorbeii/egghead.io_redux_course_notes

Redux is sate management tool, that does the state management for react apps.
Redux follows uni directional data flow as react. so its good to use redux with react.

Starting Point:

```javascript
const stroe = createStore(rootReducers);

render(<Provider store={store}>
    <App/>
    </Provider>,
    document.getElementById('root')
);

// Here rootReducers can be combined of multiple Reducers.

const rootReducers= combineReducers({
todos,
visibilityFilter
});

export default rootReducer;

// reducers are atonomous, so each reducer will pass its own state initially

const todos=(state=[], action)=>{
switch(action.type){
  case 'Add_TODO':
    return [
      ...state,
      todo(undefined,action)
    ];
  case 'Toggle_TODO':
    return state.map(t=>
      todo(t,action)
    );
  default:
    return state;
}
};

const visibilityFiler = (state = 'Show_All', action) => {
    switch(action.type){
      case 'Set_Visibile_Filter':
        return action.filter;
      default:
        return state;    
    }
}

// With this the rootReducers intial state will be overridden by the persistedState
// In Persistant state we have defined todos only, so in tootReducers the todos will replaced by the persistant state
// and visibility filter show as in rootReducer(visibility Filter) defines.
// and also note that as we are not passing the actions from here for the respective reducer it will hit the default(bcz actions are undefined)
const persistedState={
  todos: [{
    id:'0',
    text:'Welcome',
    completed: false,
  }],
};
const stroe =createStore(rootReducers, persistedState);

```
In Redux, We have single store for maintaining all the application state. Actions are the only source to Store. 
When We create the store the intial state of the store is determined by the root reducer

When ever something happend or some event triggerd we should dispacth the action to the Store.
All it does is it will send the payload to the store, actions should be uniq, so we name them using string constants examples for actionCreators.

Action Creators are regular  javascript functions, we can define however we want like arrow functions also
Some of Examples of Actions:

```javascript
// Actions constants
const myActions={
    apiStarted:"apiStarted",
    isFetchingItmes:"isFetchingItmes",
    refreshDataRecords:"refreshDataRecords",
    loadingError:"loadingError",
    dataRequests:"dataRequests"
}

export const getDataRequestssAction = (
  items: IImmutableList<IImmutableMap<DataRequestsSchema>>
) => {
  return {
    type: myActions.dataRequests,
    payload: items
  };
};

export const myApiStartedAction = (
  searchTerm: string,
  selectedFilter: string,
  resetDataRecordsList: boolean
) => {
  return {
    type: myActions.apiStarted,
    payload: {
      searchTerm: searchTerm,
      selectedFilter: selectedFilter,
      resetDataRecordsList: resetDataRecordsList
    }
  };
};

export const setIsFetchingItemsAction = (isFetching: boolean) => {
  return {
    type: myActions.isFetchingItmes,
    payload: isFetching
  };
};

export const refreshDataRecordsAction = () => {
  return {
    type: myActions.refreshDataRecords
  };
};

const dataRecordsErrorAction = (error: Error) => {
  return {
    type: myActions.loadingError,
    payload: error,
    error: true
  };
};

// Writing the data fetching logic in action calling an api to get the data
// When we calling this, 
export const dispatchSetDataRequestsAction = (
  searchTerm: string = '',
  selectedFilterName: string = ''
) => {
  return async (dispatch: MDispatch) => {
    try {
      // this is to set the selected filter to highlight
      dispatch(myApiStartedAction('', selectedFilterName, false));
      dispatch(refreshDataRecordsAction());
      dispatch(setIsFetchingItemsAction(true));
      // data fetching from an api
      const data = await getDataRequests(searchTerm, selectedFilterName);
      if (data !== null) {
        const newDataRequests = data.get('MyDataAccessRequests');// MyDataAccessRequests are the property in ap response
        dispatch(getDataRequestssAction(newDataRequests));
      }
      dispatch(setIsFetchingItemsAction(false));
    } catch (err) {
      dispatch(setIsFetchingItemsAction(false));
      dispatch(dataRecordsErrorAction(err));
    }
  };
};

// Other way of declaring action creators
// No Need to use Return statement
// while not using the return statement we should replace block expression( {} ) to object expression ( () )
// i.e change curly braces to paranthesis that means we are o
export const sampleAction=()=>({ // here added (
      type:"SampleAction",
      id: (nextId++).toString()
  });// here added )

export const sampleAction1=(text)=>({
      type:"SampleAction1",
      id: (nextId++).toString(),
      text
  });

export const sampleAction2=(text)=>({
      type:"SampleAction2",
      text
});

export const mapStateToProps=(state, props)=>({
  active:props.filter === state.visibilityFilter
});

export const mapDispatchToProps=(dispatch, props)=>{
return {
  onClick:()=>{
    dipatch(setVisibilityFilter(props.filter));
    }
    }
};

export const mapDispatchToProps=(dispatch, props)=>({
  onClick:()=>{
    dipatch(setVisibilityFilter(props.filter));
    }
});

export const mapDispatchToProps=(dispatch, props)=>({
  onClick(){
    dipatch(setVisibilityFilter(props.filter));
    }
});
```
Once the action dipatches, store will receive the state and new props, Then store will pass the prev state and props to the reducer. 
Reducer will return the new state with the props passed.

Examples for the Reducers:
==========================
