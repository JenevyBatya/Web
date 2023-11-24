import {requestResponse} from './dataManager';

export function drawPoint(newX, newY, status, svgOXY) {

    let point = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    let x = 50 * newX + 250
    let y = 250 - 50 * newY
    point.setAttribute("cx", x)
    point.setAttribute("cy", y)
    point.setAttribute("r", 2)
    point.setAttribute("opacity", "0.5");
    if (status === "Попадание") {
        point.setAttribute("fill", "#99E350")
    } else {
        point.setAttribute("fill", "red")
    }
    svgOXY.appendChild(point)
}
export function drawRect(R) {
    const svg = document.getElementById('svg_graph');
    const existingRect = document.getElementById('dynamicRect');
    const existingCircle = document.getElementById('dynamicCircle');
    const existingTriangle = document.getElementById('dynamicTriangle');
    if (existingRect) {
        svg.removeChild(existingRect);
    }
    if (existingCircle) {
        svg.removeChild(existingCircle)
    }
    if (existingTriangle) {
        svg.removeChild(existingTriangle)
    }
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    rect.setAttribute("id", "dynamicRect");
    rect.setAttribute("x", 250);
    rect.setAttribute("y", 250 - R * 50 * 0.5);
    rect.setAttribute("width", R * 50);
    rect.setAttribute("height", R * 50 * 0.5);
    rect.setAttribute("fill", "#5b6ca3");
    svg.appendChild(rect);

    circle.setAttribute("id", "dynamicCircle");
    const x = 250;
    const y = 250;
    const radius = R * 25;
    const startAngle = 0;
    const endAngle = 90;
    const largeArcFlag = 0;
    const sweepFlag = 1;


    const startX = x + radius * Math.cos(startAngle * (Math.PI / 180));
    const startY = y + radius * Math.sin(startAngle * (Math.PI / 180));

    const endX = x + radius * Math.cos(endAngle * (Math.PI / 180));
    const endY = y + radius * Math.sin(endAngle * (Math.PI / 180));

    const d = `M ${x} ${y} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;
    circle.setAttribute("d", d);
    circle.setAttribute("fill", "#5b6ca3");
    svg.appendChild(circle);
    triangle.setAttribute("id", "dynamicTriangle")
    let x1 = 250 - 50 * R
    let y1 = 250
    let x2 = 250
    let y2 = 250
    let x3 = 250
    let y3 = 250 + 50 * R * 0.5
    triangle.setAttribute("points", x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3)
    triangle.setAttribute("fill", "#5b6ca3")
    svg.appendChild(triangle)

}

document.addEventListener("DOMContentLoaded", function () {

    const svg = document.getElementById('svg_graph');
    const svgOXY = document.getElementById("OXY")
    const svgPoints = document.getElementById("points")
    let R = 0;



    const radioButtons = document.querySelectorAll('input[type="radio"][name="option"]');

    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
            R = radioButton.value;
            drawRect(R)

        });
    });

    svgOXY.addEventListener("click", addPoint)

    function addPoint(event) {
        let x = event.clientX - svg.getBoundingClientRect().left
        let y = event.clientY - svg.getBoundingClientRect().top
        let selectedRadio = document.querySelector('input[type="radio"]:checked');
        let newX = -(250 - x) / 50.0
        let newY = (250 - y) / 50.0


        let t;
        requestResponse(["" + newX], "" + newY, selectedRadio, function (status) {
            drawPoint(newX, newY, status, svgOXY);
        });

    }


})