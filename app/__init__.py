from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from flask_bootstrap import Bootstrap

bootstrap = Bootstrap()
db = SQLAlchemy()
migrate = Migrate()


def create_app(config_class=Config):

    ### Create app instance with configs ###
    app = Flask(__name__)
    app.config.from_object(config_class)

    bootstrap.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    
    ### Register blueprints ###

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    # Depticated module, to be removed
    from app.table import bp as table_bp
    app.register_blueprint(table_bp)

    # Warehouse overview (table)
    from app.items import bp as items_bp
    app.register_blueprint(items_bp, url_prefix='/items')

    # Transactions (sale module + history)
    from app.transactions import bp as transactions_bp
    app.register_blueprint(transactions_bp, url_prefix='/transactions')

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    # Authorisation
    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app


from app import models
