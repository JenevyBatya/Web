<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Метод запроса не разрешен. Используйте POST-запрос.";
    exit;
}
date_default_timezone_set('Europe/Moscow');
function shiftDecimalRight($inputString): float
{
    $newNumber = "";
    $parts = explode(".", $inputString);
    if (count($parts) === 2) {
        $integerPart = $parts[0];
        $decimalPart = $parts[1];
//        $newDecimalPart = "0";

        for ($i = 0; $i < strlen($decimalPart); $i++) {
            $char = $decimalPart[$i];
            if (is_numeric($integerPart) && is_numeric($char)) {
                $num = intval($char);
                if ($num > 0) {

                    $newDecimalPart = str_repeat("0", min(5, $i)) . $char;
                    $newNumber = $integerPart . "." . $newDecimalPart;
                    break;
                }
            } else {
                $newNumber = "a";
            }

        }

    } else if (count($parts) === 1) {
        if (is_numeric($parts[0])) {
            $newNumber = $parts[0];
        } else {
            $newNumber = "a";
        }
    }
    return $newNumber;
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
    if ($textY === "a"){
        return false;
    }
    $y = doubleval($textY);
    return $y >= -3 && $y <= 5;
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

function gettingAnswerForPOST(): void
{
    $inputJSON = file_get_contents('php://input');

    $data = json_decode($inputJSON);

    if (!isset($data->selectedCheckboxes) || !isset($data->textInput) || !isset($data->R) || $data == null) {
        http_response_code(400);
        echo "Невалидный json запрос в обход html";
        exit;
    }

    $results = array();

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
                'Y' => $textY,
                'R' => $data->R,
                'status' => $status,
                'date' => date('Y-m-d-H:i:s'),
                'time' => sprintf("%.8f", (string)($end - $start))
            );
        } else {
            http_response_code(400);
            echo "Невалидные данные. Обход за html";
        }
        $results[] = $resultItem;
        global $all_results;
        $all_results[] = $resultItem;
    }
    echo json_encode($results);
}

gettingAnswerForPOST();



