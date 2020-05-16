import os
import csv
from flask import current_app
from flask import render_template
from flask import request, redirect, flash, session, url_for
from app.items import bp
from app.items.forms import AddItemForm, WriteData
from werkzeug.utils import secure_filename
from app.models import Item
from datetime import datetime
from app import db
from flask import jsonify


# @bp.route('/items', methods=["GET", "POST"])
# def items():
#     form = AddItemForm()
#     return render_template('items/items_table.html', title="Items in store", form=form)


@bp.route('/add_item', methods=["GET", "POST"])
def add_item():
    form = AddItemForm()
    return render_template('items/add_item.html', title="Add item", form=form)


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}


@bp.route('/items', methods=["GET", "POST"])
def items():
    results = [["Barcode", 'Name', 'Size', 'Price'],
               ['12345', 'Key', 'M', '10']]

    results = [item.__dict__ for item in Item.query.all()]
    # fieldnames = [key for key in results[0].keys() if "_" not in key]
    fieldnames = ["barcode", 'name', 'amount', 'price']

    return render_template('items/items_table.html',
                           results=results,
                           fieldnames=fieldnames, len=len)


@bp.route('/items_editable', methods=['GET', 'POST'])
def items_editable():

    results = [item.__dict__ for item in Item.query.all()]
    # fieldnames = [key for key in results[0].keys() if "_" not in key]
    fieldnames = ["barcode", 'name', 'amount', 'price']

    if request.method == "POST":
        print(request.get_json())

    return render_template('items/items_edit.html',
                           results=results,
                           fieldnames=fieldnames, len=len)



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]


#@bp.route('/write_items_button', methods=["GET", "POST"])
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


@bp.route("/upload_file", methods=["GET", 'POST'])
def upload_file():
    if request.method == "GET":
        return render_template('items/upload_file_form.html', title="Upload file")

    elif request.method == "POST":

        form = WriteData()
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)

        # main logic
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            session['file_path'] = file_path

            return redirect(url_for('items.uploaded_items', file_path=file_path))


@bp.route('/uploaded_items', methods=["GET", "POST"])
def uploaded_items():
    file_path = session['file_path']
    data = []
    with open(file_path) as csvfile:
        f = csv.DictReader(open(file_path))
        for row in f:
            data.append(row)

    fieldnames = ["barcode", 'name', 'amount', 'price']

    if request.method == "POST":
        write_items(data)

    return render_template('items/upload_items_table.html', title="Upload file",
                           results=data,
                           fieldnames=fieldnames,
                           len=len)

#
# @bp.route('/postmethod', methods = ['POST'])
# def get_post_javascript_data():
#     jsdata = request.form['javascript_data']
#     print(jsdata)
#     return jsdata

#
# @app.route('/postmethod', methods = ['POST'])
# def get_post_javascript_data():
#     jsdata = request.form['javascript_data']
#     return jsdata

@bp.route("/upload_file1", methods=["GET", 'POST'])
def upload_file1():

    results = [item.__dict__ for item in Item.query.all()]
    fieldnames = ["barcode", 'name', 'amount', 'price']

    # if request.method == "GET":
    #     queryStringDict = request.args
    #     print(queryStringDict)
    #     #return render_template('items/upload_file_form.html', title="Upload file")

    if request.method == "POST":
        queryStringDict = request.get_json(force=True)
        print(queryStringDict)
        flash('success')
        return redirect(url_for('main.index'))
        # jsdata = request.form['javascript_data']
        # print()

    return render_template('items/items_edit.html',
                           results=results,
                           fieldnames=fieldnames, len=len)
    #
    # Request URL: http://127.0.0.1:5000/items/uploaded_items?file_path=%2Fhome%2Fle-roy%2FDocuments%2Fpy%2FIMIJ%2Ftemp%2Fdata.csv



