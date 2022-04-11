from flask import make_response
from flask_restful import Resource


def _handle_response_obj_with_status_code(func):
    """
    This decorator is needed to return `flask.wrappers.Response` with `status` 
    and `headers` like it usually works with flask's views. Handling the
    following code without this decorator would be impossible:
    ```
        return jsonify(data), 200
    ```
    """
    def wrapped_function(*args, **kwargs):
        return make_response(func(*args, **kwargs))

    return wrapped_function


class BaseResource(Resource):
    @_handle_response_obj_with_status_code
    def dispatch_request(self, *args, **kwargs):
        return super(BaseResource, self).dispatch_request(*args, **kwargs)
