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
  const clockElement = document.getElementById("clock");

  if (!clockElement) return;

  const now = new Date();
  const time = now.toLocaleTimeString();
  clockElement.textContent = "Current Time: " + time;
}

if (document.getElementById("clock")) {
  setInterval(updateClock, 1000);
  updateClock();
}


// SORTING FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort-select");
    const parent = document.getElementById("services-list");

    if (!sortSelect || !parent) {
    return;
}

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
        case "eco-crafts-workshop": return "Eco crafts workshope.jpg";
        case "green-living-workshop": return "Green Living Workshop.jpg";
        case "garden-care-workshop": return "Garden Care Basics Workshop.jpg";

        // Garden Maintenance
        case "tree-trimming": return "Tree Trimming.jpg";
        case "garden-plant-care": return "Garden Plant Care.jpg";
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
       
        let shortDesc = req.desc.length > 100 ? req.desc.substring(0, 100) + "..." : req.desc;

        displayBox.innerHTML += `
                <div class="status-pending">
                    <div class="request-card-stay">
                        <img src="${imgPath}" alt="${getServiceName(req.service)} Image" width="200">
                        <div class="request-details">
                            <p class="request-title">New Request #${index + 1}: ${getServiceName(req.service)}</p>
                            <p class="request-meta">Customer: ${req.name}</p>
                            <p class="request-meta">Due Date: ${req.date}</p>
                            <p class="request-meta">Status: <strong class="status-text-pending">New - Awaiting Review</strong></p>
                            <p class="request-meta request-desc-text">${shortDesc}</p>
                        </div>
                    </div>
                </div>
          
        `;
    });

    form.reset();
}

const displayBox = document.getElementById("requestDisplay");
if (displayBox) {
    displayBox.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-temp-btn")) {
            let index = e.target.dataset.index;
            tempRequests.splice(index, 1); // delete from temp array
            showTempRequests(displayBox, document.getElementById("requestServiceForm")); // update display
        }
    });
}

// ===== Save request to localStorage =====
function saveRequestToLocalStorage(requestObj) {
    let stored = JSON.parse(localStorage.getItem("requests")) || [];
    const id = Date.now();
    stored.push({
        id: id,
        service: requestObj.service,
        name: requestObj.name,
        date: requestObj.date,
        desc: requestObj.desc,
        status: "Pending"
    });
    localStorage.setItem("requests", JSON.stringify(stored));
}

// ===== Validate service request form =====
let formSubmitted = false;
function validateRequestForm(e) {
    e.preventDefault();

    if (formSubmitted) return; //avoid multiple submissions
    formSubmitted = true;

    let form = e.target;
    let service = document.getElementById("serviceType").value;
    let name = document.getElementById("fullName").value.trim();
    let date = document.getElementById("preferredDate").value;
    let desc = document.getElementById("notes").value.trim();
    let displayBox = document.getElementById("requestDisplay");

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
        formSubmitted = false; //if errors, allow resubmission
        return;
    }

    const confirmMessage = "Your service request has been sent successfully!\n\nDo you want to stay on this page to add another service (OK), or return to the dashboard (Cancel)?";
    let stay = confirm(confirmMessage);

    let requestObj = {
        id: Date.now(),
        service,
        name,
        date,
        desc
    };

    if (stay) {
        tempRequests.push(requestObj);
        showTempRequests(displayBox, form);
        formSubmitted = false; //allow resubmission for multipul requests
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

        // قص الوصف لـ 80 حرف فقط
        let shortDesc = req.desc.length > 80 ? req.desc.substring(0, 80) + "..." : req.desc;

        requestList.innerHTML += `
            <div class="${statusClass}">
                <div class="request-card">
                    <img src="${imgPath}" alt="${getServiceName(req.service)} Image">
                    <div class="request-details">
                        <p class="request-title">${getServiceName(req.service)}</p>
                        <p class="request-meta">Status: <strong class="${statusTextClass}">${req.status}</strong></p>
                        <p class="request-meta">Date: ${req.date}</p>
                        <p class="request-meta">Name: ${req.name}</p>
                        <p class="request-meta request-desc-text">${shortDesc}</p>
                        <button class="delete-btn" data-id="${req.id}">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const requestList = document.querySelector(".request-list");
    if (requestList) {
        requestList.addEventListener("click", function (e) {
            if (e.target.classList.contains("delete-btn")) {
                let id = e.target.dataset.id;
                let stored = JSON.parse(localStorage.getItem("requests")) || [];
                stored = stored.filter(r => r.id != id);
                localStorage.setItem("requests", JSON.stringify(stored));
                loadDashboardRequests();
            }
        });
    }
});

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

//SHARE YOUR STORY 
document.addEventListener("DOMContentLoaded", () => {

    // OPEN/CLOSE POPUP
    const popup = document.getElementById("story-popup");
    const openBtn = document.querySelector(".share-btn");
    const closeBtn = document.querySelector(".close-popup");

    if (openBtn) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            popup.style.display = "flex";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
    });

    //   STORY FORM SUBMISSION
    const form = document.getElementById("storyForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            let name = document.getElementById("storyName").value.trim();
            let title = document.getElementById("storyTitle").value.trim();
            let text = document.getElementById("storyText").value.trim();

            const beforeFile = document.getElementById("beforeImage").files[0];
            const afterFile = document.getElementById("afterImage").files[0];

            const toBase64 = (file) => new Promise((resolve) => {
                if (!file) return resolve(null);
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });

            const beforeImg = await toBase64(beforeFile);
            const afterImg = await toBase64(afterFile);

            
            const newStory = { name, title, text, beforeImg, afterImg };

            // Save to localStorage
            let stories = JSON.parse(localStorage.getItem("stories")) || [];
            stories.push(newStory);
            localStorage.setItem("stories", JSON.stringify(stories));

            addStoryToPage(newStory, stories.length - 1);

            form.reset();
            popup.style.display = "none";
        });
    }

    //   LOAD EXISTING STORIES
    let savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    savedStories.forEach((story, index) => addStoryToPage(story, index));
});


//   ADD STORY CARD TO PAGE
function addStoryToPage(story, index) {
    const container = document.querySelector(".stories-container");
    if (!container) return;

    let before = story.beforeImg ? story.beforeImg : "HomeImages/default-before.png";
    let after = story.afterImg ? story.afterImg : "HomeImages/default-after.png";

    const div = document.createElement("div");
    div.classList.add("story-item");

    div.innerHTML = `
        <button class="delete-story-btn" data-index="${index}">🗑</button>
        <img src="${before}" class="before-img">
        <img src="${after}" class="after-img">
        <div class="overlay-story">
            <h3>${story.title}</h3>
            <p>"${story.text}" — <strong>${story.name}</strong></p>
        </div>
    `;

    container.appendChild(div);

    // Attach delete event to this new item
    div.querySelector(".delete-story-btn").addEventListener("click", deleteStory);
}


//   DELETE STORY
function deleteStory(event) {
    const index = event.target.dataset.index;

    if (!confirm("Are you sure you want to delete this story?")) return;

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.splice(index, 1);
    localStorage.setItem("stories", JSON.stringify(stories));

    reloadStories();
}


//   RELOAD STORIES AFTER DELETE
function reloadStories() {
    const container = document.querySelector(".stories-container");
    if (!container) return;

    container.innerHTML = "";

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.forEach((story, index) => addStoryToPage(story, index));
}

// ================================================
// ABOUT US PAGE [JOIN THE TEAM FORM VALIDATION + PREVIEW]
// ================================================
document.addEventListener('DOMContentLoaded', function () {
    const joinForm = document.querySelector('#join-form form');
    if (!joinForm) return;

    // Fields
    const nameField       = document.getElementById('join-name');
    const dobField        = document.getElementById('join-dob');
    const photoField      = document.getElementById('join-photo');
    const emailField      = document.getElementById('join-email');
    const expertiseField  = document.getElementById('expertise');
    const skillsField     = document.getElementById('join-skills');
    const educationField  = document.getElementById('join-education');
    const messageField    = document.getElementById('join-message');

    const uploadArea = photoField ? photoField.closest('.file-upload-area') : null;

    // -----------------------------
    // PHOTO PREVIEW
    // -----------------------------
    if (photoField && uploadArea) {
        const previewImg = document.createElement('img');
        previewImg.className = 'file-preview-img';
        previewImg.style.display = 'none';
        uploadArea.appendChild(previewImg);

        photoField.addEventListener('change', function () {
            const file = this.files[0];

            if (!file) {
                previewImg.style.display = 'none';
                uploadArea.classList.remove('has-image');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file (jpg, png, etc.).');
                this.value = '';
                previewImg.style.display = 'none';
                uploadArea.classList.remove('has-image');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
                uploadArea.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        });
    }

    // -----------------------------
    // FORM VALIDATION
    // -----------------------------
    joinForm.addEventListener('submit', function (event) {
        // We keep this to stop the real HTTP submit
        event.preventDefault();

        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        [
            nameField,
            dobField,
            emailField,
            expertiseField,
            skillsField,
            educationField,
            messageField
        ].forEach(f => f && f.classList.remove('error'));

        if (uploadArea) uploadArea.classList.remove('error');

        // --------- A) EMPTY FIELDS ----------
        const requiredFields = [
            { field: nameField,      name: 'Name' },
            { field: dobField,       name: 'Date of Birth' },
            { field: emailField,     name: 'Email' },
            { field: expertiseField, name: 'Area of Expertise' },
            { field: skillsField,    name: 'Skills' },
            { field: educationField, name: 'Education' },
            { field: messageField,   name: 'General Message' }
        ];

        requiredFields.forEach(item => {
            const el = item.field;
            if (!el) return;

            const isSelect = el.tagName === 'SELECT';
            const value = el.value.trim();

            if (value === '' || (isSelect && el.value === '')) {
                isValid = false;
                errorMessage += `• ${item.name} field cannot be empty.\n`;
                el.classList.add('error');
            }
        });

        // Photo required
        if (!photoField || photoField.files.length === 0) {
            isValid = false;
            errorMessage += '• Photo field cannot be empty.\n';
            if (uploadArea) uploadArea.classList.add('error');
        }

        // --------- B) NAME RULE (NO NUMBERS) ----------
        const nameValue = nameField.value.trim();
        const numberCheck = /\d/;

        if (nameValue !== '' && numberCheck.test(nameValue)) {
            isValid = false;
            errorMessage += '• The Name field cannot contain numbers.\n';
            nameField.classList.add('error');
        }

        // --------- C) PHOTO TYPE ----------
        if (photoField && photoField.files.length > 0) {
            const file = photoField.files[0];
            if (!file.type.startsWith('image/')) {
                isValid = false;
                errorMessage += '• Photo field accepts only images (e.g., .jpg, .png).\n';
                if (uploadArea) uploadArea.classList.add('error');
            }
        }

        // --------- D) DOB RULE (not after 2008) ----------
        if (dobField.value) {
            const dob = new Date(dobField.value);
            const maxDate = new Date('2008-12-31T23:59:59');

            if (dob > maxDate) {
                isValid = false;
                errorMessage += '• Date of Birth should not be after the year 2008.\n';
                dobField.classList.add('error');
            }
        }

        // --------- SUBMIT OR SHOW ERRORS ----------
        if (!isValid) {
            alert('Please correct the following errors before submitting:\n\n' + errorMessage);

            const firstErrorField = joinForm.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
            return;
        }

        // SUCCESS MESSAGE (no real server submit)
        const senderName = nameField.value.trim();
        alert(
            `Confirmation:\n\n` +
            `Thank you for applying, ${senderName}! Your application has been submitted successfully.`
        );

        // Reset form + preview
        joinForm.reset();
        if (uploadArea && photoField) {
            const previewImg = uploadArea.querySelector('.file-preview-img');
            if (previewImg) previewImg.style.display = 'none';
            uploadArea.classList.remove('has-image');
            photoField.value = '';
        }
    });
});
// ================================================
// NEW SERVICE PAGE – ADD NEW SERVICE FORM + PREVIEW
// ================================================
document.addEventListener('DOMContentLoaded', function () {
    // Target the "Add new Service" form on new_service.html
    const serviceForm = document.querySelector('form[action="/submit-new-service"]');
    if (!serviceForm) return; // Not on this page

    const nameField  = document.getElementById('service-name');
    const priceField = document.getElementById('service-price');
    const descField  = document.getElementById('service-description');
    const photoField = document.getElementById('service-photo');

    const uploadArea = photoField ? photoField.closest('.file-upload-area') : null;

    // -----------------------------
    // PHOTO PREVIEW
    // -----------------------------
    if (photoField && uploadArea) {
        const previewImg = document.createElement('img');
        previewImg.className = 'file-preview-img';
        previewImg.style.display = 'none';
        uploadArea.appendChild(previewImg);

        photoField.addEventListener('change', function () {
            const file = this.files[0];

            if (!file) {
                previewImg.style.display = 'none';
                uploadArea.classList.remove('has-image');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file (jpg, png, etc.).');
                this.value = '';
                previewImg.style.display = 'none';
                uploadArea.classList.remove('has-image');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
                uploadArea.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        });
    }

    // -----------------------------
    // FORM VALIDATION
    // -----------------------------
    serviceForm.addEventListener('submit', function (e) {
        e.preventDefault(); // handle with JS

        let isValid = true;
        let errorMessage = '';

        // Clear previous error styles
        [nameField, priceField, descField].forEach(f => {
            if (f) f.classList.remove('error');
        });
        if (uploadArea) uploadArea.classList.remove('error');

        const numberCheck = /\d/;
        const letterCheck = /[A-Za-z]/;

        // --------- A) EMPTY FIELDS ----------
        if (!nameField.value.trim()) {
            isValid = false;
            errorMessage += '• Service name cannot be empty.\n';
            nameField.classList.add('error');
        }

        if (!priceField.value.trim()) {
            isValid = false;
            errorMessage += '• Price cannot be empty.\n';
            priceField.classList.add('error');
        }

        if (!descField.value.trim()) {
            isValid = false;
            errorMessage += '• Description cannot be empty.\n';
            descField.classList.add('error');
        }

        if (!photoField || photoField.files.length === 0) {
            isValid = false;
            errorMessage += '• Service photo cannot be empty.\n';
            if (uploadArea) uploadArea.classList.add('error');
        }

        // --------- B) SERVICE NAME – NO NUMBERS ----------
        const nameValue = nameField.value.trim();
        if (nameValue && numberCheck.test(nameValue)) {
            isValid = false;
            errorMessage += '• Service name cannot contain numbers.\n';
            nameField.classList.add('error');
        }

        // --------- C) PRICE – NO LETTERS (NUMBERS ONLY) ----------
        const priceValue = priceField.value.trim();
        if (priceValue && letterCheck.test(priceValue)) {
            isValid = false;
            errorMessage += '• Price cannot contain letters. Use numbers only (e.g., 50 or 50.00).\n';
            priceField.classList.add('error');
        }

        // --------- D) PHOTO TYPE ----------
        if (photoField && photoField.files.length > 0) {
            const file = photoField.files[0];
            if (!file.type.startsWith('image/')) {
                isValid = false;
                errorMessage += '• Service photo must be a valid image file.\n';
                if (uploadArea) uploadArea.classList.add('error');
            }
        }

        // --------- FINAL RESULT ----------
        if (!isValid) {
            alert('Please correct the following errors before submitting:\n\n' + errorMessage);

            const firstError = serviceForm.querySelector('.error');
            if (firstError) firstError.focus();
            return;
        }

        // SUCCESS
        const serviceName = nameField.value.trim();
        alert(
            'Confirmation:\n\n' +
            `New service "${serviceName}" has been added successfully.`
        );

        // Reset form + preview
        serviceForm.reset();
        if (uploadArea && photoField) {
            const previewImg = uploadArea.querySelector('.file-preview-img');
            if (previewImg) previewImg.style.display = 'none';
            uploadArea.classList.remove('has-image');
            photoField.value = '';
        }
    });
});


// ================================================
// MANAGE STAFF MEMBERS — FULL VALIDATION + PREVIEW
// ================================================
document.addEventListener('DOMContentLoaded', function () {

    // -------------------------------
    // 1) DELETE STAFF FORM
    // -------------------------------
    const deleteForm = document.getElementById('delete-staff-form');

    if (deleteForm) {
        deleteForm.addEventListener('submit', function (e) {
            const checked = deleteForm.querySelectorAll('input[name="delete_staff"]:checked');

            if (checked.length === 0) {
                e.preventDefault();
                alert('Please select at least one staff member to delete.');
                return;
            }

            if (!confirm('Are you sure you want to delete the selected staff member(s)?')) {
                e.preventDefault();
            }
        });
    }



    // -------------------------------
    // 2) ADD STAFF FORM
    // -------------------------------
    const addStaffForm = document.getElementById('add-staff-form');

    if (addStaffForm) {
        const firstName  = document.getElementById('first-name');
        const lastName   = document.getElementById('last-name');
        const dobField   = document.getElementById('dob');
        const emailField = document.getElementById('email');
        const position   = document.getElementById('position');
        const education  = document.getElementById('education');
        const skills     = document.getElementById('skills');
        const photoField = document.getElementById('staff-photo');

        const uploadArea = photoField ? photoField.closest('.file-upload-area') : null;

        // --------------------------
        // IMAGE PREVIEW
        // --------------------------
        if (photoField && uploadArea) {
            const previewImg = document.createElement('img');
            previewImg.className = 'file-preview-img';
            previewImg.style.display = 'none';
            uploadArea.appendChild(previewImg);

            photoField.addEventListener('change', function () {
                const file = this.files[0];

                if (!file) {
                    previewImg.style.display = 'none';
                    uploadArea.classList.remove('has-image');
                    return;
                }

                if (!file.type.startsWith('image/')) {
                    alert('Please upload a valid image file (jpg, png, etc.).');
                    this.value = '';
                    previewImg.style.display = 'none';
                    uploadArea.classList.remove('has-image');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImg.src = e.target.result;
                    previewImg.style.display = 'block';
                    uploadArea.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            });
        }



        // -------------------------------
        // FORM VALIDATION
        // -------------------------------
        addStaffForm.addEventListener('submit', function (e) {

            let isValid = true;
            let errorMessage = '';

            // Clear old error classes
            [firstName, lastName, dobField, emailField, position, education, skills].forEach(f => {
                f.classList.remove('error');
            });
            if (uploadArea) uploadArea.classList.remove('error');

            const numberCheck = /\d/;


            // -------------------------
            // A) EMPTY FIELD CHECKS
            // -------------------------
            if (!firstName.value.trim()) {
                isValid = false;
                errorMessage += '• First name cannot be empty.\n';
                firstName.classList.add('error');
            }
            if (!lastName.value.trim()) {
                isValid = false;
                errorMessage += '• Last name cannot be empty.\n';
                lastName.classList.add('error');
            }
            if (!dobField.value.trim()) {
                isValid = false;
                errorMessage += '• Date of Birth cannot be empty.\n';
                dobField.classList.add('error');
            }
            if (!emailField.value.trim()) {
                isValid = false;
                errorMessage += '• Email cannot be empty.\n';
                emailField.classList.add('error');
            }
            if (!position.value.trim()) {
                isValid = false;
                errorMessage += '• Area of Expertise cannot be empty.\n';
                position.classList.add('error');
            }
            if (!education.value.trim()) {
                isValid = false;
                errorMessage += '• Education cannot be empty.\n';
                education.classList.add('error');
            }
            if (!skills.value.trim()) {
                isValid = false;
                errorMessage += '• Skills cannot be empty.\n';
                skills.classList.add('error');
            }
            if (photoField.files.length === 0) {
                isValid = false;
                errorMessage += '• Staff photo cannot be empty.\n';
                if (uploadArea) uploadArea.classList.add('error');
            }


            // -------------------------
            // B) NAME RULE — NO NUMBERS
            // -------------------------
            if (firstName.value.trim() && numberCheck.test(firstName.value)) {
                isValid = false;
                errorMessage += '• First name cannot contain numbers.\n';
                firstName.classList.add('error');
            }

            if (lastName.value.trim() && numberCheck.test(lastName.value)) {
                isValid = false;
                errorMessage += '• Last name cannot contain numbers.\n';
                lastName.classList.add('error');
            }


            // -------------------------
            // C) EMAIL FORMAT
            // -------------------------
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailField.value.trim() && !emailRegex.test(emailField.value.trim())) {
                isValid = false;
                errorMessage += '• Please enter a valid email address.\n';
                emailField.classList.add('error');
            }


            // -------------------------
            // D) DOB RULE
            // -------------------------
            if (dobField.value.trim()) {
                const dob = new Date(dobField.value);
                const maxDate = new Date('2008-12-31T23:59:59');

                if (dob > maxDate) {
                    isValid = false;
                    errorMessage += '• Date of Birth cannot be after 2008.\n';
                    dobField.classList.add('error');
                }
            }


            // -------------------------
            // E) IMAGE TYPE
            // -------------------------
            if (photoField.files.length > 0) {
                const file = photoField.files[0];
                if (!file.type.startsWith('image/')) {
                    isValid = false;
                    errorMessage += '• Staff photo must be a valid image file.\n';
                    if (uploadArea) uploadArea.classList.add('error');
                }
            }


            // -------------------------
            // FINAL DECISION
            // -------------------------
            if (!isValid) {
                e.preventDefault();
                alert("Please fix the following errors:\n\n" + errorMessage);
                return;
            }

            // -------------------------
            // SUCCESS — ADD TO LIST
            // -------------------------
            const fullName = `${firstName.value.trim()} ${lastName.value.trim()}`;
            const staffList = document.querySelector('.staff-list');

            if (staffList) {
                const li = document.createElement('li');
                li.className = 'staff-item';

                li.innerHTML = `
                    <input type="checkbox" name="delete_staff">
                    <div class="placeholder-icon">👤</div>
                    <div class="staff-info">
                        <span class="name">${fullName}</span>
                        <span class="position">${position.value.trim()}</span>
                    </div>
                `;

                staffList.appendChild(li);
            }

            alert(`New staff member "${fullName}" has been added successfully.`);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show-nav");
        });
    }

    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove("show-nav");
        }
    });
});
