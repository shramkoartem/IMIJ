from flask import render_template
from flask import request
from flask import jsonify
from app.transactions import bp



@bp.route('/transaction', methods=["GET", "POST"])
def transaction():
    """
    Transactions page. Main logic in javascript file "autocomplete_items.js".
    1. Calls AJAX datasource endpoint 'items/get_data()', 
        retrieves all data from db for autocomplete function 
    2. React renders editable list of items in transaction (basket)
    3. TODO handle PUSH of basket when transaction is completed
    """
    return render_template('transactions/transaction.html')


@bp.route('/push_basket', methods=["POST"])
def push_basket():
    rData = request.get_json()
    print(rData)
    return jsonify({'status' : 'success'})
    