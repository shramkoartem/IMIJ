import React from "react";

export default class SummaryRow extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            discount: 0
        }
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(e){
        this.setState({
            discount: e.target.value
        })
    }

    render(){
        if(this.props.basket.length > 0){
            let totalBefore = this.props.basket.reduce((total, item) => {return total += item.amount * item.price},0)
            return (
                        <div>
                            <div>Total: {totalBefore}</div>      
                            <div>Discount<input style={{width: 50, height: 20, marginLeft: 5}} value={this.state.discount} onChange={this.updateInput}/></div>
                            <div><strong>Final Total: {totalBefore-this.state.discount}</strong></div>
                        </div>
            )
        }
        else return null;
    }
}