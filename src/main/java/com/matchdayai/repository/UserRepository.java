package com.matchdayai.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.matchdayai.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailIgnoreCase(String email);
    boolean existsByEmail(String email);

}
