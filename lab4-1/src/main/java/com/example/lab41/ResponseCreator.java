package com.example.lab41;

import com.example.lab41.model.HitCheck;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.List;

public class ResponseCreator {
    ObjectMapper objectMapper = new ObjectMapper();

    public ObjectNode createResponse(String message) {
        ObjectNode jsonResponse = objectMapper.createObjectNode();
        jsonResponse.put("message", message);
        return jsonResponse; // Замени на реальную строку JSON
    }
    public ObjectNode createResponseFromObject(Object o){
        ObjectNode objectNode = objectMapper.valueToTree(o);
        return objectNode;
    }

    public ObjectNode createResponseList(List<HitCheck> hitCheckList) {
        ObjectNode jsonResponse = objectMapper.createObjectNode();
        ArrayNode itemArray = objectMapper.createArrayNode();

        for (HitCheck hitCheck : hitCheckList) {
            ObjectNode hitCheckJson = objectMapper.valueToTree(hitCheck);
            itemArray.add(hitCheckJson);
        }

        jsonResponse.set("items", itemArray);

        return jsonResponse;
    }

}
