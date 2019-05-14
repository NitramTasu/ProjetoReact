import React, { Component, Fragment } from 'react';

import Button from '../../components/Button'

import axios from 'axios';

import './style.css';


class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            loading: true,
            data: {},
        }
        console.log(props.match.params.id);
    }

    componentDidMount() {
        axios.all([
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)
        ]).then(([item, description]) => {
            console.log(item)
            console.log(description)
            this.setState({
                data: {
                    ...item.data,
                    description: description.data.plain_text,
                },
                loading: false,
            });
        }).catch((err) => {
            console.log(err)
        })
    }

    renderContent() {
        const { data } = this.state;
        console.log(data)

        return (
            <div>
                <Fragment >

                    <div className="mdl-grid mdl-shadow--6dp card">

                        <h1><img src={data.pictures[0].url} /></h1>
                        <div className="mdl-cell mdl-cell--6-col">
                            <h4>{data.title}</h4>
                            <p>Preço: {data.base_price}</p>
                            <p><Button label="Comprar" /></p>
                            <p>{data.description}</p>
                        </div>

                    </div>
                </Fragment>
            </div >
        )
    }

    render() {
        const { loading } = this.state;

        return loading ?
            <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
            : this.renderContent();
    }
}

export default Products