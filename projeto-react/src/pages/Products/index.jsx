import React, { Component, Fragment } from "react";

import Button from "../../components/Button";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import Numeral from "numeral";
import "numeral/locales/pt-br";
import { getProduct } from "../../services/ProductApi";
Numeral.locale("pt-br");

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      loading: true,
      data: {}
    };
    console.log("Inicia", props.match.params.id);
  }

  componentDidMount() {
    getProduct(this.state.id)
      .then(([item, description]) => {
        this.setState({
          data: {
            ...item.data,
            description: description.data.plain_text
          },
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  formatPrice(price) {
    if (price.indexOf(".") != -1) {
      price.replace(".", ",");
      return `R$${price}`;
    } else {
      return `R$${price},00`;
    }
  }

  renderContent() {
    const { data } = this.state;
    console.log("render", data);

    return (
      <div>
        <Fragment>
          <Grid
            className="mdl-grid mdl-shadow--6dp card"
            container
            direction="row"
          >
            <Box width="50%">
              <img src={data.pictures[0].url} />
            </Box>
            <div className="mdl-cell mdl-cell--5-col">
              <div>{data.sold_quantity} Vendidos</div>

              <h4>{data.title}</h4>
              <p>Preço: {this.formatPrice(data.price.toString())}</p>
              <p>
                <Button label="Comprar" />
              </p>
            </div>
            <Grid item xs={12} sm={6}>
              <Box p={2}>{data.description}</Box>
            </Grid>
          </Grid>
        </Fragment>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return loading ? (
      <div
        id="p2"
        className="mdl-progress mdl-js-progress mdl-progress__indeterminate"
      />
    ) : (
      this.renderContent()
    );
  }
}

export default Products;
