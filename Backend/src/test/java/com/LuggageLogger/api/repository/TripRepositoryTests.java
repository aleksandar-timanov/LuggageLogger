package com.LuggageLogger.api.repository;

import com.LuggageLogger.model.Trip;
import com.LuggageLogger.repository.TripRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;

import java.time.Instant;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class TripRepositoryTests {

    @Autowired
    private TripRepository tripRepository;

    @Test
    public void TripRepository_SaveAll_ReturnsSavedTrips() {
        //Arrange
        Instant departureDate = Instant.now();
        Instant returnDate = Instant.now();

        Trip trip = Trip.builder()
                .destination("Sofia")
                .departureDate(departureDate)
                .returnDate(returnDate)
                .build();

        //Act
        Trip savedTrip = tripRepository.save(trip);

        //Assert
        Assertions.assertNotNull(savedTrip);
        Assertions.assertTrue(savedTrip.getId() > 0);

    }
  
}
