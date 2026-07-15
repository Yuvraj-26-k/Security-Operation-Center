import asyncio
import json

from app.attackmap.engines.attack_generator import (
    generate_attack,
)


class AttackMapStreamer:

    def __init__(self):
        self.clients = set()

    async def connect(
        self,
        websocket,
    ):
        await websocket.accept()
        self.clients.add(websocket)

    def disconnect(
        self,
        websocket,
    ):
        self.clients.discard(websocket)

    async def broadcast_attack(self):

        if not self.clients:
            return

        attack = generate_attack()

        dead = []

        for client in self.clients:

            try:

                await client.send_text(
                    json.dumps(attack)
                )

            except Exception:

                dead.append(client)

        for client in dead:
            self.disconnect(client)

    async def stream(self):

        while True:

            await self.broadcast_attack()

            await asyncio.sleep(1)


attack_streamer = AttackMapStreamer()