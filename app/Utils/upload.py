import os
import uuid

from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file_extension(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_image(file):
    if file.filename == '':
        return False
    if file and allowed_file_extension(file.filename):
        file_extension = os.path.splitext(file.filename)[1]
        unique_id = uuid.uuid4()
        unique_filename = f"{unique_id}{file_extension}"

        filename = secure_filename(unique_filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return filename
    else: 
        return False