MITRE = {

    1: (
        "Execution",
        "T1059",
    ),

    3: (
        "Command and Control",
        "T1071",
    ),

    5: (
        "Defense Evasion",
        "T1070",
    ),

    7: (
        "Defense Evasion",
        "T1218",
    ),

    11: (
        "Persistence",
        "T1547",
    ),

    13: (
        "Persistence",
        "T1112",
    ),

}


def mitre(event_id):

    return MITRE.get(
        event_id,
        (
            "Unknown",
            "Unknown",
        ),
    )