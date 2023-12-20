package com.example.lab_3.model;

import javax.persistence.*;

@Entity
@Table(name = "hit")
public class Hit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    double X, Y, R, time;
    @Column
    String status, date;

    public Hit() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return X;
    }

    public void setX(double x) {
        X = x;
    }

    public double getY() {
        return Y;
    }

    public void setY(double y) {
        Y = y;
    }

    public double getR() {
        return R;
    }

    public void setR(double r) {
        R = r;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
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

    public Hit(double x, double y, double r, double time, String status, String date) {
        X = x;
        Y = y;
        R = r;
        this.time = time;
        this.status = status;
        this.date = date;
    }

    public Hit(int id, double x, double y, double r, double time, String status, String date) {
        this.id = id;
        X = x;
        Y = y;
        R = r;
        this.time = time;
        this.status = status;
        this.date = date;
    }
}
