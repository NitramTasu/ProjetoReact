import React, { Component, Button } from "react";
import Autosuggest from "react-autosuggest";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Box from "@material-ui/core/Box";

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

function renderSuggestion(suggestion) {
  return (
    <Box key={suggestion.id}>
      <Link className="link" to={`/product/${suggestion.id}`}>
        <SearchIcon className="icon" />
        <span>{suggestion.title}</span>
      </Link>
    </Box>
  );
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    axios
      .get(`https://api.mercadolibre.com/sites/MLU/search?q=${value}`)
      .then(({ data }) => {
        this.setState({
          suggestions: data.results.filter(item => {
            return item.title;
          })
        });
      });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Buscar produtos, marcas e muito mais...",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default App;
