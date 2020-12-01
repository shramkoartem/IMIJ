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

    # Error logging
    if not app.debug and not app.testing:    

        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/imij.log',
                                            maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('IMIJ app')


    return app


from app import models
