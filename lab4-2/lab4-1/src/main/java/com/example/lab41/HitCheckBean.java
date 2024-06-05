package com.example.lab41;

import com.example.lab41.controller.HitController;
import com.example.lab41.model.HitCheck;

import javax.ejb.EJB;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class HitCheckBean {
    //TODO
    //пройдет ли нормально запись в бд
    @EJB
    HitController hitController;
    private double X, Y, R;

    public HitCheckBean(double x, double y, double r) {
        X = x;
        Y = y;
        R = r;
    }

    TimeZone timeZone = TimeZone.getTimeZone("Europe/Moscow");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

}
