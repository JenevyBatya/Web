<?php
session_start()
?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" type="text/css" href="stylesheet.css">
    </head>
    <body>
    <div id="name" class="with_border">
        Черневская Карина Андреевна
        <br>
        P3224
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
                                    <p id="errorMessage" style="color: red; display: none;">Не выбран ни один
                                        вариант</p>
                                    <button id="final_button">Стреляй</button>
                                </td>
                            </tr>
                        </table>
                    </div>

                </td>
                <td id="graphic_column" class="column">
                    <div id="box_within_graphic_column" class="with_border">
                        <canvas id="canvas_plot"></canvas>
                        <script type="module" src="script.js"></script>
                    </div>
                </td>

                <td id="result_column" class="column">
                    <div id="box_within_results_column" class="with_border">
                        <table id="table_for_results">
                            <tr>
                                <!--                            <th></th>-->
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
<?php
//header('Content-Type: application/json');
if (isset($_SESSION['all_results'])) {
    $all_results = $_SESSION['all_results'];
    // Теперь у вас есть доступ к переменной $_SESSION['my_variable']
} else {
    // Переменная не существует или время ее жизни истекло
    $all_results = array();
    $_SESSION['all_results'] = $all_results;

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    function shiftDecimalRight($inputString): float
    {
        $parts = explode(".", $inputString);
        if (count($parts) === 2) {
            $integerPart = $parts[0];
            $decimalPart = $parts[1];
            $newDecimalPart = 0;
            if (strlen($decimalPart > 2)) {
                $newDecimalPart = ceil("0." . substr($decimalPart, 2, strlen($decimalPart) - 2));
            }
            $newIntegerPart = $integerPart . "." . $decimalPart[0] . $decimalPart[1];
            $outputString = $newIntegerPart . $newDecimalPart;
        } else {
            return $inputString;
        }
        return $outputString;
    }

    function validateX($checkbox): bool
    {
        $integerStrings = array('-4', '-3', '-2', '-1', '0', '1', '2', '3', '4');
        return (in_array($checkbox, $integerStrings));
    }

    function validateR($R): bool
    {
        $rStrings = array('1', '1.5', '2', '2.5', '3', '3.5');
        return (in_array($R, $rStrings));
    }

    function validateY($textY): bool
    {
        return $textY >= -3 && $textY <= 5;
    }

    function hit($checkbox, $textY, $R): bool
    {
        if ($checkbox > 0 && $textY > 0) {
            if ($textY >= (0.5 * $checkbox) && $textY <= ($R / 2) && $checkbox <= $R) {
                return true;
            }
        } elseif ($checkbox < 0 && $textY > 0) {
            if ($checkbox >= -$R / 2 && $textY <= $R) {
                return true;
            }

        } elseif ($checkbox == 0 && $textY == 0) {
            return true;

        } elseif ($checkbox < 0 && $textY < 0) {
            if (-$checkbox * $checkbox - $textY * $textY <= $R * $R)
                return true;
        } elseif ($checkbox == 0 && $textY >= -$R && $textY <= $R || $textY == 0 && $checkbox >= -$R && $checkbox <= $R) {
            return true;
        }
        return false;
    }

    function gettingAnswerForPOST()
    {
        // Получаем JSON-данные из POST-запроса
        $inputJSON = file_get_contents('php://input');
        $data = json_decode($inputJSON);

// Проверка наличия обязательных полей
        if (!isset($data->selectedCheckboxes) || !isset($data->textInput) || !isset($data->R)) {
            $response = array('error' => 'Недостаточно данных');
            echo json_encode($response);
            exit;
        }

// Инициализируем массив для хранения результата проверки
        $results = array();

// Проверка каждого элемента selectedCheckboxes
        foreach ($data->selectedCheckboxes as $checkbox) {
            $start = microtime(true);
            $textY = shiftDecimalRight($data->textInput);
            $status = 'Промах';
            $resultItem = array();
            if (validateX($checkbox) && validateY($textY) && validateR($data->R)) {
                if (hit((int)$checkbox, $textY, (int)($data->R))) {
                    $status = 'Попадание';
                }
                $end = microtime(true);
                $resultItem = array(
                    'X' => $checkbox,
                    'Y' => $data->textInput,
                    'R' => $data->R,
                    'status' => $status,
                    'date' => date('Y-m-d-H:i:s'), // Дата
                    'time' => (string)($end - $start)
                );
            }
            $results[] = $resultItem;
            global $all_results;
            $all_results[] = $resultItem;
        }
        echo json_encode($results);

    }

    gettingAnswerForPOST();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
//    echo json_encode("Hello");
    echo json_encode($all_results);
}

//require "index2.html";


