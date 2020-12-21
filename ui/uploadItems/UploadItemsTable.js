import React from 'react'
import ReactDOM from 'react-dom'

export default class UploadItemsTable extends React.Component {
    constructor(){
        super();
        this.state= {
            items: [],
            fileName: ""
        }
    }
    render(){
        return (
            <div>
                <p>{ this.fileName }</p>
            </div>
        )
    }
}

ReactDOM.render(
    <UploadItemsTable />,
    document.getElementById("uploadTable"))