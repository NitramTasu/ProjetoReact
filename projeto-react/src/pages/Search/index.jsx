import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { searchProduct } from "../../services/ProductApi";

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
    searchProduct(value).then(({ data }) => {
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
        <div class="space" />
      </Fragment>
    );
  }
}

export default Search;
