import React from "react";

export default class Popup extends React.Component {
    render() {

      const popup = {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0, 0.5)"
      }

      const popup_inner = {
        position: "absolute",
        top: "25%",
        left: "25%",
        padding: 40,
        background: "white",
        borderRadius: 3
      }

      return (
        <div style={popup}>
          <form style={popup_inner}>
            <div className='form-group'> 
                <label for="form-name">Name</label>
                <input class="form-control" type="text" id="form-name" placeholder="Name" value={this.props.inputName}/>
            </div> 
            <div class="row">
              <div className='form-group col-md-6'> 
                  <label for="form-price">Price</label>
                  <input class="form-control" type="text" id="form-price" placeholder="Price"/>
              </div> 
              <div className='form-group col-md-6'> 
                  <label for="form-amount">Amount</label>
                  <input class="form-control" type="text" id="form-amount" placeholder="Amount"/>
              </div>
            </div> 
            <button type="button" class="btn btn-primary" onClick={this.props.submitNewItem}>Add item</button>
          </form>
        </div>
      );
    }
  }
 
 

  
  

  
  