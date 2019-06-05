import React, { Component, Fragment } from "react";

import Button from "../../components/Button";

import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import Numeral from "numeral";
import "numeral/locales/pt-br";
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
          <Grid
            className="mdl-grid mdl-shadow--6dp card"
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid>
              <h1>
                <img src={data.pictures[0].url} />
              </h1>
            </Grid>
            <Grid className="mdl-cell mdl-cell--6-col">
              <div>{data.sold_quantity} Vendidos</div>

              <h4>{data.title}</h4>
              <p>Preço: {Numeral(data.base_price).format("$0.00")}</p>
              <p>
                <Button label="Comprar" />
              </p>
            </Grid>
            <Grid item xs={6} al>
              <p>{data.description}</p>
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
