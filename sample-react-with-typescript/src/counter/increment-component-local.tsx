import { DefaultButton, Label, PrimaryButton, Stack } from "@fluentui/react";
import React from "react";

interface IMyState {
  count: number;
}

interface IProps {
  align?: string;
}

class IncrementComponentLocal extends React.Component<IProps, IMyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  public render() {
    return (
      <div style={{ alignContent: this.props.align || "center" }}>
        <Label>{this.state.count}</Label>
        {/* <button onClick={this.increment}>Increment</button> */}
        <Stack horizontal>
          <PrimaryButton onClick={this.decrement} checked={true}>
            Increment
          </PrimaryButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <DefaultButton onClick={this.increment} checked={true}>
            Decrement
          </DefaultButton>
        </Stack>
      </div>
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
      ...this.state,
      count: this.state.count - 1,
    });
  };
}

export default IncrementComponentLocal;
