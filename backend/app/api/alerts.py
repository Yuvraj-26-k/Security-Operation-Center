from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.alert import Alert
from app.schemas.alert import AlertResponse
from app.schemas.alert import AlertUpdate

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)


@router.get(
    "/",
    response_model=list[AlertResponse],
)
def get_alerts(
    db: Session = Depends(get_db),
):
    return (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )


@router.get(
    "/{alert_id}",
    response_model=AlertResponse,
)
def get_alert(
    alert_id: int,
    db: Session = Depends(get_db),
):
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found.",
        )

    return alert


@router.put(
    "/{alert_id}",
    response_model=AlertResponse,
)
def update_alert(
    alert_id: int,
    request: AlertUpdate,
    db: Session = Depends(get_db),
):
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found.",
        )

    data = request.model_dump(
        exclude_unset=True
    )

    for key, value in data.items():
        setattr(alert, key, value)

    db.commit()

    db.refresh(alert)

    return alert


@router.delete("/{alert_id}")
def delete_alert(
    alert_id: int,
    db: Session = Depends(get_db),
):
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found.",
        )

    db.delete(alert)

    db.commit()

    return {
        "message": "Alert deleted successfully."
    }