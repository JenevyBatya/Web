package com.example.lab_3;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean(name = "navigationBean")
@SessionScoped
public class NavigationBean {
    public String goToStarter(){
        return "starter?faces-redirect=true";
    }
    public String goToIndex(){
        return "index?faces-redirect=true";
    }
}
