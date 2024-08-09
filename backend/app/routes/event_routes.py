from flask import Blueprint, request
from app import db
from app.models.event import Event
from app.utils.helpers import format_event

bp = Blueprint('events', __name__)

# create an event for user
@bp.route('/<int:user_id>/events', methods=['POST'])
def create_event(user_id):
    description = request.json['description']

    # use .get to check if theyre None or not
    repeat_frequency = request.json.get('repeat_frequency')
    category = request.json.get('category')
    last_checked = request.json.get('last_checked')
    event = Event(user_id, description, repeat_frequency, category, last_checked)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

# get all events for all users
@bp.route('/events', methods=['GET'])
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    events_list = []
    for event in events:
        events_list.append(format_event(event))
    return {'events': events_list}

# get all events for user
@bp.route('/<int:user_id>/events', methods=['GET'])
def get_user_events(user_id):
    events = Event.query.filter_by(user_id=user_id).all()
    user_events = []
    for event in events:
        user_events.append(format_event(event))
    return {f'user {user_id} events': user_events}

# get event for user
@bp.route('/<int:user_id>/events/<int:id>', methods=['GET'])
def get_user_event(user_id, id):
    event = Event.query.filter_by(user_id=user_id).filter_by(id=id).one()
    return {f'Event id: {id}': format_event(event)}

# delete event from user 
@bp.route('/<int:user_id>/events/<int:id>', methods=['DELETE'])
def delete_user_event(user_id, id):
    event = Event.query.filter_by(user_id=user_id).filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f'Event (id: {id}) deleted'

# edit event for user
@bp.route('/<int:user_id>/events/<int:id>', methods=['PUT'])
def edit_user_event(user_id, id):
    event = Event.query.filter_by(user_id=user_id).filter_by(id=id).one()

    # For each event field, check if it is editable
    fields = ['description', 'repeat_frequency', 'category', 'last_checked']
    for field in fields:
        if field in request.json:
            setattr(event, field, request.json[field])

    db.session.commit()
    return {'event': format_event(event)}

# get events for specific for user, with specific category

# get events for user based off repeat_frequency?