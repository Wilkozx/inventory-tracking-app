import os
from flask import Blueprint, request, send_from_directory

def setup_page_routes(app):
    pages = Blueprint('pages', __name__)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, 'index.html')
    
    app.register_blueprint(pages)