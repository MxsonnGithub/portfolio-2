// Your existing JavaScript remains the same
function updateTime() {
    const userTimeElement = document.getElementById("user-time");
    const masonTimeElement = document.getElementById("mason-time");
    const sunMoonElement = document.getElementById("sun-moon");

    const now = new Date();
    const userTime = now.toLocaleString("en-US", { timeZoneName: "short" });
    const masonTime = now.toLocaleString("en-US", { timeZone: "America/Chicago", timeZoneName: "short" });

    userTimeElement.textContent = `Your Time: ${userTime}`;
    masonTimeElement.textContent = `Mason's Time (CST): ${masonTime}`;

    const hour = now.getHours();
    if (hour >= 6 && hour < 18) {
        sunMoonElement.classList.add("sun");
        sunMoonElement.classList.remove("moon");
    } else {
        sunMoonElement.classList.add("moon");
        sunMoonElement.classList.remove("sun");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const lanyardHover = document.getElementById("lanyard-hover");
    const lanyardStatus = document.getElementById("lanyard-status");

    async function fetchLanyardData() {
        try {
            const response = await fetch("https://api.lanyard.rest/v1/users/1038956642139656194");
            const data = await response.json();

            if (data.success) {
                const { discord_user, activities, listening_to_spotify } = data.data;

                let statusContent = `
                    <p><strong>${discord_user.username}#${discord_user.discriminator}</strong></p>
                    <p>Status: ${data.data.discord_status}</p>
                `;

                if (listening_to_spotify) {
                    const spotify = data.data.spotify;
                    statusContent += `
                        <p>🎵 Listening to <strong>${spotify.song}</strong> by <strong>${spotify.artist}</strong></p>
                    `;
                }

                if (activities.length > 0) {
                    activities.forEach(activity => {
                        if (activity.type === 0) {
                            statusContent += `<p>💬 ${activity.state}</p>`;
                        }
                    });
                }

                lanyardStatus.innerHTML = statusContent;
            } else {
                lanyardStatus.innerHTML = "<p>Unable to fetch status.</p>";
            }
        } catch (error) {
            console.error("Error fetching Lanyard data:", error);
            lanyardStatus.innerHTML = "<p>Error fetching status.</p>";
        }
    }

    lanyardHover.addEventListener("mouseenter", () => {
        lanyardStatus.classList.add("show");
        fetchLanyardData();
    });

    lanyardHover.addEventListener("mouseleave", () => {
        lanyardStatus.classList.remove("show");
    });
});

setInterval(updateTime, 1000);
updateTime();