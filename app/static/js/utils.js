

// -- Transaction --
// POST AJAX func for basket
// Flask endpoint "transactions.push_basket"

function submit_data() {
    $.ajax({
        url: '{{ url_for("transactions.push_basket") }}',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(basket),
        //success: function(data) { alert(data.status); }
        success: data => {alert(data.status);}
    }); 
}