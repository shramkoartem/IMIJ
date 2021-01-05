import React from 'react'
import ReactDOM from 'react-dom'
import Table from './components/Table'

export default class UploadItemsTable extends React.Component {
    constructor(){
        super();
        this.state= {
            items: [
              {
                name: "Key Труси жін LPC 908 A20 multicolor L",
                barcode: "5904765604464",
                cost: 99,
                price: 120,
                amount: 1
              },
              {
                name: "Key Труси жін LPC 908 A20 multicolor XL",
                barcode: "5904765604471",
                cost: 99,
                price: 120,
                amount: 1
              },
              {
                name: "Key Труси жін LPC 913 A20 multicolor L",
                barcode: "5904765604709",
                cost: 99,
                price: 120,
                amount: 1
              }
              ],
            fileName: "test",
            margin: 100,
        }
    }

    handleClick = (e) => {
      console.log(e)
    }

    increaseMargin = () => {
      const oldMargin = this.state.margin 
      const newMargin = oldMargin+10
      this.setState({margin: newMargin})
    }
    decreaseMargin = () => {
      const oldMargin = this.state.margin 
      const newMargin = oldMargin -10
      this.setState({margin: newMargin})
    }
    applyPriceMargin = () => {
      let items = this.state.items;
      let margin = this.state.margin;
      items.map( item => {
        item.price = Math.round(item.cost * (1 + margin/100))
      })
      this.setState({items: items});
    }

    changeAmount = (barcode, increase) => {
      /*
        Change Amount prop of Item by 1.

        :barcode: (string) unique ID to find element
        :increase: (binary) if 1 : amount++, if 0 : amount--
      */
      let items = this.state.items;
      items.map( item => {
        // find the item by barcode
         if(item.barcode === barcode){

           increase ? 
              item.amount++ : 
              item.amount > 1 ? item.amount-- : item.amount=item.amount
         }
         return item
      });
      this.setState({items : items})
    }

    deleteItem = (barcode) => {
      let items = this.state.items;
      this.setState({items : [...this.state.items].
        filter(item => item.barcode !== barcode)});
    }


    // ToDo - move header to a separate component


    render(){

        return (
            <div class="container">
                <p>{ this.state.fileName }123</p>
                <table class="table display">
                  <thead>
                    <tr>  
                      {  "Margin:" + this.state.margin }
                      <button onClick={this.increaseMargin}>+</button>
                      <button onClick={this.decreaseMargin}>-</button>
                      <button onClick={this.applyPriceMargin}>Apply</button>

                    </tr>
                    <tr>
                      { ["barcode", "name", "cost", "price", "amount"].map( (i) => (<th> {i}</th>) ) }
                    </tr>
                  </thead>
                  <tbody>
                    <Table 
                      items={ this.state.items } 
                      handleClick = {this.handleClick} 
                      changeAmount = { this.changeAmount }
                      deleteItem = {this.deleteItem}
                    />
                  </tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(
    <UploadItemsTable />,
    document.getElementById("uploadTable"))

