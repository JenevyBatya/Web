package com.example.lab41.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "hits")
public class HitCheck implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private double X, Y, R, time;
    @Column
    private String status, date;

    @Column
    private int user_id;

    public HitCheck() {
    }

    public HitCheck(double x, double y, double r, double time, String status, String date, int user_id) {
        X = x;
        Y = y;
        R = r;
        this.time = time;
        this.status = status;
        this.date = date;
        this.user_id = user_id;
    }

    public HitCheck(int id, double x, double y, double r, double time, String status, String date, int user_id) {
        this.id = id;
        X = x;
        Y = y;
        R = r;
        this.time = time;
        this.status = status;
        this.date = date;
        this.user_id = user_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
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

}
