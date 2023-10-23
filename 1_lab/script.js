// const button = document.getElementById("final_button")
// const canvasPlot = document.getElementById('canvas_plot')
// const ctx = canvasPlot.getContext('2d')
// const canvasPlotWidth = canvasPlot.width
// const canvasPlotHeight = canvasPlot.height
//
// const xAxis = canvasPlotWidth / 2
// const yAxis = canvasPlotHeight / 2
// const scaleX = 25
// const scaleY = 13
// let R = 0
//
// updatePage(getDataFromSession())
//
// function getDataFromSession() {
//     let data = localStorage.getItem("data")
//     if (data) {
//         let dataObject = JSON.parse(data)
//         if (Date.now() <= dataObject.expirationTime) {
//             return dataObject.data;
//         } else {
//             localStorage.removeItem('data');
//         }
//     }
//     return []
// }
//
// function updatePage(oldData) {
//     if (oldData.length !== 0) {
//         fillTable(oldData)
//     } else {
//         let expirationTime = Date.now() + 30 * 60 * 1000;
//         let dataToStore = {
//             data: [],
//             expirationTime: expirationTime
//
//         };
//         localStorage.setItem("data", JSON.stringify(dataToStore))
//     }
// }
//
// function updateSession(newData) {
//     let dataObject = JSON.parse(localStorage.getItem("data"))
//     console.log(newData)
//     console.log(dataObject.data)
//
//     let dataToStore = {
//         data: dataObject.data.concat(newData),
//         expirationTime: dataObject.expirationTime
//
//     };
//     localStorage.setItem("data", JSON.stringify(dataToStore))
// }
//
// function fillTable(data) {
//     if (data[0].length !== 0) {
//         console.log(data[0].length)
//
//         data.forEach(resultItem => {
//             // Создаем новую строку в таблице
//             const newRow = document.createElement('tr');
//
//             // Создаем и добавляем ячейки для каждого столбца
//             const checkboxCell = document.createElement('td');
//             checkboxCell.textContent = resultItem.X;
//             newRow.appendChild(checkboxCell);
//
//             const textInputCell = document.createElement('td');
//             textInputCell.textContent = resultItem.Y;
//             newRow.appendChild(textInputCell);
//
//             const rCell = document.createElement('td');
//             rCell.textContent = resultItem.R;
//             newRow.appendChild(rCell);
//
//             const statusCell = document.createElement('td');
//             statusCell.textContent = resultItem.status;
//             newRow.appendChild(statusCell);
//
//             const dateCell = document.createElement('td');
//             dateCell.textContent = resultItem.date;
//             newRow.appendChild(dateCell);
//
//             const timeCell = document.createElement('td');
//             timeCell.textContent = resultItem.time;
//             newRow.appendChild(timeCell);
//
//             // Добавляем строку в таблицу
//             const table = document.getElementById('table_for_results');
//             table.appendChild(newRow);
//         });
//     }
// }
//
// function drawAxes() {
//     ctx.beginPath()
//     ctx.fillStyle = "#ffffff";
//     for (let i = 0; i <= canvasPlotWidth; i += scaleX) {
//         const x = i - xAxis;
//         if (x / scaleX === 0) {
//             continue
//         }
//         ctx.moveTo(i, yAxis - 3); // Нижняя черточка
//         ctx.lineTo(i, yAxis + 3);
//         ctx.fillText(x / scaleX, i - 3, yAxis + 12, 5); // Текст над черточкой
//     }
//
//     // Рисуем ось Y и добавляем черточки с подписями
//     for (let i = 0; i <= canvasPlotHeight; i += scaleY) {
//         const y = yAxis - i;
//         if (Math.round(y / scaleY) === 0) {
//             continue
//         }
//         if (y !== 0) { // Пропускаем черточку в начале оси
//             ctx.moveTo(xAxis - 3, i - 3);
//             ctx.lineTo(xAxis + 3, i - 3);
//             ctx.fillText(Math.round(y / scaleY), xAxis + 10, i + 2, 4);
//         }
//     }
//     ctx.strokeStyle = '#000000'
//     // console.log(xAxis, yAxis)
//     ctx.strokeStyle = '#7FFFD4FF'
//     ctx.moveTo(Math.round(xAxis), Math.round(0));
//     ctx.lineTo(Math.round(xAxis), Math.round(canvasPlotHeight));
//
//     ctx.moveTo(Math.round(0), Math.round(yAxis));
//     ctx.lineTo(Math.round(canvasPlotWidth), Math.round(yAxis));
//     ctx.stroke()
//     ctx.closePath()
// }
//
//
// drawAxes()
//
// const radioButtons = document.querySelectorAll('input[type="radio"][name="option"]');
//
// radioButtons.forEach((radioButton) => {
//     radioButton.addEventListener('change', () => {
//         R = radioButton.value;
//         ctx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
//         // Вы можете выполнить дополнительные действия здесь при изменении выбора
//         console.log('Выбрана опция:', R);
//         ctx.fillStyle = "#5b6ca3"
//         //Прямоугольник
//         ctx.fillRect(xAxis - scaleX * R / 2, yAxis - scaleY * R, R / 2 * scaleX, scaleY * R)
//         ctx.stroke();
//
//         //Треугольник
//         ctx.moveTo(xAxis, yAxis)
//         ctx.lineTo(xAxis + scaleX * R, yAxis)
//         ctx.lineTo(xAxis, yAxis - scaleY * R / 2)
//         ctx.lineTo(xAxis, yAxis)
//         ctx.fill()
//
//         //Четверть круга
//         const radiusX = scaleX;
//         const radiusY = scaleY;
//
//         const startAngle = -Math.PI * 3 / 2;
//         const endAngle = -Math.PI
//
//         ctx.ellipse(xAxis, yAxis, radiusX * R, radiusY * R, 0, startAngle, endAngle);
//         ctx.fill();
//
//
//         drawAxes()
//     });
// });
//
// button.addEventListener("click", function () {
//     //Проверка Х
//     let selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
//     let selectedValues = [];
//     if (selectedCheckboxes.length > 0) {
//         selectedCheckboxes.forEach(function (checkbox) {
//             selectedValues.push(checkbox.value);
//         });
//     }
//     //Проверка Y
//     let textInput = document.getElementById("choose_y").value
//
//     let data = {
//         selectedCheckboxes: selectedValues,
//         textInput: textInput,
//         R: R
//     };
//     console.log("Sent data", data)
// // Отправка JSON на сервер с использованием fetch
//     fetch('validate.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Accepted data", data)
//             // Полученные данные из JSON
//             fillTable(data)
//             updateSession(data)
//
//         })
// })
