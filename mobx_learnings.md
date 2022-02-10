# Mobx Learnings:

### Mobx flow in short:
When user clicks on any component on the UI, the action will be called, action will modify the state. so, this get notified to the computed properties, 
which intern update the observable variables/properties. then this triggers the Observers (main component class/function) which means dom will rerender with update values of the observables in UI

![Mobx flow](./images/mobx_flow.png)

```javascript
//============================================== Calling the timer in Main component
import * as store from './store.ts';

const {secondsPassed, resetTimer, increaseTime} = store;
ReactDOM.render(<TimerView secondsPassed={getSecondsPassed} onReset={resetTimer} />, document.body)

// Update the 'Seconds passed: X' text every second.
setInterval(() => {
    increaseTime();
}, 1000)
//============================================== Timer Component
import {observer} from 'mobx-react';

interface ITimerProps{
  secondsPassed:number;
  onReset:() => void;
}

@observar
class Timer extends React.Component<ITimerProps,{}>{
  constructor(props:ITimerProps){
      super(props);
  }
  return (
      <button onClick={this.props.onReset}>
        Seconds passed: {this.props.secondsPassed}
      </button>
      );     
}

//============================================== Store.ts
import {observable, autobind, action, computed} from 'mobx-react';

class TimerStore{
    @action
    public function resetTimer(timer){
        // Add any api updates which returns observables
        // In response we can set the state
        this.secondsPassed =0;
    }

    @observable
    private secondsPassed:DataTime;

    @autobind
    @action
    private set increaseTime(){
      this.secondsPassed +=1;
    }

    @computed
    private get getSecondsPassed(){
      return this.secondsPassed;
    }
}

export default const timerStore= new TimerStore();
```

### Mobx flow in detail:
When user clicks on any component on the UI, UI does not change the state directly, instead does it via a message passing system by firing the actions. 
The action encapsulate the parameters that are required to cause an appropriate change in state 

UI is responsible for capturing various kinds of user events and translating them into one or more actions that are then fired to change the state.

When the state changes, it notify all its observers or subscribers of the change as we know the UI is one of the most important subscriber that is notified

When that happens it re renders and updates the new state this system of data flow the state into the UI is always uni directional.
One of the biggest benifit of this approach is that, it becomes easy to grasp how the UI is kept in sync with the changing data

It also clearly seperates the responsibility between rendering and data changes 
