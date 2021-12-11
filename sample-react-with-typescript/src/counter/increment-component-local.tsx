import { DefaultButton, Label, PrimaryButton, Stack } from "@fluentui/react";
import React from "react";

interface IMyState {
  count: number;
}

class IncrementComponentLocal extends React.Component<{}, IMyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  public render() {
    return (
      <>
        <Label
          style={{ float: "left", display: "flex", paddingLeft: "50px" }}
        >
          {this.state.count}
        </Label>
        <div style={{ marginTop:'50px'}}> 
          {/* <button onClick={this.increment}>Increment</button> */}
          <Stack horizontal>
            <PrimaryButton onClick={this.increment} checked={true}>
              Increment
            </PrimaryButton>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <DefaultButton onClick={this.decrement} checked={false}>
              Decrement
            </DefaultButton>
          </Stack>
        </div>
      </>
    );
  }

  private increment = () => {
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
  };

  private decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };
}

const IncrementComponentLocal1=()=>{

  return
}

export default IncrementComponentLocal;
