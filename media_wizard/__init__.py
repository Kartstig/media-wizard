import flask, logging, os

from media_wizard.config import AppConfig


def create_app():
    app = flask.Flask(__name__)

    app.config.from_object(AppConfig._asdict())

    @app.before_first_request
    def setup_logging():
        app.logger.addHandler(logging.FileHandler(AppConfig.LOG_FILE))
        app.logger.setLevel(AppConfig.LOG_LEVEL)

    @app.route('/')
    def index():
        bindings = {}

        return flask.render_template('index.html', bindings=bindings)

    def parse_image(filename):
        ext = filename.split('.')[-1].lower()
        if ext == 'jpg' \
                or ext == 'png'\
                or ext == 'gif'\
                or ext == 'cr2'\
                or ext == 'tif':
            return filename

    @app.route('/action/scan', methods=['POST'])
    def scan():
        content = flask.request.get_json()
        path = content['path']
        data = {}
        for dirName, subdirList, fileList in os.walk(path):
            for fname in fileList:
                photo = parse_image(fname)
                if photo:
                    if not dirName in data:
                        data[dirName] = {
                            'files': [],
                            'count': 0
                        }
                    data[dirName]['count'] += 1
                    data[dirName]['files'].append(fname)
        return flask.jsonify(results=data)


    @app.errorhandler(404)
    def page_not_found(e):
        return flask.render_template('404.html'), 404

    @app.errorhandler(401)
    def unauthorized(e):
        return flask.render_template('401.html'), 401

    @app.errorhandler(500)
    def internal_server_error(e):
        return flask.render_template('500.html'), 500

    return app
