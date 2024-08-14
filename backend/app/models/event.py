from app import db
from sqlalchemy.sql import func
import uuid

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    # user_id is added in event_routes, it's the 
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('events', lazy=True))
    description = db.Column(db.String(100), nullable=False)     
    repeat_frequency = db.Column(db.String(100), nullable=True)  # daily, weekly, etc
    category = db.Column(db.String(50), nullable=True)           # habits, goals, etc
    last_checked = db.Column(db.DateTime(timezone=True), nullable=True)                      
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"Event: event_id={self.id}, user_id={self.user_id}, description={self.description}"
    
    def __init__(self, user_id, description, repeat_frequency=None, category=None, last_checked=None):
        self.user_id = user_id
        self.description = description
        self.repeat_frequency = repeat_frequency
        self.category = category
        self.last_checked = last_checked