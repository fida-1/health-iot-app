package com.healthiot.BackendIotApp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "data_postman")
public class DataPostman {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer ecg;
    private Integer ppg;
    private Double acc;

    // Constructeurs
    public DataPostman() {}

    public DataPostman(Integer ecg, Integer ppg, Double acc) {
        this.ecg = ecg;
        this.ppg = ppg;
        this.acc = acc;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getEcg() { return ecg; }
    public void setEcg(Integer ecg) { this.ecg = ecg; }

    public Integer getPpg() { return ppg; }
    public void setPpg(Integer ppg) { this.ppg = ppg; }

    public Double getAcc() { return acc; }
    public void setAcc(Double acc) { this.acc = acc; }
}
