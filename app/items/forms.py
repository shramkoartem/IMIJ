from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class AddItemForm(FlaskForm):
    barcode = IntegerField('Barcode', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    amount = IntegerField("Amount", validators=[DataRequired()])
    price = IntegerField("Price",validators=[DataRequired()])
    submit = SubmitField("Add item")


class WriteData(FlaskForm):
    submit = SubmitField("Upload")

