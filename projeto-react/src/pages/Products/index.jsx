import React, { Component, Fragment } from "react";

import Button from "../../components/Button";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import Numeral from "numeral";
import "numeral/locales/pt-br";
import Paper from "@material-ui/core/Paper";
Numeral.locale("pt-br");

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      loading: true,
      data: {}
    };
    console.log(props.match.params.id);
  }

  componentDidMount() {
    axios
      .all([
        axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
        axios.get(
          `https://api.mercadolibre.com/items/${this.state.id}/description`
        )
      ])
      .then(([item, description]) => {
        console.log(item);
        console.log(description);
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

  renderContent() {
    const { data } = this.state;
    console.log(data);

    return (
      <div>
        <Fragment>
          <Grid container direction="row" justify="center">
            <Grid item>
              <img src={data.pictures[0].url} />
            </Grid>
            <Grid item>
              <div>{data.sold_quantity} Vendidos</div>

              <h4>{data.title}</h4>
              <p>Preço: {Numeral(data.base_price).format("$0.00")}</p>
              <p>
                <Button label="Comprar" />
              </p>
            </Grid>
            <Grid item>
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
