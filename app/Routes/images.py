from flask import Blueprint, request, send_from_directory

def setup_image_routes(app):
    images = Blueprint('images', __name__)

    @images.route('/images/<path:filename>')
    def serve_image(filename):
        return send_from_directory("../images", filename)

    app.register_blueprint(images)