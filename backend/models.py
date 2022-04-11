from datetime import datetime

from .extensions import db


class Shipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    weight = db.Column(db.Numeric(precision=6, scale=2), nullable=False)
    address = db.Column(db.String(250))
    shipper = db.Column(db.String(250))
    sent_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
