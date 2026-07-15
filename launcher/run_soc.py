import subprocess
import os
import time

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

BACKEND = os.path.join(ROOT, "backend")
FRONTEND = ROOT

backend = subprocess.Popen(
    [
        "cmd",
        "/k",
        "uvicorn app.main:app --reload"
    ],
    cwd=BACKEND,
)

time.sleep(4)

frontend = subprocess.Popen(
    [
        "cmd",
        "/k",
        "npm run dev"
    ],
    cwd=FRONTEND,
)

backend.wait()
frontend.wait()