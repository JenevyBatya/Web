package com.example.lab_2;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

public class Coordinates {
    private ArrayList<String> x;
    private String y;
    private String r;

    @JsonCreator
    public Coordinates(@JsonProperty("X") ArrayList<String> x, @JsonProperty("Y") String y, @JsonProperty("R") String r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public ArrayList<String> getX() {
        return x;
    }

    public void setX(ArrayList<String> x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }
}
