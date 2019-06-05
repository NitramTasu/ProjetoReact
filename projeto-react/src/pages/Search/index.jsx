import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Button from "../../components/Button";
import Example from "../../components/Search";
import "./style.css";
class Search extends Component {
  constructor() {
    super();

    this.onSearch = this.onSearch.bind(this);

    this.state = {
      results: []
    };
  }

  onSearch(event) {
    const value = event.currentTarget.value;
    axios
      .get(`https://api.mercadolibre.com/sites/MLU/search?q=${value}`)
      .then(({ data }) => {
        this.setState({
          results: data.results
        });
      });
  }
  renderItem(item) {
    return (
      <div class="item" key={item.id}>
        <span>{item.id}</span>
        <span>{item.title}</span>
        <Link to={`/product/${item.id}`}> Abrir produto</Link>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <div>
          <input type="text" onChange={this.onSearch} />
        </div>
        <div class="lista">{this.state.results.map(this.renderItem)}</div>
      </Fragment>
    );
  }
}

export default Search;
