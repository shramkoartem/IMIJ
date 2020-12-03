from flask import render_template
from flask import request
from flask import jsonify
from flask import session
from app.transactions import bp
from app.models import Item, Transaction
from app import db




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
    """
    1. Receives transaction JSON from PUSH request
    2. Substracts amounts of respective items from Items DB Table
        (matched by barcodes)
    3. Pushes transaction to Transactions DB Table
    """

    # Receives transaction JSON from PUSH request
    request_data = request.get_json()
    print(request_data)

    # Update item amounts in the Items db
    if request_data:
        basket = request_data
        for item in basket:
            push_items_db(item)
         

    return jsonify({'status' : 'success'})
    

def push_items_db(data):
    """
    Updates amount of item in Items DB
    :data: (dict) item = {barcode, name, amount, price}
    """
    item = Item.query.filter_by(barcode = data["barcode"]).first()
    if item:
        item.amount -= data["amount"]
        db.session.commit() 