from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Must create config file on pull with following info
    # class Config:
    #    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/dbName'
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    from .routes import event_routes
    app.register_blueprint(event_routes.bp)

    return app