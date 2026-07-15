PROCESS_RULES = {

    "powershell.exe": (
        "PowerShell Execution",
        "High",
        "Execution",
        "T1059.001",
        80,
    ),

    "cmd.exe": (
        "Command Prompt",
        "Medium",
        "Execution",
        "T1059.003",
        55,
    ),

    "rundll32.exe": (
        "LOLBin Execution",
        "High",
        "Defense Evasion",
        "T1218.011",
        85,
    ),

    "regsvr32.exe": (
        "LOLBin Execution",
        "High",
        "Defense Evasion",
        "T1218.010",
        85,
    ),

    "mshta.exe": (
        "HTA Execution",
        "Critical",
        "Execution",
        "T1218.005",
        95,
    ),

}