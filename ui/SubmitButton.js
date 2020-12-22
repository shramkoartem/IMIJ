import React from 'react';

export default function SubmitButton(props){

    function submit_data(basket) {
        let transaction = {
            basket: basket,
            discount: document.querySelector("#discount").value,
            total_sum: document.querySelector("#final_total").innerText
        }
       
        $.ajax({
            // replace by correct endpoint
            url: '{{ url_for("../app/transactions/push_basket") }}',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(transaction),
            success: data => alert(data.status)
        }); 
    }

    const buttonStyle = {
        borderRadius: 2,
        height: 40,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
        paddingLeft: 10
      }

    return (
        <button style={buttonStyle} onClick={() => submit_data(props.basket)}>Submit</button>
    )
}