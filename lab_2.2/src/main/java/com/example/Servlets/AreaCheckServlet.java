package com.example.Servlets;

import com.example.DataContext;
import com.example.RequestReader;
import com.example.requestCoordinates;
import com.example.responseCoordinates;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.servlet.ServletContext;
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
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONArray jsonArray = new JSONArray();
        RequestReader requestReader = new RequestReader();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        requestCoordinates coordinates = requestReader.read(request.getInputStream());

        DataContext dataContext = (DataContext) getServletContext().getAttribute("DataContextBean");
//        requestCoordinates  = (requestCoordinates) request.getAttribute("Coordinates");

        Iterator<String> iterator = coordinates.getX().iterator();
        String y = accurateParam(coordinates.getY());
        String r = coordinates.getR();
        String status;
        TimeZone timeZone = TimeZone.getTimeZone("Europe/Moscow");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sdf.setTimeZone(timeZone);

        if (checkY(y) && checkR(r)) {
            while (iterator.hasNext()) {
                long startTime = System.nanoTime();
                String x = iterator.next();
                String newX = accurateParam(x);
                if (checkX(newX)) {
                    JSONObject data = new JSONObject();
                    if (hit(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r))) {
                        status = "Попадание";
                    } else {
                        status = "Промах";
                    }
                    long endTime = System.nanoTime();
                    double elapsedTimeMillis = (endTime - startTime) / 1e6;
                    String currentTime = sdf.format(new Date());
                    data.put("X", newX);
                    data.put("Y", y);
                    data.put("R", r);
                    data.put("status", status);
                    data.put("date", currentTime);
                    data.put("time", elapsedTimeMillis);
                    dataContext.add(new responseCoordinates(newX, y, r, status, currentTime, elapsedTimeMillis));
                    jsonArray.put(data);
                } else {
                    // Handle the error and create an error JSON response
                    JSONObject errorData = new JSONObject();
                    errorData.put("errorMessage", "You can't use this!");
                    jsonArray.put(errorData);
                }
            }
        } else {
            // Handle the error and create an error JSON response
            JSONObject errorData = new JSONObject();
            errorData.put("errorMessage", "You can't use this!");
            jsonArray.put(errorData);
        }

        PrintWriter out = response.getWriter();
        out.print(jsonArray);
        out.flush();

//        DataContext dataContext = (DataContext) getServletContext().getAttribute("DataContextBean");
//        responseCoordinates resp = new responseCoordinates("1", "1", "1", "1", "1", 1);
//        dataContext.add(resp);
//        JSONArray jsonArray = new JSONArray();
//        JSONObject data = new JSONObject();
//
//        data.put("X", resp.getX());
//        data.put("Y", resp.getY());
//        data.put("R", resp.getR());
//        data.put("status", resp.getStatus());
//        data.put("date", resp.getDate());
//        data.put("time", resp.getTime());
//
//        jsonArray.put(data);
//        PrintWriter out = response.getWriter();
//        out.print(jsonArray);
//        out.flush();

    }

    boolean checkX(String x) { //for checkboxes
        if (x.equals("a")) {
            return false;
        }
        return Double.parseDouble(x) >= -4 && Double.parseDouble(x) <= 4;
    }

    String accurateParam(String n) { //for text
        String[] parts = n.split("\\.");
        String newNumber = "";
        String regex = "^-?\\d+$";
        if (parts.length == 2) {

            String integerPart = parts[0];
            String decimalPart = parts[1];
            String newDecimalPart = "";
            if (decimalPart.length() <= 6) {
                newNumber = integerPart + "." + decimalPart;
            } else {

                for (int i = 0; i < decimalPart.length(); i++) { //go through the list by index
                    String num = Character.toString(decimalPart.charAt(i));
                    if (num.matches(regex) && integerPart.matches(regex)) { //if the element is numeric we check if its more than 0

                        int intNum = Integer.parseInt(num);
                        if (intNum > 0) { //if more then, we create new decimal part where max amount of zeroes is five
                            newDecimalPart = new String(new char[Math.min(5, i)]).replace("\0", "0") + num;
                            for (int j = (i + 1); j <= 6; j++) {
                                num = Character.toString(decimalPart.charAt(j));
                                newDecimalPart += num;
                            }
                            newNumber = integerPart + "." + newDecimalPart;
                            break;
                        }

                    } else {
                        newNumber = "a";
                        break;
                    }
                }
            }
        } else {
            newNumber = parts[0].matches(regex) ? parts[0] : "a";
        }
        return newNumber;
    }

    boolean checkY(String y) {
        if (Objects.equals(y, "a")) {
            return false;
        } else {
            double newY = Double.parseDouble(y);
            return (newY >= -3 && newY <= 5);
        }
    }

    boolean checkR(String r) {
        String[] arrayList = {"1", "1.5", "2", "2.5", "3", "3.5"};
        return Arrays.binarySearch(arrayList, r) >= 0;
    }

    boolean hit(double x, double y, double r) {
        if (x > 0 && y > 0) {
            return y <= (r / 2) && x <= r;

        } else if (x == 0 && y == 0) {
            return true;

        } else if (x < 0 && y < 0) {
            return y >= (-0.5 * x - r * 0.5);

        } else if (x > 0 && y < 0) {
            return x * x + y * y <= (r * 0.5);
        } else if (x == 0) {
            return y <= (r * 0.5) && y >= (-r * 0.5);
        } else if (y == 0) {
            return x >= -r && x <= r;
        } else return false;
    }
}
