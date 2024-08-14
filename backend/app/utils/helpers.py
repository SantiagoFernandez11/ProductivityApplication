def format_event(event):
    return {
        'id': event.id,
        'user_id': event.user_id,
        'description': event.description,
        'repeat_frequency': event.repeat_frequency,
        'category': event.category,
        'last_checked': event.last_checked,
        'created_at': event.created_at,
        'updated_at': event.updated_at,
    }

def format_user(user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at,
        'updated_at': user.updated_at
    }