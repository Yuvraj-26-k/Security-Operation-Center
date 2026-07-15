# 🛡️ SentinelSOC – Security Operation Center Dashboard

A modern Security Operation Center (SOC) dashboard built using **React**, **FastAPI**, **SQLite**, and **Sysmon**. The project monitors Windows Sysmon events, detects suspicious activities such as **Nmap port scans**, stores them in a database, and visualizes them through a live dashboard.

---

## 📸 Preview

> Add screenshots here after uploading.

```
Dashboard
Alerts
Logs
Threat Activity
MITRE ATT&CK Mapping
Live Event Feed
```

---

# ✨ Features

- ✅ Real-time Windows Sysmon event monitoring
- ✅ Automatic Nmap Port Scan detection
- ✅ Live Security Dashboard
- ✅ Alert Management
- ✅ Security Logs
- ✅ Incident Overview
- ✅ Threat Activity Graph
- ✅ MITRE ATT&CK Mapping
- ✅ SQLite Event Storage
- ✅ REST API using FastAPI
- ✅ Modern React + Tailwind CSS Interface
- ✅ Live Dashboard Updates

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons
- Axios

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

## Detection

- Microsoft Sysmon
- Windows Event Log API
- Python

---

# 📂 Project Structure

```
Security-Operation-Center
│
├── backend
│   ├── app
│   ├── database
│   ├── models
│   ├── routes
│   ├── sysmon
│   └── main.py
│
├── src
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── services1.0
│   └── api
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Security-Operation-Center.git

cd Security-Operation-Center
```

---

## Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
npm install

npm run dev
```

---

# 🚀 How It Works

1. Windows Sysmon records process creation events.
2. Python reads Sysmon Event Logs.
3. Events are parsed.
4. Nmap executions are detected.
5. Alerts are stored in SQLite.
6. FastAPI exposes REST APIs.
7. React fetches live data.
8. Dashboard updates automatically.

---

# 🔍 Detection Rules

Currently implemented:

| Tool | Detection |
|------|-----------|
| Nmap | Port Scan Detection |

Example Detection

```
"C:\Program Files (x86)\Nmap\nmap.exe"
```

Mapped to

```
MITRE ATT&CK

Tactic:
Discovery

Technique:
T1046
Network Service Discovery
```

---

# 📊 Dashboard

The dashboard displays

- Total Events
- Critical Alerts
- High Alerts
- Medium Alerts
- Events per Minute
- Security Score
- Protected Endpoints
- Active Threats
- Threat Activity
- Recent Events

---

# 🗄 Database

SQLite stores

- Timestamp
- Event Type
- Severity
- Process Name
- Username
- MITRE Mapping
- Risk Score
- Description

---

# 📌 Future Improvements

- Additional Detection Rules
- PowerShell Detection
- Mimikatz Detection
- Hydra Detection
- SQLMap Detection
- GeoIP Integration
- Email Notifications
- User Authentication
- Threat Intelligence Feed
- Malware Analysis
- Docker Deployment

---

# ⚠ Disclaimer

This project was developed for educational and learning purposes. It demonstrates SOC concepts using Windows Sysmon and does not replace a production SIEM or enterprise Security Operations Center.

---

# 👨‍💻 Author

**Yuvraj Singh**

Cybersecurity Student

Interested in

- Penetration Testing
- SOC Analysis
- Threat Detection
- Digital Forensics
- Python Automation

---

# ⭐ If you like this project

Give the repository a ⭐ on GitHub.
