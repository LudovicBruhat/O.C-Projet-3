var button = document.getElementById("btnSign");
var timerText = document.getElementById("timer");

button.addEventListener("click", function(e) {
    event.preventDefault();

    var counter = 0;
    var timeLeft = 1200;

    function convertSec(s) {
        var min = Math.floor(s / 60);
        var sec = s % 60;
        return min + ":" + sec;
    }
    timerText.innerHTML = (convertSec(timeLeft - counter));


    // TODO timer //
    function countDown() {
        counter ++;
        timerText.innerHTML = (convertSec(timeLeft - counter));
    }

    setInterval(countDown, 1000);
});