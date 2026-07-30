import React from "react";

interface ErrorButtonState {
  shouldThrow: boolean;
}

class ErrorButton extends React.Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error("Test error triggered by ErrorButton");
    }
    return (
      <button
        onClick={this.handleClick}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Trigger Error
      </button>
    );
  }
}

export default ErrorButton;