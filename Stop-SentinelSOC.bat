@echo off
taskkill /FI "WINDOWTITLE eq SentinelSOC Backend*" /F
taskkill /FI "WINDOWTITLE eq SentinelSOC Frontend*" /F
exit
