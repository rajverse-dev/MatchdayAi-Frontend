package com.matchdayai.repository;

import com.matchdayai.entity.MapPoint;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NavigationRepository
        extends MongoRepository<MapPoint, String> {

}