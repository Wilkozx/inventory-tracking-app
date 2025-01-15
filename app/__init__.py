from flask import Flask
from flask_migrate import Migrate

from flask_cors import CORS

from .extensions import api
from .extensions import db

from .Routes.orders import orders
from .Routes.pages import setup_page_routes

def create_app():
    app = Flask(__name__, static_folder='../frontend/build')
    CORS(app, resources={r"/*": {"origins": "*"}}) # remove on build 

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
    db.init_app(app)
    migrate = Migrate(app, db)

    setup_page_routes(app)
    api.init_app(app)
    api.add_namespace(orders)

    return app
