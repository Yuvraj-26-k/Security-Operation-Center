import asyncio

from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from app.attackmap.engines.attack_generator import (
    generate_attack,
)
from app.attackmap.websocket.payload import (
    attack_streamer,
)

router = APIRouter(
    prefix="/attackmap",
    tags=["Attack Map"],
)


@router.get("/live")
def live_attack():
    return generate_attack()


@router.websocket("/ws")
async def websocket_attack_map(
    websocket: WebSocket,
):

    await attack_streamer.connect(
        websocket,
    )

    try:

        while True:

            attack = generate_attack()

            await websocket.send_json(
                attack
            )

            await asyncio.sleep(1)

    except WebSocketDisconnect:

        attack_streamer.disconnect(
            websocket
        )

    except Exception:

        attack_streamer.disconnect(
            websocket
        )