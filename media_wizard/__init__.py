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
        file_count = 0
        dir_count = 0
        path = flask.request.form['path']
        app.logger.debug(path)
        for dirName, subdirList, fileList in os.walk(path):
            app.logger.debug(f'Found directory: {dirName}')
            dir_count += 1
            for fname in fileList:
                photo = parse_image(fname)
                if photo:
                    app.logger.debug(f'\t{fname}')
                    file_count += 1
        return flask.jsonify(dirs=dir_count, files=file_count)


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
