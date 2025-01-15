from flask_restx import fields

from ..extensions import api

item_model = api.model("Item", {
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "status": fields.String,
})

orders_model = api.model("Orders", {
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "purchase_date": fields.Date,
    "delivered_date": fields.Date,
    "source": fields.String,
    "img_path": fields.String,
    "status": fields.String
})

order_model = api.model("Order", {
    "id": fields.String,
    "name": fields.String,
    "description": fields.String,
    "purchase_date": fields.Date,
    "delivered_date": fields.Date,
    "source": fields.String,
    "img_path": fields.String,
    "status": fields.String,
    "items": fields.List(fields.Nested(item_model))
})

order_response_model = api.model('OrderResponse', {
    'data': fields.List(fields.Nested(order_model)),
    'total': fields.Integer
})

order_input_model = api.model("OrderInput", {
    "name": fields.String,
    "description": fields.String,
    "purchase_date": fields.Date,
    "delivered_date": fields.Date,
    "source": fields.String,
    "img_path": fields.String,
    "status": fields.String
})