package com.example;

import java.io.Serializable;
import java.util.ArrayList;

public class DataContext implements Serializable {
    ArrayList<responseCoordinates> data;

    public DataContext() {
        data = new ArrayList<>();
    }

    public ArrayList<responseCoordinates> getData() {
        return data;
    }

    public void setData(ArrayList<responseCoordinates> data) {
        this.data = data;
    }

    public void add(responseCoordinates responseCoordinates) {
        data.add(responseCoordinates);
    }
}
