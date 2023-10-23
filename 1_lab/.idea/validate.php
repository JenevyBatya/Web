<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // Если метод запроса не POST, возвращаем ошибку
    http_response_code(405); // 405 Method Not Allowed
    echo "Метод запроса не разрешен. Используйте POST-запрос.";
    exit;
} else {
    date_default_timezone_set('Europe/Moscow');
    function shiftDecimalRight($inputString): float
    {
        $parts = explode(".", $inputString);
        if (count($parts) === 2) {
            $integerPart = $parts[0];
            $decimalPart = $parts[1];
            $newDecimalPart = "0";
            if (strlen($decimalPart > 2)) {

                for ($i = 0; $i < strlen($decimalPart); $i++) {
                    $char = $decimalPart[$i];
                    if (is_numeric($char) && intval($char) > 0) {
                        global $newDecimalPart;
                        $newDecimalPart = $char;
                        break;
                    }
                }
            } else {
                $newDecimalPart = $decimalPart;
            }
            $newIntegerPart = $integerPart;
            $outputString = $newIntegerPart . $newDecimalPart;
        } else {
            return $inputString;
        }
        return sprintf("%s.%s", $newIntegerPart, $newDecimalPart);
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
                    'Y' => $data->textInput,
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
//    } catch (TypeError $exception) {
//        $response = array('error' => 'Недостаточно данных');
//        echo json_encode($response);
//        exit;
//    }
    }

    gettingAnswerForPOST();

}

