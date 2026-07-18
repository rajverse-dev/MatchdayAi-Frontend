package com.matchdayai.repository;

import com.matchdayai.entity.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnnouncementRepository extends MongoRepository<Announcement, String> {

}
