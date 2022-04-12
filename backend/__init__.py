import os

from flask import Flask

from .api import api_blueprint
from .extensions import db, ma, migrate, cors
from .utils import ExtendedJSONEncoder


BLUEPRINTS = (
    api_blueprint,
)


def create_app():
    app = Flask(__name__)
    app.json_encoder = ExtendedJSONEncoder

    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)

    os.environ.setdefault('CONFIG', 'config/base.py')
    app.config.from_envvar('CONFIG')

    cors.init_app(app, origins=app.config['ALLOWED_ORIGINS'])

    db.init_app(app)
    migrate.init_app(app, db, compare_type=True, compare_server_default=True)
    ma.init_app(app)
    return app
