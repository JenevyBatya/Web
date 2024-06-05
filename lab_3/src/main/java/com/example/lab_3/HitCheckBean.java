package com.example.lab_3;

import com.example.lab_3.model.Hit;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

//@ManagedBean(name = "hitCheckBean", eager = true)
//@SessionScoped
public class HitCheckBean {
    @EJB
    ResultController resultController = new ResultController();
    TimeZone timeZone = TimeZone.getTimeZone("Europe/Moscow");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private List<Integer> values = Arrays.asList(-3, -2, -1, 0, 1, 2, 3);
    private Map<Integer, Boolean> selectedValues = new HashMap<>();
    private ArrayList<Hit> hits = new ArrayList<>();


    private double sliderValue;
    private double x, y, r, pointX, pointY;

    public HitCheckBean() {
    }

    @PostConstruct
    public void init() {
        hits = resultController.getAllResults();
        r = 2;

    }

    public double getPointX() {
        return pointX;
    }

    public void setPointX(double pointX) {
        this.pointX = pointX;
    }

    public double getPointY() {
        return pointY;
    }

    public void setPointY(double pointY) {
        this.pointY = pointY;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setX(double x) {
        this.x = x;
    }

    public List<Integer> getValues() {
        return values;
    }

    public void setValues(List<Integer> values) {
        this.values = values;
    }

    public Map<Integer, Boolean> getSelectedValues() {
        return selectedValues;
    }

    public void setSelectedValues(Map<Integer, Boolean> selectedValues) {
        this.selectedValues = selectedValues;
    }

    public void setHits(ArrayList<Hit> hits) {
        this.hits = hits;
    }

    public double getSliderValue() {
        return sliderValue;
    }

    public void setSliderValue(double sliderValue) {
        this.sliderValue = sliderValue;
    }
// другие методы и поля


    public ArrayList<Hit> getHits() {
        return hits;
    }

    public void clear() throws SQLException {
        resultController.clear();
        hits.clear();
    }

    public void addPoint() {

        sdf.setTimeZone(timeZone);
        long startTime = System.nanoTime();
        String status;
        if (getPointX() <= 0 && getPointY() >= 0 && getPointX() >= (-getR()) && getPointY() <= getR()) {
            status = "Попадание";
        } else if (getPointX() > 0 && getPointY() < 0 && (getPointX() * getPointX() + getPointY() * getPointY() < (getR() * getR()))) {
            status = "Попадание";
        } else if (getPointX() < 0 && getPointY() < 0) {
            status = "Попадание";
        } else {
            status = "Промах";
        }
        long endTime = System.nanoTime();
        double elapsedTimeMillis = (endTime - startTime) / 1e6;
        String currentTime = sdf.format(new Date());
        Hit newHit = new Hit(new BigDecimal(getPointX()).setScale(5, RoundingMode.HALF_UP).doubleValue(), new BigDecimal(getPointY()).setScale(5, RoundingMode.HALF_UP).doubleValue(), getR(), elapsedTimeMillis, status, currentTime);
        resultController.saveHitResult(newHit);
        hits.add(newHit);


    }

    public void hitResult() {
        for (Integer key : selectedValues.keySet()) {
            if (selectedValues.get(key)) {
                sdf.setTimeZone(timeZone);
                long startTime = System.nanoTime();
                String status;
                if (key <= 0 && getY() >= 0 && key >= (-getR()) && getY() <= getR()) {
                    status = "Попадание";
                } else if (key > 0 && getY() < 0 && (key * key + getY() * getY() < (getR() * getR()))) {
                    status = "Попадание";
                } else if (getX() < 0 && getY() < 0 && getY() >= (-0.5 * key - getR() * 0.5)) {
                    status = "Попадание";
                } else {
                    status = "Промах";
                }
                long endTime = System.nanoTime();
                double elapsedTimeMillis = (endTime - startTime) / 1e6;
                String currentTime = sdf.format(new Date());
                Hit newHit = new Hit(key, getY(), getR(), elapsedTimeMillis, status, currentTime);
                resultController.saveHitResult(newHit);
                hits.add(newHit);
            }

        }


    }
}
