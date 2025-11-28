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



// ================================================
//  REQUESTS A SERVICE [ FORM VALIDATION +STAY MOD ]
// ================================================

let tempRequests = []; // Requests stay temporarily until page reload

// ===== Get display name from select option =====
function getServiceName(serviceValue) {
    const select = document.getElementById("serviceType");
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === serviceValue) {
                return select.options[i].textContent;
            }
        }
    }
    return serviceValue;
}

// =====  Get service image based on selection =====
function getServiceImage(serviceValue) {
    switch (serviceValue) {
        // Recycling Collection
        case "paper-recycling": return "paper.jpeg";
        case "plastic-recycling": return "Plastic Recycling.jpg";
        case "glass-recycling": return "glass.jpeg";

        // Environmental Workshops
        case "eco-crafts-workshop": return "Eco Crafts Workshop.jpg";
        case "green-living-workshop": return "/HomeImages/Green Living Workshop[1].jpg";
        case "garden-care-workshop": return "/Garden Care Basics Workshop[1].jpg";

        // Garden Maintenance
        case "tree-trimming": return "Tree Trimming.jpg";
        case "garden-plant-care": return "/HomeImages/Garden Plant Care[1].jpg";
        case "garden-landscaping": return "Garden Landscaping.jpg";

        // Default
        default: return "../ServicesImage/default.jpg";
    }
}

// ===== Display temporary requests stay mod =====
function showTempRequests(displayBox, form) {
    const temporaryDisplay = document.getElementById("temporary-requests-display");

    if (tempRequests.length === 0) {
        if (temporaryDisplay) temporaryDisplay.style.display = 'none';
        return;
    }

    if (temporaryDisplay) temporaryDisplay.style.display = 'block';
    displayBox.innerHTML = "";

    tempRequests.forEach((req, index) => {
        let imgPath = getServiceImage(req.service);
        displayBox.innerHTML += `
            <div class="status-pending">
                <div class="request-card new-request-card" style="border: 2px solid #5aa53e; background-color: #f0fdf4; margin-bottom: 15px;">
                    <img src="${imgPath}" alt="${getServiceName(req.service)} Image" style="width:100%; height:150px; object-fit:cover; border-bottom:1px solid #ccc;">
                    <div class="request-details" style="padding: 10px;">
                        <p class="request-title" style="color:#222; font-weight: bold;">New Request #${index + 1}: ${getServiceName(req.service)}</p>
                        <p class="request-meta">Customer: ${req.name}</p>
                        <p class="request-meta">Due Date: ${req.date}</p>
                        <p class="request-meta">Status: <strong class="status-text-pending">New - Awaiting Review</strong></p>
                        <p class="request-meta">Description: ${req.desc.substring(0, 70)}...</p>
                    </div>
                </div>
            </div>
        `;
    });

    form.reset();
}

// ===== Save request to localStorage =====
function saveRequestToLocalStorage(requestObj) {
    let stored = JSON.parse(localStorage.getItem("requests")) || [];
    stored.push({
        service: requestObj.service,
        name: requestObj.name,
        date: requestObj.date,
        desc: requestObj.desc,
        status: "Pending"
    });
    localStorage.setItem("requests", JSON.stringify(stored));
}

// ===== Validate service request form =====
function validateRequestForm(e) {
    e.preventDefault();

    let form = e.target;
    let service = document.getElementById("serviceType").value;
    let name = document.getElementById("fullName").value.trim();
    let date = document.getElementById("preferredDate").value;
    let desc = document.getElementById("notes").value.trim();
    let displayBox = document.getElementById("new-requests-container");

    let errorMessage = "";

    // Service validation
    if (service === "") errorMessage += "• Please select a service type.\n";

    // Name validation: exactly 2 words, letters only
    const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
    let badChars = /[0-9!?@]/;
    if (name === "") errorMessage += "• Full Name is required.\n";
    else if (!nameRegex.test(name) || badChars.test(name))
        errorMessage += "• Full name must contain two words (letters only, no numbers or ! ? @).\n";

    // Date validation: at least 3 days from today
    if (date === "") errorMessage += "• Please select a preferred date (Due date).\n";
    else {
        let selected = new Date(date);
        let today = new Date();
        selected.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        let minDate = new Date(today);
        minDate.setDate(today.getDate() + 3);
        if (selected < minDate) errorMessage += "• Due date must be at least 3 days from today.\n";
    }

    // Description validation
    if (desc.length < 100) errorMessage += `• Request description must be at least 100 characters (currently ${desc.length}).\n`;

    if (errorMessage !== "") {
        alert("Please fix the following before submitting:\n\n" + errorMessage);
        return;
    }

    const confirmMessage = "Your service request has been sent successfully!\n\nDo you want to stay on this page to add another service (OK), or return to the dashboard (Cancel)?";
    let stay = confirm(confirmMessage);

    let requestObj = { service, name, date, desc };

    if (stay) {
        tempRequests.push(requestObj);
        showTempRequests(displayBox, form);
    } else {
        saveRequestToLocalStorage(requestObj);
        window.location.href = "Customer_Dashboard.html";
    }
}

// ================================================
// SERVICE EVALUATION [FORM VALIDATION]
// ================================================
function validateEvaluationForm() {
    let service = document.getElementById("serviceType").value;
    let rating = document.querySelector("input[name='rating']:checked");
    let feedback = document.getElementById("feedback").value.trim();

    // Validation
    if (service === "") {
        alert("Please select a service.");
        return false;
    }
    if (!rating) {
        alert("Please select a rating.");
        return false;
    }
    if (feedback.length === 0) {
        alert("Please write your feedback.");
        return false;
    }

    // Feedback message
    if (parseInt(rating.value) >= 4) alert("Thank you for your positive feedback.");
    else alert("We apologize for the inconvenience.");

    // Redirect to dashboard
    window.location.href = "Customer_Dashboard.html";
    return false;
}

// ===== Event Listener for Evaluation Form =====
document.addEventListener("DOMContentLoaded", function () {
    const evalForm = document.getElementById("serviceEvaluationForm");
    if (evalForm) evalForm.addEventListener("submit", function (e) {
        e.preventDefault();
        validateEvaluationForm();
    });
});


// ================================================
// Customer DASHBOARD FUNCTIONS
// ================================================
function updateRequestStatus() {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    let today = new Date(); today.setHours(0, 0, 0, 0);
    requests.forEach(req => {
        let serviceDate = new Date(req.date); serviceDate.setHours(0, 0, 0, 0);
        req.status = serviceDate <= today ? "Completed" : "Pending";
    });
    localStorage.setItem("requests", JSON.stringify(requests));
}

function loadDashboardRequests() {
    updateRequestStatus();
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    let totalCount = document.querySelector(".summary-card.total .count");
    let pendingCount = document.querySelector(".summary-card.pending .count");
    let completedCount = document.querySelector(".summary-card.completed .count");
    let requestList = document.querySelector(".request-list");
    if (!requestList) return;

    let pending = requests.filter(r => r.status === "Pending").length;
    let completed = requests.filter(r => r.status === "Completed").length;

    if (totalCount) totalCount.textContent = requests.length;
    if (pendingCount) pendingCount.textContent = pending;
    if (completedCount) completedCount.textContent = completed;

    requestList.innerHTML = "";
    if (requests.length === 0) {
        requestList.innerHTML = `<p style="text-align:center; color:#5aa53e; margin-top:50px;">No stored service requests yet.</p>`;
        return;
    }

    requests.forEach(req => {
        let imgPath = getServiceImage(req.service);
        let statusClass = req.status === "Completed" ? "status-completed" : "status-pending";
        let statusTextClass = req.status === "Completed" ? "status-text-completed" : "status-text-pending";

        requestList.innerHTML += `
            <div class="${statusClass}">
                <div class="request-card">
                    <img src="${imgPath}" alt="${getServiceName(req.service)} Image" style="width:100%; height:150px; object-fit:cover; border-bottom:1px solid #ccc;">
                    <div class="request-details">
                        <p class="request-title">${getServiceName(req.service)}</p>
                        <p class="request-meta">Status: <strong class="${statusTextClass}">${req.status}</strong></p>
                        <p class="request-meta">Date: ${req.date}</p>
                        <p class="request-meta">Name: ${req.name}</p>
                        <p class="request-meta details-text">Description: ${req.desc.substring(0, 50)}...</p>
                        <a href="#" class="status-details-link">Details...</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// ================================================
// EVENT LISTENERS
// ================================================
document.addEventListener("DOMContentLoaded", function () {
    const requestForm = document.getElementById("requestServiceForm");
    if (requestForm) requestForm.addEventListener("submit", validateRequestForm);

    const evaluateForm = document.getElementById("evaluateServiceForm");
    if (evaluateForm) evaluateForm.addEventListener("submit", validateEvaluationForm);

    if (document.title.includes("Customer Dashboard")) loadDashboardRequests();
});


