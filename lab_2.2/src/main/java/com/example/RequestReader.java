package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletInputStream;

import java.io.IOException;

public class RequestReader {
    ObjectMapper objectMapper = new ObjectMapper();

    public requestCoordinates read(ServletInputStream inputStream) throws IOException {
        return objectMapper.readValue(inputStream, requestCoordinates.class);
    }

}
