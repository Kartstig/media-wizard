import os
from collections import namedtuple


Config = namedtuple('Config',
    [
        'APP_PORT',
        'DB_HOST',
        'DB_PASSWORD',
        'DB_NAME',
        'DB_URI',
        'DB_USER',
        'LOG_FILE',
        'LOG_LEVEL'
    ]
)

AppConfig = Config(
    APP_PORT=os.environ.get('APP_PORT'),
    DB_HOST=os.environ.get('DB_HOST', 'localhost'),
    DB_PASSWORD=os.environ.get('DB_PASSWORD'),
    DB_NAME=os.environ.get('DB_NAME'),
    DB_URI=os.environ.get('DB_URI'),
    DB_USER=os.environ.get('DB_USER'),
    LOG_FILE=os.environ.get('LOG_FILE'),
    LOG_LEVEL=os.environ.get('LOG_LEVEL')
)
