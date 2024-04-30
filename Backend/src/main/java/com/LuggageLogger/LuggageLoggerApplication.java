package com.LuggageLogger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LuggageLoggerApplication {

  public static void main(String[] args) {
    try{
        SpringApplication.run(LuggageLoggerApplication.class, args);  
    } catch (Exception e) {
        e.printStackTrace();
    }
}
}
