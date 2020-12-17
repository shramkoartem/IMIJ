// tutorial on connecting react to flask:
// https://arunmozhi.in/2017/10/22/using-react-for-parts-of-a-flask-app/
import React from "react";
import ReactDOM from "react-dom";
import { autocomplete } from "../app/static/js/autocomplete_items.js";
import THeader from "./TableHeader";
import PopUp from "./PopUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Basket extends React.Component {
  constructor() {
    super();
    this.state = {
      basket: [],
      showPopUp: false,
      inputName:""
    };

    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.addItem = this.addItem.bind(this);
    this.increaseAmount = this.increaseAmount.bind(this);
    this.delete = this.delete.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
    this.submitNewItem = this.submitNewItem.bind(this);
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

togglePopUp(){
  this.setState(prevState => {
    return {showPopUp: !prevState.showPopUp}
  })
}

addItem(){ 
  this.setState({inputName: document.getElementById("myInput").value});
  if (this.state.inputName != "") {
    let itemObj = new Object();
    itemObj.name = this.state.inputName;
    itemObj.barcode = document.getElementById("myInputBarcode").value;
    let i = this.state.basket.findIndex((item) => item.barcode == itemObj.barcode);
    //if it does not exist
    if(i == -1) {
      //if autocomplete was applied, add missing attributes and add to basket
      if(itemObj.barcode != -1){
        itemObj.price = document.getElementById("myInputPrice").value;
        itemObj.amount = 1;
        this.setState((prevState) => {
          let newBasket = prevState.basket.slice();
          newBasket.push(itemObj);
          return { basket: newBasket };
          });
          // if item barcode is -1 -> not found through autocomplete, it will be added through the form
        } else {
          this.togglePopUp();
        }
    // if item does exist, increase amount
    } else if (i != -1) {
      this.increaseAmount(i);
    }
    // is this even needed?
    document.getElementsByName("myInputBarcode")[0].value = -1;
    document.getElementsByName("myInputPrice")[0].value = 0;
  }
  document.getElementById("myInput").value = "";
}

submitNewItem(){
  // how does new element get barcode
  let itemObj = new Object();
  // could also get value straight from input, but better this way if edited again
  itemObj.name = document.querySelector("#form-name").value;
  itemObj.price = document.querySelector("#form-price").value;
  itemObj.amount = document.querySelector("#form-amount").value;
  // add to basket
  this.setState((prevState) => {
    let newBasket = prevState.basket.slice();
    newBasket.push(itemObj);
    return { basket: newBasket };
    });
  this.togglePopUp();
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
    console.log(this)
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

  delete(e){
    let barcode = e.currentTarget.parentNode.parentNode.lastChild.getAttribute("value");
    let i = this.state.basket.findIndex((item) => item.barcode == barcode);
      this.setState((prevState) => {
        let basket = prevState.basket.slice();
        basket.splice(i,1);
        return { basket: basket };
      });
  }

  render() {

    const buttonStyle = {
      marginLeft: 4,
      padding: 2,
      borderRadius: 2
    }

    return (
        <table class="table" id="selected-items-table">
          <THeader basket={this.state.basket} />
          <tbody id="selected-items-tbody">
            {/* show pop up conditionally */}
            {this.state.showPopUp ? <PopUp submitNewItem={this.submitNewItem} inputName={this.state.inputName}/> : null}
            {this.state.basket.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td style={{display: "flex", alignItems: "center"}}>
                  {item.amount}
                  <button onClick={this.increase} style={buttonStyle} className="transaction-button"><FontAwesomeIcon icon={faPlus}/></button>
                  <button onClick={this.decrease} style={buttonStyle} className="transaction-button"><FontAwesomeIcon icon={faMinus}/></button>
                  <button onClick={this.delete} style={buttonStyle} className="transaction-button"><FontAwesomeIcon icon={faTrash}/></button>
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
