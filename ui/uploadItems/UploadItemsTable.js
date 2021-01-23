import React from 'react'
import ReactDOM from 'react-dom'
import ItemsTable from './components/ItemsTable'
import axios from 'axios';

// import "./uploadTable.css"
// import "./uploadBox.css"
// import "./buttons.css"


// import "./../app/static/styles/upload_table/uploadTable.css"
// import "../../ app/static/styles/upload_table/uploadBox.css"
// import "../../app/static/styles/upload_table/buttons.css"





export default class UploadItemsTable extends React.Component {
    constructor(){
        super();
        this.state= {
            items: [],
            fileName: "test",
            margin: 100,

            // upload box
            selectedFile: null,


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

    onClickTableSubmitHandler = () => {
      const items = this.state.items;
      axios.post("http://127.0.0.1:5000/items/post_upload_table_data", items, {

      }).then( res => {
        console.log(res.statusText)
        if(res.statusText == "OK"){
          alert("Success")
          this.setState({items: []})
        }
      })
    }
    // ToDo - move header to a separate component

    // UPLOAD BOX
    onChangeBoxHandler = (e) => {
      console.log(e.target.files[0]);
      this.setState({
        selectedFile: e.target.files[0],
        loaded: 0
      })
    }

    onClickBoxHandler = () => {
      const data = new FormData() 
      data.append('file', this.state.selectedFile)
      axios.post("http://127.0.0.1:5000/items/upload_file", data, { 
        // receive two parameter endpoint url ,form data 
        
        })
        .then(res => { // then print response status
                  console.log(res.statusText)
                  if(res.data && res.data.length > 0){
                    let items = res.data;
                    this.setState({items: [...items]})
                  }
                  
              })
    }


    render(){

        return (

            <div class="container" style={{margin: "auto", width:"80%"}}>

            <p>{ this.state.fileName }123</p>


              <div class="col-md-6" style={{ position: "relative", width:"20%", }}>
                <form method="post" action="#" id="#">
                  <div class="form-group files">
                      <label>Upload Your File </label>
                      <input type="file" class="form-control" multiple="" onChange={this.onChangeBoxHandler} />
                  </div>
                </form>
                <button type="button" class="btn btn-success btn-block submit" onClick={this.onClickBoxHandler}>Upload</button> 
              </div>

                <div style={{float:"right", position:"relative"}}>   
                        {  "Margin:" + this.state.margin }
                        <button onClick={this.increaseMargin}>+</button>
                        <button onClick={this.decreaseMargin}>-</button>
                        <button class="submit" onClick={this.applyPriceMargin}>Apply</button>
                      </div>
                <table  id="uploadTable">
                  <thead>
                      { ["barcode", "name", "cost", "price", "amount", ""].map( (i) => (<th style={thStyle}> {i}</th>) ) }
                  </thead>
                  <tbody>
                    <ItemsTable 
                      items={ this.state.items } 
                      handleClick = {this.handleClick} 
                      changeAmount = { this.changeAmount }
                      deleteItem = {this.deleteItem}
                    />
                  </tbody>
                </table>
                <button type="button" class="btn btn-success btn-block submit" 
                  onClick={this.onClickTableSubmitHandler}>Save to Database</button> 

            </div>
        )
    }
}

  const thStyle = {
    paddingTop: "12px",
    paddingLeft: "15px",
    paddingBottom: "12px",
    textAlign: "left",
    backgroundColor: "#0099ff",
    color: "white"
  };



  ReactDOM.render(
    <UploadItemsTable />,
    document.getElementById("uploadTable"))