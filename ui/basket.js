// tutorial on connecting react to flask:
// https://arunmozhi.in/2017/10/22/using-react-for-parts-of-a-flask-app/
//add basket update
import React from "react";
import ReactDOM from "react-dom";
import { autocomplete } from "../app/static/js/autocomplete_items.js";
import THeader from "./TableHeader";

export default class Basket extends React.Component {
  constructor() {
    super();
    this.state = {
      basket: [],
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.addItem = this.addItem.bind(this);
    this.increaseAmount = this.increaseAmount.bind(this);
  }

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open("GET", "/items/ajax_data/", true);
    req.send();
    req.onload = function() {
    const json = JSON.parse(req.responseText);
    const items = json.data;
    autocomplete(document.getElementById("myInput"), items);
    }; 
    document.getElementById("add-button").addEventListener("click", this.addItem);
}

addItem(){ 
  let val = document.getElementById("myInput").value;
  if (val != "") {
    let itemObj = new Object();
    itemObj.name = val;
    itemObj.barcode = document.getElementsByName("myInputBarcode")[0].value;
    itemObj.price = document.getElementsByName("myInputPrice")[0].value;
    itemObj.amount = 1;
    // add obj to prev State if it does not exist yet, else increase amount of existing item
    let i = this.state.basket.findIndex((item) => item.barcode == itemObj.barcode);
    // item does not exist
    if (i == -1) {
      this.setState((prevState) => {
        let newBasket = prevState.basket.slice();
        newBasket.push(itemObj);
        return { basket: newBasket };
      });
      // item does exist
    } else if (i != -1) {
      this.increaseAmount(i);
    }
    document.getElementsByName("myInputBarcode")[0].value = -1;
    document.getElementsByName("myInputPrice")[0].value = 0;
  }
  document.getElementById("myInput").value = "";
}

  increaseAmount(i) {
    this.setState((prevState) => {
      let basket = prevState.basket.slice();
      let item = basket[i];
      item.amount++;
      basket[i] = item;
      return { basket: basket };
    });
  }

  increase(e) {
    // find index of array object that matches the clicked button
    //button.cell.row.input.value(=barcode)
    let barcode = e.currentTarget.parentNode.parentNode.lastChild.getAttribute("value");
    let i = this.state.basket.findIndex((item) => item.barcode == barcode);
    this.increaseAmount(i);
  }

  decrease(e) {
    // find index of array object that matches the clicked button
    let barcode = e.currentTarget.parentNode.parentNode.lastChild.getAttribute("value");
    let i = this.state.basket.findIndex((item) => item.barcode == barcode);
    if(this.state.basket[i].amount > 1){
      this.setState((prevState) => {
        let basket = prevState.basket.slice();
        let item = basket[i];
        item.amount--;
        basket[i] = item;
        return { basket: basket };
      });
    }
  }

  render() {
    return (
        <table class="table" id="selected-items-table">
          <THeader basket={this.state.basket} />
          <tbody id="selected-items-tbody">
            {this.state.basket.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  {item.amount} <button onClick={this.increase}>+</button>{" "}
                  <button onClick={this.decrease}>-</button>{" "}
                </td>
                <input name="row-barcode" type="hidden" value={item.barcode} />
              </tr>
            ))}
          </tbody>
          <tfoot id="selected-items-tfoot"></tfoot>
        </table>
    );
  }
}

ReactDOM.render(<Basket />, document.getElementById("basket"));
