from flask import current_app, flash
from datetime import datetime
from app import db
from app.models import Item


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]


def write_items(data):
    items_list = data
    ts = datetime.now().strftime("%Y%m%d%H%M")
    for i, row in enumerate(items_list):
        print(row)
        # redo as dict!
        item = Item(id=int(ts + str(i)),
                    barcode=row["barcode"],
                    name=row['name'],
                    amount=row['amount'],
                    price=row['price'])
        try:
            db.session.add(item)
            db.session.commit()
        except Exception as e:
            flash(e)
    flash("Items successfully stored in database.")
