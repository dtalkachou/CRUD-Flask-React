from extensions import create_app
from models import Shipment


application = create_app()


@application.route('/', methods=['GET'])
def index():
    return 'Hello World!'
