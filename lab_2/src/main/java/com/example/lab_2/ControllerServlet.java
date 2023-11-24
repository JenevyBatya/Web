package com.example.lab_2;

import com.google.gson.Gson;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


@WebServlet(name = "helloServlet", value = "/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    private MyDataBean dataBean; // Поле для хранения MyDataBean
    public void init() {
        dataBean = new MyDataBean(); // Инициализация MyDataBean при старте сервера
        dataBean.setData(new ArrayList<>());
        getServletContext().setAttribute("myDataBean", dataBean); // Сохранение MyDataBean в контексте приложения
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestReader requestReader = new RequestReader();
        try {
            Coordinates coordinates = requestReader.read(request.getInputStream());
            request.setAttribute("Coordinates", coordinates);
            request.getRequestDispatcher("AreaCheckServlet").forward(request, response);
        } catch (IOException | ServletException e) {
            //TODO
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext context = getServletContext();
        MyDataBean dataBean = (MyDataBean) context.getAttribute("myDataBean");
        // Получите данные из MyDataBean
        ArrayList<CheckedCoordinates> data = dataBean.getData();

//        // Преобразуйте данные в JSON
        Gson gson = new Gson();
        String jsonData = gson.toJson(data);

//        // Отправьте JSON в ответе
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        try (PrintWriter out = response.getWriter()) {
//            out.print(jsonData);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        request.setAttribute("json", jsonData
        );
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/resultPage.jsp");
        dispatcher.forward(request, response);
    }


    public void destroy() {
    }

}