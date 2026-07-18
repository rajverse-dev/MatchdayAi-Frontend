package com.matchdayai.repository;

import com.matchdayai.entity.Crowd;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CrowdRepository extends MongoRepository<Crowd,String>{
}
