package com.example.lab_2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "helloServlet", value = "/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    public void init(){}
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestReader requestReader = new RequestReader();
        try {
//            response.sendError(HttpServletResponse.SC_EXPECTATION_FAILED);
            Coordinates coordinates = requestReader.read(request.getInputStream());
            request.setAttribute("Coordinates", coordinates);
            request.getRequestDispatcher("AreaCheckServlet").forward(request, response);
        }catch (IOException | ServletException e){
            //TODO
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
//    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        response.setContentType("text/html");
//
//        // Hello
//        PrintWriter out = response.getWriter();
//        out.println("<html><body>");
//        out.println("<h1>" + "hello" + "</h1>");
//        out.println("</body></html>");
//    }
////    public void debug(HttpServletRequest request, HttpServletResponse response) throws IOException {
////
//    }

    public void destroy(){};

}