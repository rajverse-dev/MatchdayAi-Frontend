package com.matchdayai.repository;

import com.matchdayai.entity.Queue;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QueueRepository extends MongoRepository<Queue, String> {

}
