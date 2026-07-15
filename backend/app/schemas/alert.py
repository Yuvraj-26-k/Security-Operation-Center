from datetime import datetime

from pydantic import BaseModel


class AlertBase(BaseModel):
    title: str

    severity: str

    status: str

    event_type: str

    mitre_tactic: str

    mitre_technique: str

    source_ip: str

    destination_ip: str

    hostname: str

    username: str

    risk_score: int

    assigned_to: str | None = None

    notes: str | None = None

    false_positive: bool = False

    event_id: int


class AlertCreate(AlertBase):
    pass


class AlertUpdate(BaseModel):
    status: str | None = None

    assigned_to: str | None = None

    notes: str | None = None

    false_positive: bool | None = None


class AlertResponse(AlertBase):
    id: int

    created_at: datetime

    updated_at: datetime

    class Config:
        from_attributes = True