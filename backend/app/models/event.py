from app import db
from sqlalchemy.sql import func

class Event(db.Model):
    # Change to uuid for id 
    id = db.Column(db.Integer, primary_key=True)
    # add  db.ForeignKey('user.id') to user id when user model created
    user_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(100), nullable=False)     
    repeat_frequency = db.Column(db.String(100), nullable=True)                # daily, weekly, etc
    category = db.Column(db.String(50), nullable=True)                         # habits, goals, etc
    last_checked = db.Column(db.DateTime(timezone=True), nullable=True)                      
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # updated_at is automatically updated on change from routes
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), server_onupdate=func.now())

    def __repr__(self):
        return f"Event: event_id={self.id}, user_id={self.user_id}, description={self.description}"
    
    def __init__(self, user_id, description, repeat_frequency=None, category=None, last_checked=None):
        self.user_id = user_id
        self.description = description
        self.repeat_frequency = repeat_frequency
        self.category = category
        self.last_checked = last_checked