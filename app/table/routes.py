from flask import render_template
from flask import request
from app.table import bp
import csv


@bp.route('/table', methods=['GET', 'POST'])
def table():
    if request.method == 'GET':
        return render_template('table/table.html')
    elif request.method == 'POST':
        results = []

        user_csv = request.form.get('user_csv').split('\n')
        reader = csv.DictReader(user_csv)

        for row in reader:
            results.append(dict(row))

        fieldnames = [key for key in results[0].keys()]

        return render_template('table/table.html',
                               results=results,
                               fieldnames=fieldnames, len=len)


@bp.route('/editable_table', methods=['GET', 'POST'])
def etable():
    return render_template('table/editable_html5.html', title='HTML5')

