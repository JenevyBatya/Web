document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("final_button")
    // const errorBlock = document.getElementById("errorBlock")
    updatePage(getDataFromSession())

    function validate() {

    }

    function getDataFromSession() {

        let data = localStorage.getItem("data")
        // console.log(data)
        if (data) {
            // console.log("njasnkjc")
            let dataObject = JSON.parse(data)
            if (Date.now() <= dataObject.expirationTime) {
                // console.log("najsnlc")
                return dataObject.data;
            } else {
                localStorage.removeItem('data');
            }
        }
        return []
    }

    function errorRise(text) {
        let errorDiv = document.getElementById('errorBlock')
        errorDiv.style.display = 'flex'
        errorDiv.textContent = text
        // console.log(",avc")
        setTimeout(function () {
            errorDiv.style.display = 'none'
        }, 5000); // 2000 миллисекунд (2 секунды)
    }

    function updatePage(oldData) {
        // console.log(oldData)
        if (oldData.length !== 0) {
            let oldDataNew = []
            for (let i of oldData) {
                // console.log(i)
                if (i.length !== 0) {
                    oldDataNew.push(i)
                }
            }
            fillTable(oldDataNew)
        } else {
            let expirationTime = Date.now() + 30 * 60 * 1000;
            let dataToStore = {
                data: [],
                expirationTime: expirationTime

            };
            localStorage.setItem("data", JSON.stringify(dataToStore))
        }
    }

    function updateSession(newData) {
        let dataObject = JSON.parse(localStorage.getItem("data"))
        // console.log(newData)
        // console.log(dataObject.data)

        let dataToStore = {
            data: dataObject.data.concat(newData),
            expirationTime: dataObject.expirationTime

        };
        localStorage.setItem("data", JSON.stringify(dataToStore))
    }

    function fillTable(data) {
        try {
            if (data[0].length !== 0) {
                console.log(data[0].length)

                data.forEach(resultItem => {
                    // console.log(resultItem.X, "*********")
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

                    const table = document.getElementById('table_for_results');
                    table.appendChild(newRow);
                });
            } else {
                // errorRise()
            }
        } catch (SyntaxError) {
            // errorRise()
        }

    }


    button.addEventListener("click", function () {

        let flagCheckbox = false
        let flagInput = false
        let flagRadio = false

        // let emptyCount = 0
        let selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedValues = [];
        if (selectedCheckboxes.length > 0) {
            selectedCheckboxes.forEach(function (checkbox) {
                selectedValues.push(checkbox.value);
            });
        } else {
            flagCheckbox = true
        }


        let textInput = document.getElementById("choose_y").value
        if (!(/^\d+$/.test(textInput)) || parseFloat(textInput) < -3 || parseFloat(textInput) > 5) {
            flagInput = true
        }
        let selectedRadio = document.querySelector('input[type="radio"]:checked');
        if (!selectedRadio) {
            flagRadio = true
        }

        console.log(flagCheckbox, flagInput, flagRadio)
        if (flagCheckbox) {
            errorRise("Выберите хотя бы один чекбокс")
            // errorBlock.textContent = "Выберите хотя бы один чекбокс"
        } else if (flagInput) {
            errorRise("Невалидные данные в поле Y")
            // errorBlock.textContent = "Невалидные данные в поле Y"
        } else if (flagRadio) {
            errorRise("Выберите R")
            // errorBlock.textContent = "Выберите R"
        } else {


            let data = {
                selectedCheckboxes: selectedValues,
                textInput: textInput,
                R: R
            };
            console.log("Sent data", data)
            fetch('validate.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Accepted data", data)
                    fillTable(data)
                    updateSession(data)


                })


        }
    })
})