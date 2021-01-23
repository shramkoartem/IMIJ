from flask import current_app, flash
from datetime import datetime
from app import db
from app.models import Item, ItemHistory
import random


def allowed_file(filename):
    """
    Utlity function
    Validates filename upon file upload
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]


def write_items(data):
    """
    Utility function for pushing an item to the db

    :data:  list of dicts
        dict = {
            id:int - db id (not barcode), generated as a timestamp + index in list
            barcode:int - actual product barcode (used for scanning via app)
            name:str - product name
            amount:int
            price:int
    }
    """
    items_list = data

    for i, item in enumerate(items_list):
        print(item)
        # redo as dict!
        existing_item = Item.query.filter_by(barcode = item["barcode"]).first()

        # Check if item already exists and update info
        if existing_item:
            existing_item.amount += int(item["amount"])
            existing_item.price = int(item["price"])
            existing_item.cost = int(item["cost"])
            db.session.commit() 

        # else save new item
        else :
            write_item(item)

        # Log change in Items History    
        write_item_history(item, "in")

    flash("Items successfully stored in database.")

def write_item(data):
    """
    Utility function for pushing an item to the db

    :data: = {
            barcode:int - actual product barcode (used for scanning via app)
            name:str - product name
            amount:int
            price:int
            cost:int
    """
    ts = datetime.now().strftime("%Y%m%d%H%M")
    data["id"] = int(ts + str(random.randint(100,999)))
    item = Item(**data)

    try:
        db.session.add(item)
        db.session.commit()

    except Exception as e:
        flash(e)


def write_item_history(data, transaction_type):
    """
    Utility function for saving Item change in history log

    :data: = {
        barcode:int - actual product barcode (used for scanning via app)
        name:str - product name
        amount:int
        price:int
        cost:int
    """
    ts = datetime.now().strftime("%Y%m%d%H%M")
    data["id"] =  int("00" + ts + str(random.randint(100,999)))
    data["transaction_type"] = transaction_type
    item = ItemHistory(**data)
    try:
        db.session.add(item)
        db.session.commit()

    except Exception as e:
        flash(e)

