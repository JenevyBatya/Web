<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%--<!DOCTYPE html>--%>
<%--<html>--%>
<%--<head>--%>
<%--    <title>JSP - Hello World</title>--%>
<%--</head>--%>
<%--<body>--%>
<%--<h1><%= "Hello World!" %>--%>
<%--</h1>--%>
<%--<br/>--%>
<%--<a href="hello-servlet">Hello Servlet</a>--%>
<%--</body>--%>
<%--</html>--%>
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
    P3224 Вариант 3413
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
                    <canvas id="canvas_plot"></canvas>

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
                    </table>
                </div>
            </td>
        </tr>
    </table>
</div>

</body>
</html>