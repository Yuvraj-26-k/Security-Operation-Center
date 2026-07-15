from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.db import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    severity = Column(
        String(20),
        nullable=False,
    )

    status = Column(
        String(30),
        nullable=False,
        default="Open",
    )

    event_type = Column(
        String(100),
        nullable=False,
    )

    mitre_tactic = Column(
        String(100),
        nullable=False,
    )

    mitre_technique = Column(
        String(50),
        nullable=False,
    )

    source_ip = Column(
        String(50),
        nullable=False,
    )

    destination_ip = Column(
        String(50),
        nullable=False,
    )

    hostname = Column(
        String(100),
        nullable=False,
    )

    username = Column(
        String(100),
        nullable=False,
    )

    risk_score = Column(
        Integer,
        nullable=False,
    )

    assigned_to = Column(
        String(100),
        nullable=True,
    )

    notes = Column(
        String(1000),
        nullable=True,
    )

    false_positive = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    event_id = Column(
        Integer,
        ForeignKey("events.id"),
        nullable=False,
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