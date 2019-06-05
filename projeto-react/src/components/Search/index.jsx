import React, { Component, Button } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import "./style.css";
const languages = [
  {
    name: "C",
    year: 1972
  },
  {
    name: "C#",
    year: 2000
  },
  {
    name: "C++",
    year: 1983
  },
  {
    name: "Clojure",
    year: 2007
  },
  {
    name: "Elm",
    year: 2012
  },
  {
    name: "Go",
    year: 2009
  },
  {
    name: "Haskell",
    year: 1990
  },
  {
    name: "Java",
    year: 1995
  },
  {
    name: "Javascript",
    year: 1995
  },
  {
    name: "Perl",
    year: 1987
  },
  {
    name: "PHP",
    year: 1995
  },
  {
    name: "Python",
    year: 1991
  },
  {
    name: "Ruby",
    year: 1995
  },
  {
    name: "Scala",
    year: 2003
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.title}</span>;
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
            console.log("item", item.title);
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
      placeholder: "Type 'c'",
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
