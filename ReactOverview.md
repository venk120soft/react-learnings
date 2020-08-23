Overview of react
https://www.codementor.io/blog/5-essential-reactjs-interview-questions-du1084ym1

React is an open-source JavaScript library created by Facebook for building complex, interactive UIs in web and mobile applications.
I recently migrated an application originally written in AngularJS to React, and 
One of the things I loved most is the core purpose is to build only view in MVC. 

In React the UI is split into components. Components can have child components. 

Main Topics:

1. Components
    * Pure component
    * Functional Component
    * Class Component
    * Heigher Order Component
2. JSX
3. State management
    * State
    * Props
    * React Context API
    * Third party libraries(Redux, Mobex, Flux)
4. For Asynchronous Operations
    * Third Party Libraries such as Redux Thunk, Redux Saga

Components are building blocks of UI, Thease are independent can be reusable in different parts of application so testing the UI becomes easy. 
Components can have mulitple child components

React uses JSX syntax, which stands for javascript xml, which utilizes the expressiveness of Javascript with HTML.

The browser understands javascript functions only so, 
    In react we have transpiler called bable which will convert the JSX into Javascript functions and html

In Browsers, rendering the DOM is really costly and time consuming. The main feature of react is virtual DOM.

# Virtual DOM
Virtual DOM is light weight javascript object, it is an in-memory representation of Real DOM. 
It works in a way such that whenever any underlaying data change occurs, the representaion of UI in virtaul DOM gets re-render, 
and the changes from previous DOM with new one gets calculated then the only changes is applied to the real DOM.

This way we can re-render the parts of Real DOM without rendering entire DOM, it is cost effective and faster.

What is Reconciliation?

The virtual DOM (VDOM) is an in-memory representation of Real DOM. The representation of a UI is kept in memory and synced with the “real” DOM.
It’s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called reconciliation.

[more questions](https://www.fullstack.cafe/blog/react-js-interview-questions)
