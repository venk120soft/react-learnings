import React from "react";

interface MyState {
  count: number;
}
class IncrementComponent extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <label>{this.state.count}</label>
        <br />
        <br />
        <button
          onClick={this.increment}
        >
          Increment
        </button>
        <br />
        <br />
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }

    private increment = () => {
        console.log("Hello");

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

export default IncrementComponent;
