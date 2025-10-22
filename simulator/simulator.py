import time
import requests
import random

GATEWAY_URL = "http://localhost:3000/data"

while True:
    data = {
        "ecg": random.randint(60, 100),
        "ppg": random.randint(50, 120),
        "acc": round(random.uniform(0, 2), 2)
    }
    try:
        requests.post(GATEWAY_URL, json=data)
        print("Données envoyées:", data)
    except:
        print("Erreur envoi")
    time.sleep(1)
