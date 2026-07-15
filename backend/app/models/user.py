from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    username = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash = Column(
        String(255),
        nullable=False,
    )

    full_name = Column(
        String(120),
        nullable=False,
    )

    role = Column(
        String(30),
        nullable=False,
        default="SOC Analyst",
    )

    department = Column(
        String(50),
        nullable=False,
        default="SOC",
    )

    avatar = Column(
        String(255),
        nullable=True,
    )

    phone = Column(
        String(30),
        nullable=True,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )

    is_superuser = Column(
        Boolean,
        nullable=False,
        default=False,
    )

    failed_login_attempts = Column(
        Integer,
        nullable=False,
        default=0,
    )

    last_login = Column(
        DateTime,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    def __repr__(self):
        return (
            f"<User("
            f"id={self.id}, "
            f"username='{self.username}', "
            f"role='{self.role}'"
            f")>"
        )