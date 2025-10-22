package com.healthiot.BackendIotApp.repository;

import com.healthiot.BackendIotApp.model.DataPostman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataPostmanRepository extends JpaRepository<DataPostman, Long> {
}
