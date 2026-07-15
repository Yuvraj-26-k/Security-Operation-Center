from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.db import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    timestamp = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    source_ip = Column(
        String,
        nullable=False,
    )

    destination_ip = Column(
        String,
        nullable=False,
    )

    country = Column(
        String,
        nullable=False,
    )

    city = Column(
        String,
        nullable=False,
    )

    latitude = Column(
        Float,
        nullable=False,
    )

    longitude = Column(
        Float,
        nullable=False,
    )

    hostname = Column(
        String,
        nullable=False,
    )

    username = Column(
        String,
        nullable=False,
    )

    operating_system = Column(
        String,
        nullable=False,
    )

    process_name = Column(
        String,
        nullable=False,
    )

    protocol = Column(
        String,
        nullable=False,
    )

    port = Column(
        Integer,
        nullable=False,
    )

    event_type = Column(
        String,
        nullable=False,
    )

    severity = Column(
        String,
        nullable=False,
    )

    mitre_tactic = Column(
        String,
        nullable=False,
    )

    mitre_technique = Column(
        String,
        nullable=False,
    )

    cve = Column(
        String,
        nullable=False,
    )

    ioc = Column(
        String,
        nullable=False,
    )

    malware_family = Column(
        String,
        nullable=False,
    )

    risk_score = Column(
        Integer,
        nullable=False,
    )

    status = Column(
        String,
        default="Open",
        nullable=False,
    )

    description = Column(
        String,
        nullable=False,
    )

    # ==========================
    # Attack Map Fields
    # ==========================

    source_country = Column(
        String,
        nullable=False,
        default="Unknown",
    )

    destination_country = Column(
        String,
        nullable=False,
        default="Unknown",
    )

    source_city = Column(
        String,
        nullable=False,
        default="Unknown",
    )

    destination_city = Column(
        String,
        nullable=False,
        default="Unknown",
    )

    source_latitude = Column(
        Float,
        nullable=False,
        default=0,
    )

    source_longitude = Column(
        Float,
        nullable=False,
        default=0,
    )

    destination_latitude = Column(
        Float,
        nullable=False,
        default=0,
    )

    destination_longitude = Column(
        Float,
        nullable=False,
        default=0,
    )

    source_map_x = Column(
        Float,
        nullable=False,
        default=0,
    )

    source_map_y = Column(
        Float,
        nullable=False,
        default=0,
    )

    destination_map_x = Column(
        Float,
        nullable=False,
        default=0,
    )

    destination_map_y = Column(
        Float,
        nullable=False,
        default=0,
    )