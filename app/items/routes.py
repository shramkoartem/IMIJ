import os
import csv
import json
import copy

from flask import current_app
from flask import render_template, jsonify
from flask import request, redirect, flash, session, url_for
from flask_cors import cross_origin

from app.items import bp
from app.items.forms import AddItemForm, WriteData
from app.items.utils import *
from werkzeug.utils import secure_filename
from app.models import Item, ItemHistory
from app import db






#####################################################################################
#
#                               WAREHOUSE TABLE
#
#####################################################################################

"""
AJAX sourced DataTable instance

:f get_data(): returns JSON 
"""

@bp.route('/datatable_ajax', methods=["GET", "POST"])
def datatable_ajax():
    """
    AJAX sourced DataTable instance.
    Contains a modular AddItemForm

    :f get_data(): returns JSON for the datatable 
                   rendered on this page (see below)

    """


    # WTF form for committing a new item to DB
    form = AddItemForm()
    if form.validate_on_submit():
        
        item = {
            "barcode" : form.barcode.data,
            "name" : form.name.data,
            "amount" : form.amount.data,
            "price" : form.price.data
        }
        write_item(item)
        return redirect(url_for('items.datatable_ajax') )

    return render_template("items/items_table_ajax.html", form = form)

#####################################################################################
#
#                               AJAX DATA SOURCE
#
#####################################################################################

@bp.route('/ajax_data/', methods=["GET", "POST"])
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
#
#                               ADD ITEM FORM
#
#####################################################################################

@bp.route('/add_item', methods=["GET", "POST"])
def add_item():
    """
    Renders AddItemForm WTF form  
    for commiting a new item to the db
    """
    form = AddItemForm()
    return render_template('items/add_item.html', title="Add item", form=form)




#####################################################################################
#
#                               UPLOAD ITEMS TABLE
#
#                   React table to edit items from uploaded excel
#                         and submit them to the databse
#
#####################################################################################

@bp.route("upload_table", methods=["GET", "POST"])
def upload_table():

    return render_template("items/uploadTable.html")

# API for file upload
@bp.route("upload_file", methods=["OPTIONS", "POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def upload_file():
    if request.method == "POST":

        f = request.files['file']
        fstring = f.read().decode("utf-8") 
        csv_dicts = [{k: v for k, v in row.items()} 
                    for row in csv.DictReader(fstring.splitlines(), 
                                            skipinitialspace=True)]
        print(csv_dicts)
 
    return jsonify(csv_dicts)


# API for file upload
@bp.route("post_upload_table_data", methods=["OPTIONS", "POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def post_upload_table_data():
    if request.method == "POST":
        
        items = json.loads( request.data.decode("utf-8") )
        #print(items)
        write_items(items)
 
    return jsonify("success")

