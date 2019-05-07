import React, { Component } from 'react';

class Products extends Component {

    constructor(props) {
        super(props);
        console.log(props.match.params.id);
    }
    render() {
        return (
            <div>
                <div>Products</div>


            </div>

        );
    }
}

export default Products