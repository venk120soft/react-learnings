import { DefaultButton } from "@fluentui/react";
import React from "react";

interface IProps {
  items: any[];
}

interface IState {
  myItems: any[];
}

export class ListComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      myItems: this.props.items,
    };
  }
  public render() {
    return (
      <ul>
        {this.state.myItems.map((item: any, index: number) => {
          return (
            <li>
              <div>
                <br />
                {index + " : " + item}
                &nbsp; &nbsp;
                <DefaultButton
                  onClick={() => {
                    this.setState({
                      myItems: this.state.myItems.filter((x) => x !== item),
                    });
                  }}
                  checked={false}
                >
                  Delete
                </DefaultButton>
                {this.state.myItems.length===0 && 'List is empty'}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
