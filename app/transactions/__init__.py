from flask import Blueprint

bp = Blueprint('transactions', __name__)

from app.transactions import routes
