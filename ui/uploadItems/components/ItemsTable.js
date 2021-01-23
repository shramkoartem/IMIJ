import React from 'react';
import Item from './Item'

class ItemsTable extends React.Component {

    render(){


         return this.props.items.map( (item) => (

             <Item 
                key={item.barcode} 
                item={item}
                handleClick={ this.props.handleClick }
                changeAmount = { this.props.changeAmount }
                deleteItem = {this.props.deleteItem}
            />
         ))
    }

}

export default ItemsTable;