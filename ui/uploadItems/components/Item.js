import React from 'react';

class Item extends React.Component {

    render(){
        
        const { barcode, name, cost, price, amount } = this.props.item;
        
        const buttonStyle = {
            marginLeft: 4,
            padding: 2,
            borderRadius: 2
        }

        return (

            <tr >
                <td>
                    <p>{ barcode }</p>
                </td>
                <td>
                    <p 
                        onClick={ this.props.handleClick.
                        bind(this, name)} 
                    > { name } </p>
                </td>
                <td>
                    <p> { cost }</p>
                </td>
                <td>
                    <p>
                        { price }
                    </p>
                </td>
                <td>
                    <div>
                            { amount }
                        <button //style={buttonStyle}
                            onClick = { this.props.changeAmount.
                            bind(this, barcode, 1)}
                        >+</button>
                        <button //style={buttonStyle}
                            onClick = { this.props.changeAmount.
                            bind(this, barcode, 0)}
                        >-</button>
                    </div>
                </td>
                <td>
                    <button 
                        onClick= {this.props.deleteItem.
                        bind(this, barcode)}
                    >x</button>
                </td>
            </tr>
        )
    }

} 

export default Item;



