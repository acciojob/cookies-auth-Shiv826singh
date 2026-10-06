//your JS code here. If required.
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginBox = document.getElementById("loginBox");
const welcomeBox = document.getElementById("welcomeBox");

const loginMessage = document.getElementById("loginMessage");
const user = document.getElementById("user");


// Set a cookie
function setCookie(name, value, days) {
    const date = new Date();

    date.setTime(
        date.getTime() + days * 24 * 60 * 60 * 1000
    );

    document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        ";expires=" +
        date.toUTCString() +
        ";path=/";
}


// Get a cookie
function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(name + "=")) {
            return decodeURIComponent(
                cookie.substring(name.length + 1)
            );
        }
    }

    return null;
}


// Delete a cookie
function deleteCookie(name) {
    document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}


// Show logged-in state
function showWelcome(username) {
    loginBox.style.display = "none";
    welcomeBox.style.display = "block";

    user.textContent = username;
}


// Show login state
function showLogin() {
    loginBox.style.display = "block";
    welcomeBox.style.display = "none";

    usernameInput.value = "";
    passwordInput.value = "";
}


// Login
loginBtn.addEventListener("click", function () {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        loginMessage.textContent =
            "Please enter username and password.";
        return;
    }

    // Store username in cookie for 7 days
    setCookie("username", username, 7);

    loginMessage.textContent = "";

    showWelcome(username);
});


// Logout
logoutBtn.addEventListener("click", function () {

    deleteCookie("username");

    showLogin();
});


// Check cookie when page loads
const savedUsername = getCookie("username");

if (savedUsername) {
    showWelcome(savedUsername);
} else {
    showLogin();
}
