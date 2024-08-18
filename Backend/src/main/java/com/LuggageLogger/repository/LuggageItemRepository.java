package com.LuggageLogger.repository;

import com.LuggageLogger.model.LuggageItem;
import org.springframework.data.repository.CrudRepository;


// This will be AUTO IMPLEMENTED by Spring into a Bean called tripRepository
// CRUD refers Create, Read, Update, Delete

public interface LuggageItemRepository extends CrudRepository<LuggageItem, Integer> {

}
