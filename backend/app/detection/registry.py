from app.detection.nmap_detector import detect_nmap
from app.detection.hydra_detector import detect_hydra
from app.detection.sqlmap_detector import detect_sqlmap
from app.detection.reverse_shell_detector import detect_reverse_shell

DETECTORS = [
    detect_nmap,
    detect_hydra,
    detect_sqlmap,
    detect_reverse_shell,
]