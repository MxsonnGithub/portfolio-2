// Get the current time and update the sun/moon and time zones
function updateTime() {
    const userTimeElement = document.getElementById("user-time");
    const masonTimeElement = document.getElementById("mason-time");
    const sunMoonElement = document.getElementById("sun-moon");

    const now = new Date();
    const userTime = now.toLocaleString("en-US", { timeZoneName: "short" });
    const masonTime = now.toLocaleString("en-US", { timeZone: "America/Chicago", timeZoneName: "short" });

    // Update user time and Mason time
    userTimeElement.textContent = `Your Time: ${userTime}`;
    masonTimeElement.textContent = `Mason's Time (CST): ${masonTime}`;

    // Update sun or moon based on user's local hour
    const hour = now.getHours();
    if (hour >= 6 && hour < 18) {
        sunMoonElement.classList.add("sun");
        sunMoonElement.classList.remove("moon");
    } else {
        sunMoonElement.classList.add("moon");
        sunMoonElement.classList.remove("sun");
    }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();
