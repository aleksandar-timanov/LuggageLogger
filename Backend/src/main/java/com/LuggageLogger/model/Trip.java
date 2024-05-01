package com.LuggageLogger.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.Instant;
import java.time.format.DateTimeFormatter;

@Entity // This tells Hibernate to make a table out of this class
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Trip {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;
  @Getter @Setter
  private String destination;
  @Getter @Setter
  private Instant departureDate;
  @Getter @Setter
  private Instant returnDate;

  Trip(String destination, String departureDate, String returnDate) {
    DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    this.destination = destination;
    this.departureDate = Instant.from(formatter.parse(departureDate));
    this.returnDate = Instant.from(formatter.parse(returnDate));
  }
}
