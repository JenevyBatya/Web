import {fetchData, updatePage, updateSession, fillTable} from './dataManager';
import {saveData} from './saveDataBeforeReloading';

document.addEventListener("DOMContentLoaded", function () {


    const canvasPlot = document.getElementById('canvas_plot')
    const ctx = canvasPlot.getContext('2d')
    const canvasPlotWidth = canvasPlot.width
    const canvasPlotHeight = canvasPlot.height
    const xAxis = canvasPlotWidth / 2
    const yAxis = canvasPlotHeight / 2
    const scaleX = 25
    const scaleY = 13
    // TODO сделать через локальную переменную
    const sharedData = {
        R: 0,
    }

    module.exports = sharedData

    function drawAxes() {
        ctx.beginPath()
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i <= canvasPlotWidth; i += scaleX) {
            const x = i - xAxis;
            if (x / scaleX === 0) {
                continue
            }
            ctx.moveTo(i, yAxis - 3); // Нижняя черточка
            ctx.lineTo(i, yAxis + 3);
            ctx.fillText(x / scaleX, i - 3, yAxis + 12, 5); // Текст над черточкой
        }

        for (let i = 0; i <= canvasPlotHeight; i += scaleY) {
            const y = yAxis - i;
            if (Math.round(y / scaleY) === 0) {
                continue
            }
            if (y !== 0) { // Пропускаем черточку в начале оси
                ctx.moveTo(xAxis - 3, i - 3);
                ctx.lineTo(xAxis + 3, i - 3);
                ctx.fillText(Math.round(y / scaleY), xAxis + 10, i + 2, 4);
            }
        }
        ctx.strokeStyle = '#000000'
        ctx.strokeStyle = '#7FFFD4FF'
        ctx.moveTo(Math.round(xAxis), Math.round(0));
        ctx.lineTo(Math.round(xAxis), Math.round(canvasPlotHeight));

        ctx.moveTo(Math.round(0), Math.round(yAxis));
        ctx.lineTo(Math.round(canvasPlotWidth), Math.round(yAxis));
        ctx.stroke()
        ctx.closePath()
    }


    drawAxes()
    const radioButtons = document.querySelectorAll('input[type="radio"][name="option"]');

    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
            sharedData.R = radioButton.value;
            ctx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
            console.log('Выбрана опция:', sharedData.R);
            ctx.fillStyle = "#5b6ca3"
            //Прямоугольник
            ctx.fillRect(xAxis - scaleX * sharedData.R / 2, yAxis - scaleY * sharedData.R, sharedData.R / 2 * scaleX, scaleY * sharedData.R)
            ctx.stroke();

            ctx.moveTo(xAxis, yAxis)
            ctx.lineTo(xAxis + scaleX * sharedData.R, yAxis)
            ctx.lineTo(xAxis, yAxis - scaleY * sharedData.R / 2)
            ctx.lineTo(xAxis, yAxis)
            ctx.fill()

            //Четверть круга
            const radiusX = scaleX;
            const radiusY = scaleY;

            const startAngle = -Math.PI * 3 / 2;
            const endAngle = -Math.PI

            ctx.ellipse(xAxis, yAxis, radiusX * sharedData.R, radiusY * sharedData.R, 0, startAngle, endAngle);
            ctx.fill();


            drawAxes()
        });
    });
})