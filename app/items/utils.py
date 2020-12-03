from flask import current_app, flash
from datetime import datetime
from app import db
from app.models import Item
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
        print(row)
        # redo as dict!
        write_item(item)
    flash("Items successfully stored in database.")

def write_item(data):
    """
    Utility function for pushing an item to the db

    :data: = {
            barcode:int - actual product barcode (used for scanning via app)
            name:str - product name
            amount:int
            price:int
    """
    ts = datetime.now().strftime("%Y%m%d%H%M")
    data["id"] = int(ts + str(random.randint(100,999)))
    item = Item(**data)

    try:
        db.session.add(item)
        db.session.commit()

    except Exception as e:
        flash(e)