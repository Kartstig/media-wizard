from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from media_wizard.config import AppConfig


def get_db_uri():
    if AppConfig.db_uri:
        return AppConfig.db_uri
    else:
        return 'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'\
            .format(**AppConfig._asdict())

@contextmanager
def get_session():
    uri = get_db_uri()
    engine = create_engine(uri)
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        yield session
    except:
        session.rollback()
        raise
    finally:
        session.close()
