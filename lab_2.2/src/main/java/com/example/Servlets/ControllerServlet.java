package com.example.Servlets;

import com.example.DataContext;
import com.example.responseCoordinates;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/pathetic")
public class ControllerServlet extends HttpServlet {
    @Override
    public void init() {
        DataContext dataContext = new DataContext();
        getServletContext().setAttribute("DataContextBean", dataContext);
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/AreaCheckServlet").forward(req, resp);
    }

    @Override
    public void destroy() {
    }
}
