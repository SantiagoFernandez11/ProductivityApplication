from flask import Blueprint, request, jsonify
from app import db
from app.models.event import Event
from app.utils.helpers import format_event
from flask_jwt_extended import jwt_required, get_jwt_identity
from uuid import UUID

bp = Blueprint('events', __name__)

# Helper function to validate UUID
def is_valid_uuid(uuid_string):
    try:
        UUID(uuid_string)
        return True
    except ValueError:
        return False

# create an event for user
@bp.route('/<string:user_id>/events', methods=['POST'])
@jwt_required()
def create_event(user_id):
    if not is_valid_uuid(user_id):
        return jsonify({"msg": "Invalid user ID"}), 400
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
    description = request.json['description']
    repeat_frequency = request.json.get('repeat_frequency')
    category = request.json.get('category')
    last_checked = request.json.get('last_checked')
    event = Event(user_id, description, repeat_frequency, category, last_checked)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

# get all events for all users
@bp.route('/events', methods=['GET'])
@jwt_required()
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    events_list = []
    for event in events:
        events_list.append(format_event(event))
    return {'events': events_list}

# get all events for user
@bp.route('/<string:user_id>/events', methods=['GET'])
@jwt_required()
def get_user_events(user_id):
    if not is_valid_uuid(user_id):
        return jsonify({"msg": "Invalid user ID"}), 400
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
    events = Event.query.filter_by(user_id=user_id).all()
    user_events = []
    for event in events:
        user_events.append(format_event(event))
    return {f'user {user_id} events': user_events}

# get event for user
@bp.route('/<string:user_id>/events/<string:id>', methods=['GET'])
@jwt_required()
def get_user_event(user_id, id):
    if not is_valid_uuid(user_id) or not is_valid_uuid(id):
        return jsonify({"msg": "Invalid user ID or event ID"}), 400
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
    event = Event.query.filter_by(user_id=user_id, id=id).first()
    if not event:
        return jsonify({"msg": "Event not found"}), 404
    return {f'Event id: {id}': format_event(event)}

# delete event from user 
@bp.route('/<string:user_id>/events/<string:id>', methods=['DELETE'])
@jwt_required()
def delete_user_event(user_id, id):
    if not is_valid_uuid(user_id) or not is_valid_uuid(id):
        return jsonify({"msg": "Invalid user ID or event ID"}), 400
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
    event = Event.query.filter_by(user_id=user_id, id=id).first()
    if not event:
        return jsonify({"msg": "Event not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return f'Event (id: {id}) deleted'

# edit event for user
@bp.route('/<string:user_id>/events/<string:id>', methods=['PUT'])
@jwt_required()
def edit_user_event(user_id, id):
    if not is_valid_uuid(user_id) or not is_valid_uuid(id):
        return jsonify({"msg": "Invalid user ID or event ID"}), 400
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
    event = Event.query.filter_by(user_id=user_id, id=id).first()
    if not event:
        return jsonify({"msg": "Event not found"}), 404

    fields = ['description', 'repeat_frequency', 'category', 'last_checked']
    for field in fields:
        if field in request.json:
            setattr(event, field, request.json[field])

    db.session.commit()
    return {'event': format_event(event)}

# get events for specific category for user
@bp.route('/<string:user_id>/events/category/<string:category>', methods=['GET'])
@jwt_required()
def get_user_events_by_category(user_id, category):
    if not is_valid_uuid(user_id):
        return jsonify({"msg": "Invalid user ID"}), 400
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
    events = Event.query.filter_by(user_id=user_id, category=category).all()
    return {f'user_{user_id}_events_category_{category}': [format_event(event) for event in events]}

# get events for user based off repeat_frequency
@bp.route('/<string:user_id>/events/frequency/<string:frequency>', methods=['GET'])
@jwt_required()
def get_user_events_by_frequency(user_id, frequency):
    if not is_valid_uuid(user_id):
        return jsonify({"msg": "Invalid user ID"}), 400
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
    events = Event.query.filter_by(user_id=user_id, repeat_frequency=frequency).all()
    return {f'user_{user_id}_events_frequency_{frequency}': [format_event(event) for event in events]}