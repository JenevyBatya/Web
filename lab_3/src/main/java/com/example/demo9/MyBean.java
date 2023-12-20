package com.example.lab_3;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.util.ArrayList;

@ManagedBean
@SessionScoped
public class MyBean {
    private ArrayList<String> names = new ArrayList<>();
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        System.out.println("Setting name: " + name);
        this.name = name;
    }

    public void addName() {
        System.out.println("addName() method invoked!" + name);
        names.add(name);// Clear the name after adding it to the list
    }

    public String getAllNames() {
        StringBuilder sb = new StringBuilder();
        for (String n : names) {
            sb.append(n);
        }
        return sb.toString();
    }

    public ArrayList<String> getNames() {
        return names;
    }
}
