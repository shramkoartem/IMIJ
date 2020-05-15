from app import db


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    barcode = db.Column(db.Integer, index=True, unique=True)
    name = db.Column(db.String(128), index=True, unique=True)
    amount = db.Column(db.Integer)
    price = db.Column(db.Integer)

    def __repr__(self):
        return f"Item: {self.name}"

