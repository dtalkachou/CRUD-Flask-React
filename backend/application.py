from flask import jsonify
from requests import codes
from werkzeug.exceptions import HTTPException

from . import create_app

application = create_app()


@application.errorhandler(Exception)
def handle_error(e):
    if isinstance(e, HTTPException):
        return e
    return jsonify({'message': 'Unexpected error'}), codes.INTERNAL_SERVER_ERROR
