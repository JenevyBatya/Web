package com.example.lab_2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.*;


@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    boolean checkX(String x) { //for checkboxes
        String[] arrayList = {"-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"};
        boolean flag = false;
        for (int i = 0; i < arrayList.length; i++){
            if (arrayList[i].equals(x)){
                flag = true;
                break;
            }
        }
        return flag;
    }

    String accurateY(String y) { //for text
        String[] parts = y.split("\\.");
        String newNumber = "";
        String regex = "\\d+";
        if (parts.length == 2) {

            String integerPart = parts[0];
            String decimalPart = parts[1];
            String newDecimalPart = "0";

            for (int i = 0; i < decimalPart.length(); i++) { //go through the list by index
                String num = Character.toString(decimalPart.charAt(i));
                if (num.matches(regex) && integerPart.matches(regex)) { //if the element is numeric we check if its more than 0

                    int intNum = Integer.parseInt(num);
                    if (intNum > 0) { //if more then, we create new decimal part where max amount of zeroes is five
                        newDecimalPart = new String(new char[Math.min(5, i)]).replace("\0", "0") + num;
                        newNumber = integerPart + "." + newDecimalPart;
                        break;
                    }

                } else {
                    newNumber = "a";
                }
            }
        } else {
            newNumber = parts[0].matches(regex) ? parts[0] : "a";
        }
        return newNumber;
    }

    boolean checkY(String y) {
        if (Objects.equals(y, "a")){
            return false;
        }else{
            double newY = Double.parseDouble(y);
            return (newY>=-3 && newY<=5);
        }
    }

    boolean checkR(String r) {
        String[] arrayList = {"1", "1.5", "2", "2.5", "3", "3.5"};
        return Arrays.binarySearch(arrayList, r) >= 0;
    }

    boolean hit(double x, double y, double r) {
        if (x > 0 && y > 0) {
            return y >= (0.5 * x) && y <= (r / 2) && x <= r;

        } else if (x < 0 && y > 0) {
            return x >= (-r / 2) && y <= r;

        } else if (x == 0 && y == 0) {
            return true;

        } else if (x < 0 && y < 0) {
            return x * x + y * y <= r * r;

        } else return x == 0 && y >= (-r) && y <= r || y == 0 && x >= (-r) && x <= r;
    }

    public void init() {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Coordinates coordinates = (Coordinates) request.getAttribute("Coordinates");
        JSONArray jsonArray = new JSONArray();
        Iterator<String> iterator = coordinates.getX().iterator();
        String y = accurateY(coordinates.getY());
        String r = coordinates.getR();
        String status;
        TimeZone timeZone = TimeZone.getTimeZone("Europe/Moscow");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss");
        sdf.setTimeZone(timeZone);
        if (checkY(y) && checkR(r)) {
            while (iterator.hasNext()) {
                long startTime = System.nanoTime();
                String x = iterator.next();
                if (checkX(x)) {
                    JSONObject data = new JSONObject();
                    if (hit(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r))) {
                        status = "Попадание";
                    } else {
                        status = "Промах";
                    }
                    long endTime = System.nanoTime();
                    double elapsedTimeMillis = (endTime - startTime) / 1e6;
                    String currentTime = sdf.format(new Date());
                    data.put("X", x);
                    data.put("Y", y);
                    data.put("R", r);
                    data.put("status", status);
                    data.put("date", currentTime);
                    data.put("time", elapsedTimeMillis);
                    jsonArray.put(data);
                } else {
                    response.resetBuffer();
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setHeader("Content-Type", "application/json");
                    response.getOutputStream().print("{\"errorMessage\":\"You can't use this!\"}");
                    response.flushBuffer(); // marks response as committed -- if we don't do this the request will go through normally!
                }


            }
        } else {
//            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            response.resetBuffer();
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setHeader("Content-Type", "application/json");
            response.getOutputStream().print("{\"errorMessage\":\"You can't use this!\"}");
            response.flushBuffer(); // marks response as committed -- if we don't do this the request will go through normally!
        }
        PrintWriter out = response.getWriter();
        out.print(jsonArray);
        out.flush();
    }

    public void destroy() {
    }

}