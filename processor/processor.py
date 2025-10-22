import time
import random

def detect_anomaly(data):
    return data['ecg'] > 100  # exemple simple

while True:
    data = {"ecg": random.randint(60,120), "ppg": 80, "acc": 1.2}
    if detect_anomaly(data):
        print("Anomalie détectée:", data)
    time.sleep(1)
