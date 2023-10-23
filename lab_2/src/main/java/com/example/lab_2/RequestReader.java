package com.example.lab_2;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletInputStream;

import java.io.IOException;

public class RequestReader {
    ObjectMapper objectMapper = new ObjectMapper();

    public Coordinates read(ServletInputStream inputStream) throws IOException {
        return objectMapper.readValue(inputStream, Coordinates.class);
    }
}
