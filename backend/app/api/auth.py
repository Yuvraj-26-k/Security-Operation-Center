from datetime import datetime

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.schemas.auth import TokenResponse
from app.schemas.auth import UserResponse
from app.security.security import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(User)
        .filter(
            (User.username == request.username)
            | (User.email == request.email)
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Username or email already exists.",
        )

    user = User(
        username=request.username,
        email=request.email,
        password_hash=hash_password(request.password),
        full_name=request.full_name,
        role="Administrator",
        department="SOC",
        is_active=True,
        is_superuser=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.username == form_data.username)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password.",
        )

    if not verify_password(
        form_data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password.",
        )

    user.last_login = datetime.utcnow()
    user.failed_login_attempts = 0
    db.commit()

    access_token = create_access_token(
        {
            "sub": user.username,
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get(
    "/me",
    response_model=UserResponse,
)
def me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.get("/ping")
def ping():
    return {
        "status": "Authentication Service Online"
    }