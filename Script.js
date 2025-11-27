/*document.addEventListener("DOMContentLoaded", function () {*/

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
                toggle.textContent = "☀";
            } else {
                localStorage.setItem("theme", "light");
                toggle.textContent = "☾";
            }
        });

        // Update icon on refresh
        if (localStorage.getItem("theme") === "dark") {
            toggle.textContent = "☀";
        } else {
            toggle.textContent = "☾";
        }
    }

// BACK TO TOP BUTTON
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// CLOCK FUNCTIONALITY
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();

  const clockElement = document.getElementById("clock");
  if (clockElement) {
    clockElement.textContent = "Current Time: " + time;
  }
}

setInterval(updateClock, 1000);
updateClock();


// SORTING FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort-select");
    const parent = document.getElementById("services-list");
    let services = Array.from(document.querySelectorAll("#services-list .service-container"));

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(services);
    services.forEach(service => parent.appendChild(service));

    sortSelect.addEventListener("change", () => {
        const option = sortSelect.value;
        let sorted = [...services];

        if (option === "price-asc") {
            sorted.sort((a, b) => a.dataset.price - b.dataset.price);
        } else if (option === "price-desc") {
            sorted.sort((a, b) => b.dataset.price - a.dataset.price);
        } else if (option === "name-asc") {
            sorted.sort((a, b) =>
                a.dataset.name.localeCompare(b.dataset.name)
            );
        } else if (option === "name-desc") {
            sorted.sort((a, b) =>
                b.dataset.name.localeCompare(a.dataset.name)
            );
        }

        sorted.forEach(service => parent.appendChild(service));
    });
});

// DONATION FORM (Extra Functionality)
document.addEventListener("DOMContentLoaded", function () {

    const donationForm = document.querySelector(".donation-form form");

    if (!donationForm) return; 

    donationForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        let name = document.getElementById("name").value.trim();
        let dob = document.getElementById("dob").value;
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let gender = document.querySelector("input[name='gender']:checked");
        let category = document.getElementById("category").value;
        let amount = document.getElementById("amount").value.trim();

        let errorMessage = "";
        
        if (name === "") errorMessage = "Please enter your name.";
        else if (dob === "") errorMessage = "Please enter your date of birth.";
        else if (!email.includes("@") || !email.includes("."))  errorMessage = "Please enter a valid email.";
        else if (phone.length < 8) errorMessage = "Please enter a valid phone number.";
        else if (!gender) errorMessage = "Please select your gender.";
        else if (category === "") errorMessage = "Please choose a donation category.";
        else if (amount === "" || amount <= 0) errorMessage = "Please enter a valid amount.";

        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }

        // SUCCESS MESSAGE
        alert("Thank you for your donation! Your support means a lot ❤️");

        donationForm.reset();

        const toggle = document.getElementById("donate-toggle");
        toggle.checked = false;
    });
});

document.addEventListener("DOMContentLoaded", function() {

  
    const joinBtn = document.querySelector(".join-btn");
    if (joinBtn) {
        joinBtn.onclick = function() {
            alert("Thank you for joining our campaign!");
        };
    }

  
    const consultationForm = document.querySelector(".consultation-form");
    if (consultationForm) {
        consultationForm.onsubmit = function(e) {
            e.preventDefault();
            alert("Your question has been sent successfully!");
        };
    }

});



 



