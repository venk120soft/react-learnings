import ReactDom from 'react-dom';
import React,{Component} from 'react';

const Title = ({listCount}) => {
    return (
      <div>
         <div>
            <h1>to-do({listCount})</h1>
         </div>
      </div>
    );
  }
class TextBoxComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }
        // this.onTextChange=this.onTextChange.bind(this);
    }
    // input='';
    // this event is optional as we are using the ref we no  need to implement this
    onTextChange=(event)=> {
        this.setState({
            value: event.target.value
        });

    }
    addToList=(val)=>{
        this.props.addToList(val);
    }
    render(){
        return(<div> 
            Hello its my page Showing up TODO List.
            <input ref={node=>this.input=node} onChange={this.onTextChange}></input>
            <button onClick={()=>{
                this.addToList(this.input.value);
            this.input.value='';
        }
        }> Add to List</button>
            </div>);
            };
}

// here as we are using the ref keyword we no need to maintain the state for the onchange
const TextBoxFunctionComponent=({addToList})=>{
    let input;
    return(<div> 
        Hello its my page Showing up TODO List with function component.
        <input ref={node=>input=node} ></input>
        <button onClick={()=>{
            addToList(input.value);
        input.value='';
    }
    }> Add to List</button>
        </div>);
}

class ActualContainer extends Component{
    constructor(props){
        super(props);
        // Usually the list should come from api's we can write fetching the data from the Api in ComponentDidMount
        const myList = [
            {
                id: -3, 
                value: "Sample todo list made with react"
            },
            {
                id: -2,
                value: "Click on remove button to delete them!"
            },
            {
                id: -1,
                value: "Add new todos by entering in the input box and clicking on add to list!"
            }
        ];
        this.state={
            data:myList||[]
        }
        window.id=0;
        this.addToList=this.addToList.bind(this);
        this.removeFromList=this.removeFromList.bind(this);
    }
    // Handler to add todo
    addToList=(val) =>{
        if(val.trim().length<1){
            return;
        }
        const todo = { 
            value: val, 
            id: window.id++
        };
        // Main logic to add Item
        this.state.data.push(todo);
        // update state
        this.setState({
            data: this.state.data
        });
    }

    removeFromList=(elementId)=>{
        // Main logic for removing item
        const list=this.state.data.filter(x=>x.id!==elementId);
        // after removing item setting the state with new list
        this.setState({
            data:list
        })
    }

    render(){
        return(<div> 
            <Title listCount={this.state.data.length}/>
            <TextBoxComponent addToList={this.addToList}/>
            <TextBoxFunctionComponent addToList={this.addToList}/>
            <ShowingList list={this.state.data} remove={this.removeFromList} />
        </div>);
    }
}

const ShowingList = ({list, remove}) => {
	let resultedList = [];
	if(list.length > 0) {
		resultedList = list.map(listElement => {
			// passing todo and remove method reference
			return (<Todo listElement={listElement} remove={remove} />);
			//return (<p>{todo.value}</p>);
		});
	} else {
		resultedList.push(<h3 id="acu">All caught up !</h3>);	
	}
	
	return (
		<div id="list">
			<p id="info"> Your Todos: </p>
			{resultedList}
		</div>
	);
};

const Todo = ({listElement,remove}) => {
    // single todo 
    return (
        <p className="todos">
            {listElement.value}
            <button 
                onClick={(e)=>remove(listElement.id)}>  
                remove
            </button>
        </p>
    );
};
export default ActualContainer;
// Here we have to find the element where you want to show the above component.
// Usually it is root in react, If we can go to index.js file we find the root element
// we can replace below line of code in the index.js then it should work fine.
// ReactDom.render(<ActualContainer></ActualContainer>,document.getElementById('root'))
