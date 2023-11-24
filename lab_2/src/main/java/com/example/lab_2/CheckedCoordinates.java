package com.example.lab_2;

public class CheckedCoordinates {
    String X, Y, R, status, date;
    double time;


    public CheckedCoordinates(String x, String y, String r, String status, String currentTime, double elapsedTimeMillis) {
        this.X = x;
        this.Y = y;
        this.R = r;
        this.status = status;
        this.date = currentTime;
        this.time = elapsedTimeMillis;
    }

}
