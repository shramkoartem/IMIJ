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
        const inputStyle = {
            display: "inline-block",
            width: 50,
            height: 20,
            marginLeft: 5,
            textAlign: "center"
        }
        let totalBefore = this.props.basket.reduce((total, item) => {return total += item.amount * item.price},0)
            return (
                        <div style={{lineHeight: 2}}>
                            <div>Total: {totalBefore}</div>      
                            <div>Discount<input id="discount" class="form-control" style={inputStyle} value={this.state.discount} onChange={this.updateInput}/></div>
                            <div>
                                <strong>Final Total: <span id="final_total">{totalBefore-this.state.discount}</span></strong>
                            </div>
                        </div>
            )
    }
}