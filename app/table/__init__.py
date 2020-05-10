from flask import Blueprint

bp = Blueprint('table', __name__)

from app.table import routes