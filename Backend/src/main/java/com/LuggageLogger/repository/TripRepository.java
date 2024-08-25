package com.LuggageLogger.repository;

import com.LuggageLogger.model.Trip;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


// This will be AUTO IMPLEMENTED by Spring into a Bean called tripRepository
// CRUD refers Create, Read, Update, Delete

public interface TripRepository extends CrudRepository<Trip, Integer> {
    List<Trip> findByUserId(Integer userId);

}
