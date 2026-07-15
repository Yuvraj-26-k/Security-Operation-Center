from app.statistics.dashboard_stats import dashboard_stats
from app.sysmon.live_engine import live_engine
from app.sysmon.worker import run as sysmon_worker
from app.detection.engine import engine as detection_engine_instance
from app.api.alerts import router as alerts_router
from app.services.alert_engine import process_event
import asyncio
import threading
import time
from collections import Counter

from fastapi import Depends
from fastapi import FastAPI
from fastapi import WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.api.auth import router as auth_router


from app.attackmap.routes.attackmap import (
    router as attackmap_router,
)

from app.database.db import (
    Base,
    SessionLocal,
    engine,
    get_db,
)

from app.models.event import Event


from app.websocket.manager import manager


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="SentinelSOC API",
    version="2.0.0",
    description="Enterprise Security Operations Center Backend",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(alerts_router)

app.include_router(attackmap_router)




def serialize(event: Event):

    return {

        "id": event.id,

        "timestamp": event.timestamp.isoformat(),

        "source_ip": event.source_ip,

        "destination_ip": event.destination_ip,

        "country": event.country,

        "city": event.city,

        "latitude": event.latitude,

        "longitude": event.longitude,

        "hostname": event.hostname,

        "username": event.username,

        "operating_system": event.operating_system,

        "process_name": event.process_name,

        "protocol": event.protocol,

        "port": event.port,

        "event_type": event.event_type,

        "severity": event.severity,

        "mitre_tactic": event.mitre_tactic,

        "mitre_technique": event.mitre_technique,

        "cve": event.cve,

        "ioc": event.ioc,

        "malware_family": event.malware_family,

        "risk_score": event.risk_score,

        "status": event.status,

        "description": event.description,

    }


def detection_engine():

    while True:

        try:

            detection_engine_instance.process()

        except Exception as error:

            print(f"[Detection Engine] {error}")

        time.sleep(1)        


@app.on_event("startup")
def startup():

    detection_thread = threading.Thread(
        target=detection_engine,
        daemon=True,
    )
    detection_thread.start()

    sysmon_thread = threading.Thread(
        target=sysmon_worker,
        daemon=True,
    )
    sysmon_thread.start()

    live_thread = threading.Thread(
        target=live_engine.run,
        daemon=True,
    )
    live_thread.start()

@app.get("/")
def root():

    return {

        "application": "SentinelSOC",

        "status": "online",

        "version": "2.0.0",

    }


@app.get("/health")
def health():

    return {

        "status": "healthy",

    }


@app.get("/events")
def events(
    db: Session = Depends(get_db),
):

    records = (
        db.query(Event)
        .order_by(Event.id.desc())
        .limit(200)
        .all()
    )

    return [

        serialize(event)

        for event in records

    ]



@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
):
    return dashboard_stats.build(db)


@app.websocket("/ws/events")
async def websocket_events(
    websocket: WebSocket,
):

    await manager.connect(
        websocket
    )

    try:

        while True:

            await websocket.receive_text()

    except Exception:

        manager.disconnect(
            websocket
        )