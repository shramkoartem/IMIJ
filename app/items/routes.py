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


@bp.route('/autocomplete', methods=["GET", "POST"])
def autocomplete():
    """
    Transactions page. Main logic in javascript file "autocomplete_items.js".
    1. Calls AJAX datasource endpoint 'get_data()', 
        retrieves all data from db for autocomplete function 
    2. React renders editable list of items in transaction (basket)
    3. TODO handle PUSH of basket when transaction is completed
    """
    return render_template('items/autocomplete.html')

#####################################################################################

"""
AJAX sourced DataTable instance

:f get_data(): returns JSON 
"""

@bp.route('/datatable_ajax', methods=["GET", "POST"])
def datatable_ajax():
    """
    AJAX sourced DataTable instance.

    :f get_data(): returns JSON for the datatable 
                   rendered on this page (see below)

    """
    return render_template("items/ajax_test.html")


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


