from flask import Blueprint, jsonify, request
from flask_restx import Resource, Namespace, fields, reqparse

from datetime import date, datetime

from sqlalchemy import desc

orders = Namespace("api/orders", description="Order Related Operations")

from ..Models.models import Order
from ..Models.api_models import orders_model, order_model, order_input_model, order_response_model

from ..extensions import db

query_params = reqparse.RequestParser()
query_params.add_argument("filter_by", help="Filter orders based on input")
query_params.add_argument("sort_by", help="Sort by Ascending/Descending")
query_params.add_argument("offset", type=int, help="Offset the results by default it returns 20")
query_params.add_argument("limit", type=int, help="Limits the amount of returned results")
query_params.add_argument("page", type=int, help="start from what page")

@orders.route("/")
class OrdersAPI(Resource):
    @orders.expect(query_params)
    @orders.marshal_list_with(order_response_model, mask=False)
    def get(self):
        args = query_params.parse_args()

        sort_by = args.get("sort_by")
        filter_by = args.get("filter_by")
        offset = args.get('offset')
        if not offset: 
            offset = 0
        limit = args.get("limit")
        if not limit:
            limit = 20
        page = args.get("page")
        if not page:
            page = 0

        query = Order.query
        if sort_by:
            match sort_by:
                case "newest":
                    query = query.order_by(Order.date_added.desc())
                case "oldest":
                    query = query.order_by(Order.date_added)
                case "date_descending":
                    query = query.order_by(Order.purchase_date.desc())
                case _:
                    query = query.order_by(Order.purchase_date)
                
        if filter_by:
            query = query.where(Order.name.contains(f"%{filter_by}%"))
        if page:
            offset = (page * limit) + offset

        return {
            "data": query.offset(offset).limit(limit).all(),
            "total": query.count()
        }
    
    @orders.expect(order_input_model)
    @orders.marshal_with(orders_model, mask=False)
    def post(self):
        order = Order(
            name=orders.payload["name"],
            description=orders.payload["description"],
            purchase_date=date.fromisoformat(orders.payload["purchase_date"]),
            purchase_price=orders.payload["purchase_price"],
            delivered_date=date.fromisoformat(orders.payload["delivered_date"]),
            source=orders.payload["source"],
            img_path=orders.payload["img_path"],
            status=orders.payload["status"],
            date_added = datetime.now(),
            date_updated = datetime.now()
            )
        db.session.add(order)
        db.session.commit()
        return order, 201
    
@orders.route("/<int:id>")
class OrderAPI(Resource):
    @orders.marshal_list_with(order_model, mask=False)
    def get(self, id):
        return Order.query.get(id)
    
    @orders.expect(order_input_model)
    @orders.marshal_with(order_model, mask=False)
    def put(self, id):
        order = Order.query.get(id)
        order.name = orders.payload["name"]
        order.description = orders.payload["description"]
        order.purchase_date = date.fromisoformat(orders.payload["purchase_date"])
        order.purchase_price=orders.payload["purchase_price"]
        order.delivered_date = date.fromisoformat(orders.payload["delivered_date"])
        order.source = orders.payload["source"]
        order.img_path = orders.payload["img_path"] 
        order.status = orders.payload["status"]
        order.date_updated = datetime.now()
        db.session.commit()
        return order, 204

    def delete(self, id):
        order = Order.query.get(id)
        if not order:
            return {}, 204
        db.session.delete(order)
        db.session.commit()
        return {}, 200