package com.LuggageLogger.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // This tells Hibernate to make a table out of this class
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LuggageItem {


  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  private String name;

  private String category;

  private int quantity;

  private boolean isTaken;

  @ManyToOne
  @JoinColumn(name = "trip_id")
  private Trip trip;

}
