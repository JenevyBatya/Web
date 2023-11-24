package com.example;

public class responseCoordinates {
    String X, Y, R, status, date;
    double time;

    public responseCoordinates(String x, String y, String r, String status, String date, double time) {
        X = x;
        Y = y;
        R = r;
        this.status = status;
        this.date = date;
        this.time = time;
    }

    public String getX() {
        return X;
    }

    public void setX(String x) {
        X = x;
    }

    public String getY() {
        return Y;
    }

    public void setY(String y) {
        Y = y;
    }

    public String getR() {
        return R;
    }

    public void setR(String r) {
        R = r;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }
}
