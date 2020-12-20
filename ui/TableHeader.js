import React from 'react';

export default function THeader(props){
    if(props.basket.length>0){
        return (
            <thead class="thead-light" id="selected-items-thead">
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th></th> 
                </tr>
            </thead>
        )
    } else {
        return null;
    }
}