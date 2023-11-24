package com.example.lab_2;

import java.util.ArrayList;

public class MyDataBean {
    private ArrayList<CheckedCoordinates> Data;

    public ArrayList<CheckedCoordinates> getData() {
        return Data;
    }

    public void setData(ArrayList<CheckedCoordinates> data) {
        Data = data;
    }
    public void addData(CheckedCoordinates data){
        Data.add(data);
    }
}
