import React from "react";

interface SearchProps {
  onSearch: (term: string) => void;
  initialValue: string;
}

interface SearchState {
  inputValue: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: props.initialValue,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.inputValue.trim();
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div style={{ display: "flex", gap: "10px", padding: "20px", justifyContent: "center" }}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Search Pokemon..."
          style={{ padding: "8px", fontSize: "16px", width: "300px" }}
        />
        <button
          onClick={this.handleSearch}
          style={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;