import {drawPoint} from "./index";

export function errorRise(text) {
    let errorDiv = document.getElementById('errorBlock')
    errorDiv.style.display = 'flex'
    errorDiv.textContent = text
    setTimeout(function () {
        errorDiv.style.display = 'none'
    }, 5000);
}

export function requestResponse(selectedCheckboxes, textInput, selectedRadio, callback) {
    let flagCheckbox = false
    let flagInput = false
    let flagRadio = false
    let selectedValues = [];
    if (selectedCheckboxes.length > 0) {

        if (selectedCheckboxes[0] instanceof Element) {
            selectedCheckboxes.forEach(function (checkbox) {
                selectedValues.push(checkbox.value);
            });
        } else {
            selectedValues.push(selectedCheckboxes[0])
        }

    } else {
        flagCheckbox = true
    }

    if (!/^(-?\d+|-?\d+\.\d+)$/.test(textInput) || parseFloat(accurateY(textInput)) < -3 || parseFloat(accurateY(textInput)) > 5) {
        flagInput = true
    }
    if (!selectedRadio) {
        flagRadio = true
    }

    // console.log(flagCheckbox, flagInput, flagRadio)
    if (flagCheckbox) {
        errorRise("Выберите хотя бы один чекбокс")
        return null
    } else if (flagInput) {
        errorRise("Невалидные данные в поле Y")
        return null
    } else if (flagRadio) {
        errorRise("Выберите R")
        return null
    } else {
        let data = {
            X: selectedValues,
            Y: textInput,
            R: selectedRadio.value
        };
        console.log("Sent data", data)
        fetch('/pathetic', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Ошибка HTTP: " + response.status);
                }
            })
            .then(data => {
                console.log("Accepted data", data)

                fillTable(data)
                if (data[0].length !== 0) {
                    callback(data[0].status);

                }
            })
        // .catch(error => {
        //     console.log(error)
        //     errorRise("Невалидные данные в поле Y")
        //     // callback(null);
        // });
    }
}

function fillTable(data) {
    try {
        if (data[0].length !== 0) {

            data.forEach(resultItem => {
                const newRow = document.createElement('tr');

                const checkboxCell = document.createElement('td');
                checkboxCell.textContent = resultItem.X;
                newRow.appendChild(checkboxCell);

                const textInputCell = document.createElement('td');
                textInputCell.textContent = resultItem.Y;
                newRow.appendChild(textInputCell);

                const rCell = document.createElement('td');
                rCell.textContent = resultItem.R;
                newRow.appendChild(rCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = resultItem.status;
                newRow.appendChild(statusCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = resultItem.date;
                newRow.appendChild(dateCell);

                const timeCell = document.createElement('td');
                timeCell.textContent = resultItem.time;
                newRow.appendChild(timeCell);

                newRow.addEventListener("click", function () {
                    handleInfoFromRow(newRow);
                });

                const table = document.getElementById('table_for_results');
                table.appendChild(newRow);
                let svgOXY = document.getElementById("OXY")
                drawPoint(resultItem.X, resultItem.Y, resultItem.status, svgOXY)


            });
        }
    } catch (SyntaxError) {
    }

}

function clickableTableAfterGet() {
    let table = document.getElementById("table_for_results")
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i]
        row.addEventListener("click", function () {
            handleInfoFromRow(row)
        })
    }
}

function accurateY(y) {
    const parts = y.split(".");
    let newNumber = "";
    const regex = /\d+/;

    if (parts.length === 2) {
        const integerPart = parts[0];
        const decimalPart = parts[1];
        let newDecimalPart = "0";

        for (let i = 0; i < decimalPart.length; i++) {
            const num = decimalPart[i];

            if (regex.test(num) && regex.test(integerPart)) {
                const intNum = parseInt(num, 10);

                if (intNum > 0) {
                    newDecimalPart = "0".repeat(Math.min(5, i)) + num;
                    newNumber = `${integerPart}.${newDecimalPart}`;
                    break;
                }
            } else {
                newNumber = "a";
            }
        }
    } else {
        newNumber = regex.test(parts[0]) ? parts[0] : "a";
    }

    return newNumber;
}

function handleInfoFromRow(row) {

    let cells = row.getElementsByTagName("td");
    let x = (cells[0]).textContent
    let y = cells[1].textContent
    let r = cells[2].textContent
    let result = cells[3].textContent
    let date = cells[4].textContent
    let time = cells[5].textContent
    const newUrl = `http://localhost:8080/pathetic/result?x=${x}&y=${y}&r=${r}&result=${result}&date=${date}&time=${time}`;
    window.open(newUrl, '_blank');
}


document.addEventListener("DOMContentLoaded", function () {

    window.onload = function () {
        clickableTableAfterGet();
    };


    const button = document.getElementById("final_button")
    // getDataFromSession()


    button.addEventListener("click", function () {
        let selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let textInput = document.getElementById("choose_y").value
        let selectedRadio = document.querySelector('input[type="radio"]:checked');
        requestResponse(selectedCheckboxes, textInput, selectedRadio)
    })

})