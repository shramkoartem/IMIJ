from app import db


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True) # always starts with 1
    barcode = db.Column(db.Integer, index=True, unique=True)
    name = db.Column(db.String(128), index=True, unique=True)
    amount = db.Column(db.Integer)
    price = db.Column(db.Float)

    def __repr__(self):
        return f"Item: {self.name}"

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True) # starts with 2
    items = db.Column(db.Text)
    discount = db.Column(db.Integer, default=1)
    price = db.Column(db.Float, default=0)
    comment = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
