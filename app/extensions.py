from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy


api = Api(
    version='1.0',
    title='Tracking-App API',
    doc="/api",
)

db = SQLAlchemy()