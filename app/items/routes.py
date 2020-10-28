import os
import csv
from flask import current_app
from flask import render_template, jsonify
from flask import request, redirect, flash, session, url_for
from app.items import bp
from app.items.forms import AddItemForm, WriteData
from app.items.utils import *
from werkzeug.utils import secure_filename
from app.models import Item
from app import db


@bp.route('/add_item', methods=["GET", "POST"])
def add_item():
    form = AddItemForm()
    return render_template('items/add_item.html', title="Add item", form=form)


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


@bp.route('/autocomplete', methods=["GET", "POST"])
def autocomplete():
    return render_template('items/autocomplete.html')

#####################################################################################

"""
AJAX sourced DataTable instance

:f get_data(): returns JSON 
"""

@bp.route('/datatable_ajax', methods=["GET", "POST"])
def test_ajax_table():
    items = [item.__dict__ for item in Item.query.all()]
    for item in items:
        item.pop("_sa_instance_state", None)
    print(items[0])
    return render_template("items/ajax_test.html")

@bp.route('/autocomplete_ajax', methods=["GET", "POST"])
def test_autocomplete():
    items = [item.__dict__ for item in Item.query.all()]
    for item in items:
        item.pop("_sa_instance_state", None)
    print(items[0])
    return render_template("items/search_test.html")


@bp.route('/ajax_data/', methods=["POST"])
def get_data():
    """
    AJAX source for DataTable instance.
    Endpoint sourcing db for DataTable instance on POST.
    Enables updating table data without page refresh.
    :return: JSON response containing all items from db
    """
    items = [item.__dict__ for item in Item.query.all()]
    for item in items:
        item.pop("_sa_instance_state", None)
    print(jsonify(items[0]))

    response = {
        "data": items,
        'recordsTotal': len(items),
        'recordsFiltered': len(items),
        'draw': 1,
    }
    return jsonify(response)

#####################################################################################




@bp.route('/items_editable_table/', methods=['GET', 'POST'])
@bp.route('/items_editable_table', methods=['GET', 'POST'])
def items_editable_table():

    data = []
    if session['file_path']:
        file_path = session['file_path']
        print(file_path)
        f = csv.DictReader(open(file_path))
        for row in f:
            data.append(row)

        # clean up session
        session['file_path'] = None
        os.remove(file_path)

    fieldnames = ["barcode", 'name', 'amount', 'price']

    # data = [item.__dict__ for item in Item.query.all()]
    # fieldnames = [key for key in results[0].keys() if "_" not in key]

    if request.method == "POST":
        return redirect(url_for('items.items'))

    return render_template('items/items_table.html',
                           results=data,
                           fieldnames=fieldnames, len=len)


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

            return redirect(url_for('items.items_editable_table', file_path=file_path))


@bp.route("/postmethod", methods=[ 'GET','POST'])
def postmethod():
    queryStringDict = request.get_json(force=True)
    print(queryStringDict)
    flash('Success')
    return jsonify(success=1)
