package com.LuggageLogger.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
  @Getter @Setter
  private Integer userId;

  @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<LuggageItem> luggageItems;

  Trip(String destination, String departureDate, String returnDate) {
    DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    this.destination = destination;
    this.departureDate = Instant.from(formatter.parse(departureDate));
    this.returnDate = Instant.from(formatter.parse(returnDate));
  }
}
