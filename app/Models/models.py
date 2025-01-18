from ..extensions import db
from sqlalchemy import *


class Order(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    description = Column(String(500))
    purchase_date = Column(Date)
    delivered_date = Column(Date)
    purchase_price = Column(Integer)
    source = Column(String(50))
    img_path = Column(String(500))
    status = Column(String(50))
    item = db.relationship("Item", back_populates="order")
    date_added = Column(DateTime)
    date_updated = Column(DateTime)


class Item(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    description = Column(String(500))
    status = Column(String(50))
    order_id = Column(ForeignKey("order.id"))
    order = db.relationship("Order", back_populates="item")