<%@ page import="com.example.DataContext" %>
<%@ page import="com.example.responseCoordinates" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:useBean id="_loginJSPBean" class="com.example.DataContext" scope="application"/>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="./src/css/Stylesheet.css">
</head>
<body>

<script src="./dist/bundle.js"></script>

<div id="name" class="with_border">
    Черневская Карина Андреевна
    <br>
    P3224 Вариант 25047
</div>
<div id="container_for_table">
    <table id="main_table">
        <tr>
            <td id="choose_column" class="column">
                <div id="box_within_choose_column" class="with_border">
                    <table id="choose_table">
                        <tr>
                            <td>
                                Choose X
                            </td>
                            <td>
                                <table id="table_for_checkboxes">
                                    <tr id="checkboxes">

                                        <td style="margin-right: 10px;">
                                            <label><input type="checkbox" value="-4"> -4</label>
                                            <label><input type="checkbox" value="-3"> -3</label>
                                            <label><input type="checkbox" value="-2"> -2</label>
                                            <label><input type="checkbox" value="-1"> -1</label>
                                        </td>
                                        <td>
                                            <label><input type="checkbox" value="0"> 0</label>
                                            <label><input type="checkbox" value="1"> 1</label>
                                            <label><input type="checkbox" value="2"> 2</label>
                                            <label><input type="checkbox" value="3"> 3</label>
                                        </td>
                                    </tr>
                                    <tr id="last_checkbox">
                                        <td colspan="2">
                                            <label><input type="checkbox" class="clickable" value="4"> 4</label>
                                        </td>
                                    </tr>
                                </table>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                Choose Y
                            </td>
                            <td>
                                <input type="text" id="choose_y" title="Введите значение от -3 до 5">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Choose R
                            </td>
                            <td id="but">
                                <label>
                                    <input type="radio" value="1" name="option"> 1
                                </label>
                                <label>
                                    <input type="radio" value="1.5" name="option"> 1.5
                                </label>
                                <label>
                                    <input type="radio" value="2" name="option"> 2
                                </label>
                                <label>
                                    <input type="radio" value="3" name="option"> 3
                                </label>
                                <label>
                                    <input type="radio" value="3.5" name="option"> 3.5
                                </label>

                            </td>

                        </tr>
                        <tr>
                            <td colspan="2">

                                <button id="final_button">Стреляй</button>
                                <div id="errorBlock" class="with_border">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

            </td>
            <td id="graphic_column" class="column">
                <div id="box_within_graphic_column" class="with_border">

                    <svg id="OXY" xmlns="http://www.w3.org/2000/svg">
                        <!-- Ось X -->
                        <line x1="0" y1="250" x2="500" y2="250" stroke="white"></line>
                        <text x="0" y="240" text-anchor="middle" fill="white">-5</text>
                        <text x="50" y="240" text-anchor="middle" fill="white">-4</text>
                        <text x="100" y="240" text-anchor="middle" fill="white">-3</text>
                        <text x="150" y="240" text-anchor="middle" fill="white">-2</text>
                        <text x="200" y="240" text-anchor="middle" fill="white">-1</text>
                        <text x="300" y="240" text-anchor="middle" fill="white">1</text>
                        <text x="350" y="240" text-anchor="middle" fill="white">2</text>
                        <text x="400" y="240" text-anchor="middle" fill="white">3</text>
                        <text x="450" y="240" text-anchor="middle" fill="white">4</text>
                        <text x="500" y="240" text-anchor="middle" fill="white">5</text>

                        <!-- Ось Y -->
                        <line x1="250" y1="0" x2="250" y2="500" stroke="white"></line>
                        <text x="240" y="0" text-anchor="middle" fill="white">5</text>
                        <text x="240" y="50" text-anchor="middle" fill="white">4</text>
                        <text x="240" y="100" text-anchor="middle" fill="white">3</text>
                        <text x="240" y="150" text-anchor="middle" fill="white">2</text>
                        <text x="240" y="200" text-anchor="middle" fill="white">1</text>
                        <text x="240" y="300" text-anchor="middle" fill="white">-1</text>
                        <text x="240" y="350" text-anchor="middle" fill="white">-2</text>
                        <text x="240" y="400" text-anchor="middle" fill="white">-3</text>
                        <text x="240" y="450" text-anchor="middle" fill="white">-4</text>
                        <text x="220" y="500" text-anchor="middle" fill="white">-5</text>
                    </svg>

                    <svg id="svg_graph" xmlns="http://www.w3.org/2000/svg"></svg>
                    <svg id="points" xmlns="http://www.w3.org/2000/svg"></svg>

                </div>
            </td>

            <td id="result_column" class="column">
                <div id="box_within_results_column" class="with_border">
                    <table id="table_for_results">
                        <tr>
                            <th id="table_x">X</th>
                            <th id="table_y">Y</th>
                            <th id="table_r">R</th>
                            <th id="table_result">Result</th>
                            <th id="table_date">Date</th>
                            <th id="table_time">Execution time</th>
                        </tr>
                        <%
                            DataContext dataContext = (DataContext) request.getServletContext().getAttribute("DataContextBean");
                            ArrayList<responseCoordinates> data = dataContext.getData();
                            for (responseCoordinates res : data) {%>
                        <tr>
                            <td><%=res.getX()%>
                            </td>
                            <td><%=res.getY()%>
                            </td>
                            <td><%=res.getR()%>
                            </td>
                            <td><%=res.getStatus()%>
                            </td>
                            <td><%=res.getDate()%>
                            </td>
                            <td><%=res.getTime()%>
                            </td>
                        </tr>
                        <%}%>
                    </table>
                </div>
            </td>
        </tr>
    </table>
</div>

</body>
</html>