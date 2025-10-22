package com.healthiot.BackendIotApp.controller;

import com.healthiot.BackendIotApp.model.DataPostman;
import com.healthiot.BackendIotApp.repository.DataPostmanRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataController {

    private final DataPostmanRepository repository;

    public DataController(DataPostmanRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/data")
    public ResponseEntity<String> receiveData(@RequestBody Map<String, Object> payload) {
        System.out.println("Data received: " + payload);

        // Convertir et sauvegarder
        Integer ecg = (Integer) payload.get("ecg");
        Integer ppg = (Integer) payload.get("ppg");
        Double acc = Double.valueOf(payload.get("acc").toString());

        DataPostman data = new DataPostman(ecg, ppg, acc);
        repository.save(data);

        return ResponseEntity.ok("Data received and saved");
    }
}
