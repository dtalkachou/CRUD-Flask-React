
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../docker-data/shipmets.db'

    db.init_app(app)
    migrate.init_app(app, db, compare_type=True, compare_server_default=True)
    ma.init_app(app)
    return app
