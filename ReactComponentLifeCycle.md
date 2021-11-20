What are the React Lifecycle methods?
For the latest changes:
https://reactjs.org/docs/react-component.html#mounting
https://reactjs.org/docs/react-component.html#updating
https://reactjs.org/docs/react-component.html#unmounting
https://reactjs.org/docs/react-component.html#error-handling

Life Cycle Diagram:
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## replacing-component-lifecycle-methods-with-react-hooks
https://blog.carbonfive.com/replacing-component-lifecycle-methods-with-react-hooks/

In React, life methods are changing from one version to other. some are deprecating.

We have 2 phases in react lifecycle 1) render 2) re-render
        ## render
1) When react page starts loading, control goes to the Constructor.
  In Constructor, We Initialize the state to its Initial values. 
2) After Initializing the values, control goes to getDerivedStateFromProps method wich is also called ComponentWillReceiveProps(which is deprecated now)

        In here the new props will set to the state and the new state will return. 
        and it is static method, so user cannot access with the this keyword to set the state.

3) Control will move to componentWillMount In here, the component will be rendered. In this method you can assign values to the variables 
In here we should return only JSX output

4) After the DOM is ready the control will goto componentDidMount method and get the data from third party apis then update the state.
        you can also add any any event listener you want 
        document.addEventListener('focus', (event)=>{}, true);

        ## re-render
5) Again getDerivedStateFromProps method will be called and return new state.
6) based on the new state we can decide whether we render the component or not in shouldComponentUpdate method.
  this method takes prev state, new state and compares it if true we should render the component else we can skip
7) render:  this will be decided based on the shouldComponentUpdate method
8) getSnapshotBeforeUpdate / ComponentWillUpdate. In here actual render takes place 
9) ComponentDidUpdate() In this method we can call third party api and update them.
10) ComponentWillUnMount() here the component will dies.
 you can remove event listeners document.removeEventListener('focus', (event)=>{}, true);
 
   Class MyComponent extends React.Component{
   // Initializing values
   constructor(props:ISomeProps){
           super(props);
           const {porp11, prop2}=props;
            this.state={
                   listItems,
                   columns,
                   prop1:listItems,
                   prop2: columns
                   };
   }
   // setting the props and returning new state
   public static getDerivedStateFromProps(nextProps:ISomeProps, prevState:ISomeState){
     let newState=null;
     if(prevState.prop1!==nextProps.prop1)
       newState=Object.assiggn({},{
               prop1:nextProps.prop1,
               prop2:nextProps.prop2
              });
     else{
        return prevState;
     }
     return newState;
   }
   
   // rendering the component based on the new state return from getDerivedStateFromProps
    public render():JSX.Element{
        // some statements
        return (
              <div>
              // multiple lines of html
              // we can write the expressions in {}
              </div>
        );
    }
    
    // this will get called after the render method and DOM is ready.
    public componentDidMount():void{
      // we can call any api or event and set the state here or add some event
    }
    
     // this will only call on re rendering the component
     public shouldComponentUpdate(nextState: ISomeProps): boolean {
        // dont update te component if the states are same
        if (this.props==newState) {
                this._resetComponent();
        }
        return true;
      }
      
      public getSnapshotBeforeUpdate(prevProps: ISomeProps){
        const result= {executeOnLoad:false} as ISomeProps;
        if(prevProps.key!==ths.props.key){
          result.executeOnLoad=true;
        }
        return result
      }

      public componentDidUpdate():void{
            // we can call any api and set the state here
      }
      
      public componentWillUnMount():void{
        // here we set all states to null;
        // this is where the component dies.
      }
   }

Deprecated Methods:
ComponentWillReceiveProps
ComponentWillMount
ComponentWillUpdate

So Latest will be:
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

Render phase
------------
1) Constructor
2) getDerivedStateFromProps(nextProps,prevState)
3) render
4) React will update DOM and Refs
5) ComponentDidMount

Re-Render phase
---------------
1) getDerivedStateFromProps(nextProps,prevState)
2) shouldComponentUpdate(nextProps, nextState)
3) render (based on decision taken in shouldComponentUpdate)
4) getSnapshotBeforeUpdate(prevProps, prevState)
5) React will update DOM and Refs
6) ComponentDidUpdate

On Error phase
--------------
1) getDerivedStateFromError(error)
2) componentDidCatch(error, info)
