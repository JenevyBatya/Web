function drawRect(R) {
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
    rect.setAttribute("x", 250 - R * 50);
    rect.setAttribute("y", 250 - R * 50);
    rect.setAttribute("width", R * 50);
    rect.setAttribute("height", R * 50);
    rect.setAttribute("fill", "#5b6ca3");
    svg.appendChild(rect);

    circle.setAttribute("id", "dynamicCircle");
    const x = 250;
    const y = 250;
    const radius = R * 50;
    const startAngle = 360;
    const endAngle = 450;
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
    let y3 = 250 + 25 * R
    triangle.setAttribute("points", x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3)
    triangle.setAttribute("fill", "#5b6ca3")
    svg.appendChild(triangle)
}

function drawPoint(newX, newY, status, svgOXY) {

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

    point.classList.add("point"); // Добавить класс "point" к точке

    svgOXY.appendChild(point)
}

function logNewTableData(points) {
    let pointsToRemove = document.querySelectorAll(".point");

    pointsToRemove.forEach(point => point.remove());

    const tableRows = document.querySelectorAll('#dataTable tbody tr:not(.read)'); // Получаем только строки без класса "read"

    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td'); // Получаем все ячейки в строке
            drawPoint(parseFloat(cells[0].textContent.trim()), parseFloat(cells[1].textContent.trim()), cells[3].textContent.trim(), points)
            row.addEventListener('click', () => {
                console.log('Значение ячейки 1:', parseFloat(cells[0].textContent.trim()));
                console.log('Значение ячейки 2:', parseFloat(cells[1].textContent.trim()));
                console.log('Значение ячейки 4:', cells[3].textContent.trim());

            })
        });
    }
}

let R = localStorage.getItem('R') || 2;


document.addEventListener('DOMContentLoaded', function () {
    console.log(R)
    let OXY = document.getElementById("OXY")
    let svg_graph = document.getElementById("svg_graph")
    let points = document.getElementById("points")
    console.log(OXY, svg_graph,points)
    OXY.addEventListener('click', addPoint)
    svg_graph.addEventListener('click', addPoint)
    points.addEventListener('click', addPoint)
    drawRect(R)
    window.updateTextInput = function (event, ui) {
        drawRect(ui.value)
        R = ui.value
        localStorage.setItem('R', R);
    }


    window.onload = function () {
        logNewTableData(OXY);

        const tableObserver = new MutationObserver(function (mutationsList) {
            logNewTableData(OXY);
        });

        const tableNode = document.getElementById('table_result');
        tableObserver.observe(tableNode, {childList: true, subtree: true});
    };

    function addPoint(event) {
        console.log("addpoint")
        let x = event.clientX - OXY.getBoundingClientRect().left
        let y = event.clientY - OXY.getBoundingClientRect().top
        let newX = -(250 - x) / 50.0
        let newY = (250 - y) / 50.0
        $('#formId\\:inputX').val(newX);
        $('#formId\\:inputY').val(newY);
        $('#formId\\:addPoint').click();

        // Trigger the action to send the coordinates to the managed bean
        document.getElementById('submit').click();
    }
})

