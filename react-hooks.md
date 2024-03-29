Resources: [Guide to `useEffect`](https://overreacted.io/a-complete-guide-to-useeffect/) | [Class vs Functional](https://overreacted.io/how-are-function-components-different-from-classes/)
- https://www.telerik.com/kendo-react-ui/react-hooks-guide/
- [Custom hooks](https://www.wix.engineering/post/custom-react-hook-when-software-design-meets-react-hooks)
- https://usehooks.com/
- [Clean api calls using React hooks](https://betterprogramming.pub/clean-api-call-with-react-hooks-3bd6438a375a)
- [Different ways of calling api](https://dev.to/adyasha8105/how-to-manage-api-calls-in-react-11a8)

## Why React hooks was introduced?

`One reason` to introduce hooks was the complexity in dealing with `this` keyword inside class components. If not handled properly, `this` will take some other value. That will result in breaking lines like this.setState() and other event handlers. Using hooks, we avoid that complexity when working with functional components.

`Second reason` is, Class components do not minify very well and also make hot reloading unreliable. That is another inspiration to bring hooks.

`Third reason` is, there is no specific way to reuse stateful component logic. Even though HOC and render props patterns address this problem, that asks for modifying the class component code. Hooks allow to share stateful logic without changing the component hierarchy.

`Fourth reason` is, in a complex class component, related code are scattered in different lifecycle methods. Example, in case of a data fetching, we do that mainly in componentDidMount() and componentDidUpdate(). Another example is, in case of event listeners, we use componentDidMount() to bind an event

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
 # Custom hooks
 Custom React hooks are help us to achieve code reusability, for instance in every application we make rest api calls to do fetch and manipulate the data.
 Its a good practice to create custom hook to avoid code duplication and for code mainatanance
 
 Refer: https://www.wix.engineering/post/custom-react-hook-when-software-design-meets-react-hooks
 For code reference: https://stackblitz.com/edit/custom-rest-api-hook?file=src%2FTodoList.js
 ```javascript
import React from "react";
const { useState, useRef, useEffect } = React;

export default function useApi(baseUrl) {
  const CORS_HOST_URL = "https://cors-anywhere.herokuapp.com/";

  const url = useRef(`${CORS_HOST_URL}${baseUrl}`);

  const [data, setData] = useState([]);
  const [isQuerying, setIsQuerying] = useState(true);

  useEffect(() => {
    url.current = `${CORS_HOST_URL}${baseUrl}`;
  }, [baseUrl]);

  const list = async () => {
    setIsQuerying(true);
    const res = await fetch(url.current);
    const resData = await res.json();
    setData([...resData]);
    setIsQuerying(false);
  };

  const add = async title => {
    setIsQuerying(true);
    const res = await fetch(url.current, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
    const resData = await res.json();
    setData([...data, { id: resData.id, title }]);
    setIsQuerying(false);
  };

  const edit = async (id, newTitle) => {
    setIsQuerying(true);
    await fetch(url.current, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, newTitle })
    });
    const copy = [...data];
    const index = copy.findIndex(item => item.id === id);
    copy[index].title = newTitle;
    setData(copy);
    setIsQuerying(false);
  };

  const remove = async id => {
    setIsQuerying(true);
    await fetch(`${url.current}?item=${id}`, {
      method: "DELETE"
    });
    const copy = [...data];
    copy.splice(copy.findIndex(item => item.id === id), 1);
    setData(copy);
    setIsQuerying(false);
  };

  const api = {
    list,
    add,
    edit,
    remove
  };

  return [data, isQuerying, api];
}

 ```
 Now use this custom react hook to create TODO List
 ```javascript
 import React from "react";
import "./style.css";
import useApi from "./useApi.js";
import Loader from "./Loader";
const { useRef, useEffect } = React;

export default function TodoList(props) {
  const BASE_URL = `https://guysgv.wixsite.com/todo-api/_functions/todo/${
    props.selectedList.id
  }`;

  const [data, isQuerying, api] = useApi(BASE_URL);
  const inputRef = useRef();

  useEffect(() => {
    api.list();
  }, [props]);

  function handleSubmit(e) {
    e.preventDefault();
    api.add(inputRef.current.value);
  }

  function handleEdit(item) {
    api.edit(item.id, `${item.title} edited`);
  }

  function handleRemove(item) {
    api.remove(item.id);
  }

  return (
    <div className="toDoApp">
      <div className="header">To Do List ({props.selectedList.title})</div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            ref={inputRef}
            name="itemName"
            type="text"
            placeholder="Add item"
          />
        </label>
      </form>
      <div className="listContainer">
        {isQuerying && (
          <div className="loaderContainer">
            <Loader />
          </div>
        )}
        {data && (
          <div className="list">
            {data.map(item => {
              return (
                <div className="listItem" key={item.id}>
                  {item.title}
                  <span
                    onClick={() => handleRemove(item)}
                    className="removeItem"
                  >
                    Remove
                  </span>
                  <span onClick={() => handleEdit(item)} className="editItem">
                    Edit
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
 ```
 # [Implement API calling in Application using react hooks](https://betterprogramming.pub/clean-api-call-with-react-hooks-3bd6438a375a)
 
 Create common clients for your application 
 
```javascript
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export const apiClient1 = axios.create({
  baseURL: "https://google.com"
});

```
Then in `service` layer we have to call all the api's or create seperate file for each

```javascript
import {apiClient1 as client} from "./client";

const getComments = () => client.get("/comments");

const getPosts = () => client.get("/posts");

export default {
  getComments,
  getPosts
};
```
Create common hook to handle the requests in ex: useApi.ts file 
```javascript
import { useState } from "react";

export default useApi = (apiFunc) => {
  // We can replace useState with useReducer
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request
  };
};
```
Now finally we can call this in React component
```javascript
import "./styles.css";
import React, { useEffect } from "react";
import commentsApi from "./api/comments";
import postsApi from "./api/posts";
import useApi from "./hooks/useApi";

export default function App() {
  const getPostsApi = useApi(postsApi.getPosts);
  const getCommentsApi = useApi(commentsApi.getComments);

  useEffect(() => {
    getPostsApi.request();
    getCommentsApi.request();
  }, []);

  return (
    <div className="App">
      {/* Post List */}
      <div>
        <h1>Posts</h1>
        {getPostsApi.loading && <p>Posts are loading!</p>}
        {getPostsApi.error && <p>{getPostsApi.error}</p>}
        <ul>
          {getPostsApi.data?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
      {/* Comment List */}
      <div>
        <h1>Comments</h1>
        {getCommentsApi.loading && <p>Comments are loading!</p>}
        {getCommentsApi.error && <p>{getCommentsApi.error}</p>}
        <ul>
          {getCommentsApi.data?.map((comment) => (
            <li key={comment.id}>{comment.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

```
