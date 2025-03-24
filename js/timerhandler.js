document.addEventListener("DOMContentLoaded", function() {
    let totalSeconds = 0;
    let timer;

    function updateDisplay() {
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor((totalSeconds % 86400) / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        document.getElementById("timer-display").textContent = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    document.getElementById("add-day").onclick = function() {
        totalSeconds += 86400;
        updateDisplay();
    };

    document.getElementById("add-hour").onclick = function() {
        totalSeconds += 3600;
        updateDisplay();
    };

    document.getElementById("add-minute").onclick = function() {
        totalSeconds += 60;
        updateDisplay();
    };

    document.getElementById("timer-start").onclick = function() {
        clearInterval(timer);
        timer = setInterval(function() {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timer);
                alert("Time's up!");
            }
        }, 1000);
    };

    document.getElementById("timer-end").onclick = function() {
        clearInterval(timer);
    };

    document.getElementById("timer-reset").onclick = function() {
        totalSeconds = 0;
        updateDisplay();
    };

    updateDisplay();
});
