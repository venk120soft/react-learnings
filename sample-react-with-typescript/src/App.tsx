import React from "react";
import "./App.css";
import { ListComponent } from "./to-do-list/list";
import IncrementComponentLocal from "./counter/increment-component-local";
import Loading from "./loading-status";

const App = () => {
  const myList = ["One", "Two", "Three"];
  return (
    <div className="App">
      <h1>Hello This is Venkatesh</h1>
      <IncrementComponentLocal />
      <Loading />
      <ListComponent items={myList}></ListComponent>
    </div>
  );
};

export default App;
