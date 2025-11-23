// APPLY SAVED THEME
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// TOGGLE BUTTON
const toggle = document.getElementById("theme-toggle");

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggle.textContent = "Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            toggle.textContent = "Dark Mode";
        }
    });

    if (localStorage.getItem("theme") === "dark") {
        toggle.textContent = "Light Mode";
    }
}
