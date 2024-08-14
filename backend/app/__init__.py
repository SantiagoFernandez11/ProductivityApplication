from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    # Must create config file on pull with following info
    # class Config:
    #    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/dbName'
    #    JWT_SECRET_KEY = 'your-secret-key'
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    from .routes import event_routes, user_routes
    app.register_blueprint(event_routes.bp)
    app.register_blueprint(user_routes.bp)

    return app