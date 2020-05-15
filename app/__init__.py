from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from flask_bootstrap import Bootstrap

bootstrap = Bootstrap()
db = SQLAlchemy()
migrate = Migrate()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    bootstrap.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.table import bp as table_bp
    app.register_blueprint(table_bp)

    from app.items import bp as items_bp
    app.register_blueprint(items_bp, url_prefix='/items')

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app


from app import models
