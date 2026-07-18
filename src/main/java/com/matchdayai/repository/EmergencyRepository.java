package com.matchdayai.repository;

import com.matchdayai.entity.EmergencyIncident;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyRepository
        extends MongoRepository<EmergencyIncident, String> {

}
