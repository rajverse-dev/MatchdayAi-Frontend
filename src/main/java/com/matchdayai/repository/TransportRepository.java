package com.matchdayai.repository;

import com.matchdayai.entity.Transport;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransportRepository  extends MongoRepository<Transport, String> {

}
