function updateTime() {
    let moscowTime = new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"});
    let time = document.getElementById('time')
    if (time) {
        time.innerText = moscowTime
    }
    // document.getElementById('time').innerHTML = moscowTime;
}

document.addEventListener('DOMContentLoaded', function () {
    updateTime()
    setInterval(updateTime, 6000); // Вызываем функцию каждые 5 секунд
})


