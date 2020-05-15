from flask import Blueprint

bp = Blueprint('items', __name__)

from app.items import routes