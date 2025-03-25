from flask import Flask
from flask_migrate import Migrate

from flask_cors import CORS

from .extensions import api
from .extensions import db

from .Routes.orders import orders
from .Routes.pages import setup_page_routes
from .Routes.images import setup_image_routes

from .Routes.images import UPLOAD_FOLDER

import os

def create_app():
    app = Flask(__name__, static_folder='../frontend/build')
    CORS(app, resources={r"/*": {"origins": "*"}}) # remove on build 

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
    app.config["UPLOAD_FOLDER"] = 'images'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
    db.init_app(app)
    migrate = Migrate(app, db)

    setup_image_routes(app)
    setup_page_routes(app)
    api.init_app(app)
    api.add_namespace(orders)

    return app
