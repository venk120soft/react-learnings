https://www.accelebrate.com/blog/the-real-benefits-of-the-virtual-dom-in-react-js/

React is an open source Javascript library used to develop User Interface. It was developed on 2009 by facebook developer, Introduced by facebook on May 2013. It was open sourced in March 2015. 
React is concerned with the components that utilizes the expressiveness of javascript with a Html- like template syntax.

It is basically a view in the MVC

The React has 3 Main aspects or advantanges.
1) Virtual DOM: Virtual DOM works in 3 simple steps.
    - Whenever any underlying data changes the entire UI is re-rendered in the virtual DOM representation
    - The difference between previous DOM representation and new one is calculated. 
    - once the calculations are done Real DOM is updated with only the things that have been changed. its like a patch, patches are applied to the affected area.

    With this we can make sure that no memory wastage by avoiding loading entire page.

2) One way Data binding
3) Client and Serverside rendering

JSX: JSX stands for javascript xml.
Javascript + Html = JSX (used by React JS to show UI)

```
var MyComponent=React.createClass({
    render : function(){
    return (
        <h1>Hello World</h1>
    );
}})
```
When ever you want to work with multiple tags that should be enclosed with the single tag
```
//Using Nested elements
//The below code throws an error
var MyComponent=React.createClass({
    render : function(){
    return (
        <h1>Hello World</h1>
        <h2>Hay this is another tag</h2>
    );
}})

//The below code works fine. 
var MyComponent=React.createClass({
render : function(){
    return (
        <div>
            <h1>Hello World</h1>
            <h2>Hay this is another tag</h2>
        </div>
    );
}})

//Specifying attributes
var style1={color:red};
var style2={color:yellow};
var MyComponent=React.createClass({
render : function(){
    return (
        <div style="style1">
            <h1 style="style2">Hello World</h1>
            <h2>Hay this is another tag</h2>
        </div>
    );
}})

//Adding javascript expressions inside the tags
var MyComponent=React.createClass({
render : function(){
    return (
        <div>
            <h1>Hello World</h1>
            <h2>The sum is {2+5}</h2>
        </div>
    );
}})
```
Components:
===========
1) Everything in react js is a component.
2) Each component return a DOM object.
3) It splits the Ui into independent reusable pieces
4) Each Independent piece is processed separately
5) It can refer other components in output
6) it can further split into smaller components.

There are 2 types of components we have 
1) stateful : These components will Rememeber everything it does and it can change states.
  it contains knowledge of paste, present and possible future state changes
  it receives information from the stateless componennts if state change is required.
  
2) stateless: Doesnot remember anything it does.
  These are also called dumb components, it never changes the state.
```
var Header=React.createClass({
render : function(){
    return (
        <h1>This is Header</h1>
    );
}})

var Footer=React.createClass({
render : function(){
    return (
        <h1>This is footer</h1>
    );
}})

var MyComponent=React.createClass({
render : function(){
    return (
        <div>
            <Header/>
            <h1>Hello World</h1>
            <h2>The sum is {2+5}</h2>
            <Footer/>
        </div>
    );
}})
```
Props:
======
Props are readonly components 
whether components are declared as function or class it must never change it props.
such components are called pure functions
```
function sum(x,y){
    return x+y;
}
```
All React components must act like pure functions with respect to their props
```
var Header=React.createClass({
render : function(){
    return (
        <div>
            <h1> Hello {This.props.name} </h1>
            <h1>This is Header</h1>
        </div>
    );
}})
var MyComponent=React.createClass({
render : function(){
    return (
        <div>
            <Header name="Venkatesh"/>
            <h1>Hello World</h1>
            <h2>The sum is {2+5}</h2>
            <Footer/>
        </div>
    );
}})

o/p> hello Venkatesh
this is header
hello world
the sum is 7
```

States:
=======
States are the core of react components or heart of the react components.
Which creates dynamic and interactive components.
```
var Footer=React.createClass({
//setting the state.
getInitialState:function(){
    return {
        user:"Venkatesh",
        id:101
    }
},
render : function(){
//changing the state after 5 seconds
setTimeout(()=> { this.setState({user:"swathi",id:201})} , 5000)
//reading the state
    return (
        <div>
            <h2>the user is {this.state.user} <br/>
            the ID is {this.state.ID}
            </h2>
            <h1>This is footer</h1>
        </div
    );
}})
```
============================================================================================================================
//Life Cycle of the components.
We have 4 stages
Intial Phase
Updating Phase
Props change Phase
Unmounting Phase

In Intial Phase
 getDefaultProps()
    This method called before component is created and allowed to specify the default values of this.props
 getIntialState()
    This method called before component is created and allowed to specify the default values of this.state
 componentWillMount()
  If you try to set the state here your component wont re render
 render()
  Every component must have this method.This method is responsible for returning single root html node
  this single root may have many child nodes.
  if you wish to render nothing then we can return null or false.
componentDidMount()
  This method will called immediatly after component rendered and Placed in DOM at this point we can query any dom operations.
  In this method we can call api to fetch data componentDidMount based on the data we fetch UI gets updated
  
Note: Except render method all the methods are called only once.

Updating Phase:
shouldComponentUpdate()
  if it returns true then only the component will update else it will skip the updating part
componentWillUpdate()
  this method gets called, just before the component is about to Update. we cant set the state here.
render()
  
ComponentDidUpdate()
    This will be called aftrer component rendered. In this method we can call api to fetch data componentDidMount
PropsChangePhase:
  componentsWillReceiveProps(): 
  shouldComponentUpdate()
  componentWillUpdate()
  render()
  componentDidUpdate()

UnMountingPhase:
componentWillUnMount():
any cleanups can be performed here, removing the event listeners and etc.


==================================================================================================
Events:
=======

What makes React different?
What makes React and its Virtual DOM so different is that,
it’s simpler than other approaches to making JavaScript reactive from a programmer’s perspective. 
You write pure JavaScript that updates React components, and React updates the DOM for you. 
The data binding isn’t intertwined with the application.

React uses one-way data binding to make things simpler. 
Every time you type in an input field in a React UI, for example, it doesn’t directly change the state of that component. 
Instead, it updates the data model, which causes the UI to be updated and the text you typed into the field appears in the field.
