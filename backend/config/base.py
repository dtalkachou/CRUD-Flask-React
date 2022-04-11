import os


__all__ = [
    "SQLALCHEMY_DATABASE_URI",
    "SQLALCHEMY_TRACK_MODIFICATIONS",
]


def bool_from_env(key, default="true") -> bool:
    default = default.lower()
    value = os.environ.get(key, default).lower() == "true"
    return value


DEBUG = bool_from_env(key="FLASK_DEBUG", default="false")

SQLALCHEMY_TRACK_MODIFICATIONS = bool_from_env(
    key="SQLALCHEMY_TRACK_MODIFICATIONS", default="false"
)
SQLALCHEMY_DATABASE_URI = (
    f"sqlite:///../docker-data/sqlite3.db"
)
