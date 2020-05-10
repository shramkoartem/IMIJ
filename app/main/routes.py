from flask import render_template
from flask import request
from app.main import bp

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('base.html')#, title='Home')