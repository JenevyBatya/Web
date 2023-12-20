package com.example.lab_3;

public class ResultLog {
    boolean status;
    String annotation;

    public ResultLog(boolean status, String annotation) {
        this.status = status;
        this.annotation = annotation;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getAnnotation() {
        return annotation;
    }

    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }
}
